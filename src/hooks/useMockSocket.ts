import { useState, useEffect } from 'react';
import { Device, Devices } from 'src/types/deviceControllerTypes';

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
    ]
};

export default function useMockOphydSocket(deviceNameList: string[]) {
    const [devices, setDevices] = useState<Devices>({});

    // Initialize devices state
    useEffect(() => {
        console.log('initializing mock devices state');
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

    // Process mock messages
    useEffect(() => {
        if (deviceNameList.length === 0) {
            return;
        }

        console.log('processing mock messages');

        // Process each device in the mock data
        Object.keys(deviceMessages).forEach((key) => {
            if (key === 'timestamp' || key === 'deviceCount') return;

            const deviceName = key;
            const messages = deviceMessages[key as keyof typeof deviceMessages] as any[];

            // Only process if this device is in our deviceNameList
            if (!deviceNameList.includes(deviceName)) return;

            // Process messages in order to simulate the real behavior
            messages.forEach((messageWrapper, index) => {
                setTimeout(() => {
                    const message = messageWrapper.data;

                    setDevices((prevDevices) => {
                        if (!prevDevices[deviceName]) return prevDevices;

                        let updatedDevice = { ...prevDevices[deviceName] };

                        // Handle meta updates (similar to original webhook)
                        if ('update' in message && message.update.sub_type === 'meta') {
                            updatedDevice = {
                                ...updatedDevice,
                                ...message.update,
                                min: message.update.lower_ctrl_limit,
                                max: message.update.upper_ctrl_limit,
                            };
                        }
                        // Handle regular updates with 'pv' field
                        else if ('pv' in message) {
                            updatedDevice = {
                                ...updatedDevice,
                                ...message,
                            };
                        }

                        return {
                            ...prevDevices,
                            [deviceName]: updatedDevice,
                        };
                    });
                }, index * 100); // Stagger the messages to simulate real-time updates
            });
        });
    }, [deviceNameList]);
    const handleSetValueRequest = (deviceName: string, value: string | number | boolean) => {
        console.log(`Mock setting device "${deviceName}" to value:`, value);
        // You could also add more mock behavior here, such as:
        // - Updating local state to simulate device changes
        // - Adding artificial delays to simulate network requests
        // - Logging to a mock data store
    };
    return {
        devices,
        handleSetValueRequest,
    };
}