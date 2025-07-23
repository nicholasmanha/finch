import { useState, useRef, useEffect, useCallback } from 'react';
import { Device, Devices } from 'src/types/deviceControllerTypes';
import {
    MessageResponse,
    ErrorResponse,
    ValueUpdateResponse,
    MetaUpdateResponse,
} from 'src/types/ophydSocketTypes';

const deviceMessages = {
    "timestamp": "2025-07-22T21:31:03.348569",
    "deviceCount": 77,
    "13SIM1:cam1:SDKVersion_RBV": [
        {
          "timestamp": "2025-07-23T09:49:02.657994",
          "sessionId": "session_1753289342149_dq5vhwjss",
          "data": {
            "pv": "13SIM1:cam1:SDKVersion_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954215,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:SDKVersion_RBV",
              "pv": "13SIM1:cam1:SDKVersion_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T09:49:02.679044",
          "sessionId": "session_1753289342149_dq5vhwjss",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954215,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:SDKVersion_RBV",
            "pv": "13SIM1:cam1:SDKVersion_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T09:49:02.696255",
          "sessionId": "session_1753289342149_dq5vhwjss",
          "data": {
            "pv": "13SIM1:cam1:SDKVersion_RBV",
            "value": "2.9.0",
            "timestamp": 1753288930.954215,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
}

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

                ws.send(JSON.stringify(subscribeMessage));
            });
        };

        // Handle incoming WebSocket messages
        ws.onmessage = (event) => {
            try {
                const message: MessageResponse | ErrorResponse | ValueUpdateResponse | MetaUpdateResponse = JSON.parse(event.data);


                if ('sub_type' in message && message.sub_type === 'meta') {
                    //meta updates occur when we first subscribe to a device, or if the connection changes (lost or regained EPICS connection)
                    const updatedDevice = {
                        ...message,
                        min: message.lower_ctrl_limit,
                        max: message.upper_ctrl_limit,
                    };


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
    };
}