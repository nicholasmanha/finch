import { useState, useRef, useEffect, useCallback } from 'react';
import { Device, Devices } from 'src/types/deviceControllerTypes';
import {
    MessageResponse,
    ErrorResponse,
    ValueUpdateResponse,
    MetaUpdateResponse,
} from 'src/types/ophydSocketTypes';

// Configuration for the log server
const LOG_SERVER_URL = 'http://localhost:3001';

// Generate a session ID for this browser session
const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Utility function to safely stringify errors and unknown types
const safeStringify = (obj: any): any => {
    try {
        return JSON.parse(JSON.stringify(obj, (key, value) => {
            // Handle Error objects specifically
            if (value instanceof Error) {
                return {
                    name: value.name,
                    message: value.message,
                    stack: value.stack,
                };
            }
            // Handle other non-serializable objects
            if (typeof value === 'object' && value !== null) {
                // Check if it's a DOM element or other non-serializable object
                if (value.constructor && value.constructor.name !== 'Object' && value.constructor.name !== 'Array') {
                    return `[${value.constructor.name}]`;
                }
            }
            return value;
        }));
    } catch (error) {
        return { error: `Unable to stringify: ${typeof obj}`, type: typeof obj };
    }
};

const sendLogToServer = async (data: any, label: string) => {
    try {
        const logEntry = {
            label,
            data: safeStringify(data),
            sessionId: SESSION_ID,
            clientTimestamp: new Date().toISOString()
        };

        const response = await fetch(`${LOG_SERVER_URL}/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Also log to console for immediate feedback
        console.log(`[${logEntry.clientTimestamp}] ${label}:`, data);

    } catch (error) {
        console.error('Failed to send log to server:', error);
        // Fallback to console logging if server is unavailable
        console.log(`[OFFLINE LOG] ${label}:`, data);
    }
};

const sendDeviceNameLogToServer = async (data: any, label: string) => {
    try {
        const logEntry = {
            label,
            data: safeStringify(data),
            sessionId: SESSION_ID,
            clientTimestamp: new Date().toISOString()
        };

        const response = await fetch(`${LOG_SERVER_URL}/log_deviceNames`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logEntry)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Also log to console for immediate feedback
        console.log(`[${logEntry.clientTimestamp}] ${label}:`, data);

    } catch (error) {
        console.error('Failed to send log to server:', error);
        // Fallback to console logging if server is unavailable
        console.log(`[OFFLINE LOG] ${label}:`, data);
    }
};

const downloadLogsFromServer = async () => {
    try {
        const response = await fetch(`${LOG_SERVER_URL}/logs`);
        const result = await response.json();

        if (response.ok) {
            const blob = new Blob([result.logs], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ophyd-logs-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.error('Failed to download logs:', result.error);
        }
    } catch (error) {
        console.error('Failed to download logs:', error);
    }
};

const clearLogsOnServer = async () => {
    try {
        const response = await fetch(`${LOG_SERVER_URL}/logs`, {
            method: 'DELETE'
        });
        const result = await response.json();

        if (response.ok) {
            console.log('Logs cleared successfully');
        } else {
            console.error('Failed to clear logs:', result.error);
        }
    } catch (error) {
        console.error('Failed to clear logs:', error);
    }
};

export default function useOphydSocket(deviceNameList: string[], wsUrl?: string) {
    const address = window.location.hostname;
    const apiPort: string = (import.meta.env.VITE_OPHYD_WS_PORT || `8000`);
    const apiUrl: string = wsUrl ? wsUrl : `ws://${address}:${apiPort}/ophydSocket`;
    const [devices, setDevices] = useState<Devices>({});
    const wsRef = useRef<WebSocket | null>(null);

    // Toggle device lock
    const toggleDeviceLock = useCallback((deviceName: string) => {
        setDevices((prevDevices) => ({
            ...prevDevices,
            [deviceName]: {
                ...prevDevices[deviceName],
                locked: !prevDevices[deviceName].locked,
            },
        }));
    }, []);

    //Callback function to send device updates thru websocket
    const handleSetValueRequest = useCallback((deviceName: string, value: string | number | boolean) => {
        if (wsRef.current) {
            const setValueMessage = {
                action: 'set',
                pv: deviceName,
                value: value,
            };

            // Log the outgoing message
            //sendLogToServer(setValueMessage, 'OUTGOING SET VALUE REQUEST');

            wsRef.current.send(JSON.stringify(setValueMessage));
        }
    }, []);

    const toggleExpand = useCallback((deviceName: string) => {
        setDevices((prevDevices) => ({
            ...prevDevices,
            [deviceName]: {
                ...prevDevices[deviceName],
                expanded: !prevDevices[deviceName].expanded,
            },
        }));
    }, []);

    // Initialize devices state
    useEffect(() => {
        console.log('initializing devices state');

        if (deviceNameList.length !== 0) {
            // Log the incoming device name list
            sendDeviceNameLogToServer(deviceNameList, 'INCOMING DEVICE NAME LIST');
        }


        const initialDevices: Devices = {};
        deviceNameList.forEach((deviceName) => {
            initialDevices[deviceName] = {
                name: deviceName,
                value: '',
                connected: false,
                locked: false,
                timestamp: 0,
                expanded: false,
                pv: deviceName,
                read_access: false,
                write_access: false,
            };
        });
        setDevices(initialDevices);

        // Log the initialized devices
        // if (Object.keys(initialDevices).length !== 0) {
        //     sendLogToServer(initialDevices, 'INITIALIZED DEVICES STATE');
        // }


    }, [deviceNameList]);

    // Initialize WebSocket connection
    useEffect(() => {
        // Don't connect if no devices to subscribe to
        if (deviceNameList.length === 0) {

            // Close existing connection if devices list becomes empty
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
            return;
        }

        console.log('initializing WebSocket connection');
        const ws = new WebSocket(apiUrl);
        wsRef.current = ws;

        // Open WebSocket connection and subscribe to devices
        ws.onopen = () => {
            console.log('WebSocket connection opened');


            deviceNameList.forEach((deviceName) => {
                const subscribeMessage = {
                    action: 'subscribe',
                    pv: deviceName,
                };

                // Log each subscription message
                // sendLogToServer(subscribeMessage, 'OUTGOING SUBSCRIPTION REQUEST');

                ws.send(JSON.stringify(subscribeMessage));
            });
        };

        // Handle incoming WebSocket messages
        ws.onmessage = (event) => {
            try {
                const message: MessageResponse | ErrorResponse | ValueUpdateResponse | MetaUpdateResponse = JSON.parse(event.data);

                if (('connected' in message && message.connected) || !('connected' in message)) {
                    sendLogToServer(message, 'INCOMING WEBSOCKET MESSAGE');
                }

                if ('sub_type' in message && message.sub_type === 'meta') {
                    //meta updates occur when we first subscribe to a device, or if the connection changes (lost or regained EPICS connection)
                    const updatedDevice = {
                        ...message,
                        min: message.lower_ctrl_limit,
                        max: message.upper_ctrl_limit,
                    };

                    // Log the meta update processing
                    sendLogToServer({ pv: message.pv, update: updatedDevice }, 'PROCESSING META UPDATE');

                    setDevices((prevDevices) => ({
                        ...prevDevices,
                        [message.pv]: {
                            ...prevDevices[message.pv],
                            ...updatedDevice,
                        },
                    }));
                } else if ('pv' in message) {
                    //pv is in the message on regular updates to the device value
                    const deviceName = message.pv;

                    // Log the value update processing
                    //sendLogToServer({ pv: deviceName, update: message }, 'PROCESSING VALUE UPDATE');

                    setDevices((prevDevices) => ({
                        ...prevDevices,
                        [deviceName]: {
                            ...prevDevices[deviceName],
                            ...message,
                        },
                    }));
                }
                if ('error' in message) {
                    console.error('WebSocket error message:', message.error);

                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
                // Handle the unknown error type properly


            }
        };

        // Handle WebSocket errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            // Handle the Event object properly


        };

        // Handle WebSocket closure
        ws.onclose = (event) => {
            console.log('WebSocket connection closed');

        };

        // Cleanup WebSocket connection on unmount
        return () => {
            if (wsRef.current) {

                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, [wsUrl, deviceNameList]);

    return {
        devices,
        toggleDeviceLock,
        handleSetValueRequest,
        toggleExpand,
        // Export logging utilities
        downloadLogs: downloadLogsFromServer,
        clearLogs: clearLogsOnServer,
    };
}