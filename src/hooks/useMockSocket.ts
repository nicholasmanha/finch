import { useState, useEffect } from 'react';
import { Device, Devices } from 'src/types/deviceControllerTypes';

const deviceMessages = {
    "timestamp": "2025-07-22T21:31:03.348569",
    "deviceCount": 77,
    
      "13SIM1:cam1:Model_RBV": [
        {
          "timestamp": "2025-07-23T11:42:41.408374",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.95417,
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
            "obj": "13SIM1:cam1:Model_RBV",
            "pv": "13SIM1:cam1:Model_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.114029",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:Model_RBV",
            "update": {
              "pv": "13SIM1:cam1:Model_RBV",
              "value": "Basic simulator",
              "timestamp": 1753288930.95417,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.122004",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:Model_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.95417,
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
              "obj": "13SIM1:cam1:Model_RBV",
              "pv": "13SIM1:cam1:Model_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:ShutterCloseDelay": [
        {
          "timestamp": "2025-07-23T11:42:41.533461",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterCloseDelay",
            "update": {
              "pv": "13SIM1:cam1:ShutterCloseDelay",
              "value": 45,
              "timestamp": 1753288930.933376,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.162868",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.933376,
            "status": 0,
            "severity": 0,
            "precision": 3,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ShutterCloseDelay",
            "pv": "13SIM1:cam1:ShutterCloseDelay"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.184725",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterCloseDelay",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.933376,
              "status": 0,
              "severity": 0,
              "precision": 3,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ShutterCloseDelay",
              "pv": "13SIM1:cam1:ShutterCloseDelay",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:PoolFreeBuffers": [
        {
          "timestamp": "2025-07-23T11:42:41.545753",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolFreeBuffers",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:PoolFreeBuffers",
              "pv": "13SIM1:cam1:PoolFreeBuffers",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.479441",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolFreeBuffers",
            "update": {
              "pv": "13SIM1:cam1:PoolFreeBuffers",
              "value": 0,
              "timestamp": 631152000,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.480597",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolFreeBuffers",
            "value": 0,
            "timestamp": 631152000,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.483937",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:PoolFreeBuffers",
            "pv": "13SIM1:cam1:PoolFreeBuffers"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:MinX": [
        {
          "timestamp": "2025-07-23T11:42:41.558159",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.934631,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:MinX",
            "pv": "13SIM1:cam1:MinX"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.902901",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinX",
            "value": 0,
            "timestamp": 1753288930.934631,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.906417",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinX",
            "update": {
              "pv": "13SIM1:cam1:MinX",
              "value": 0,
              "timestamp": 1753288930.934631,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.908088",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinX",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.934631,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:MinX",
              "pv": "13SIM1:cam1:MinX",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:ArraySize_RBV": [
        {
          "timestamp": "2025-07-23T11:42:41.570793",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ArraySize_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.952958,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ArraySize_RBV",
              "pv": "13SIM1:cam1:ArraySize_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:AcquireTime": [
        {
          "timestamp": "2025-07-23T11:42:41.583043",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.933367,
            "status": 0,
            "severity": 0,
            "precision": 3,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:AcquireTime",
            "pv": "13SIM1:cam1:AcquireTime"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:ImageMode_RBV": [
        {
          "timestamp": "2025-07-23T11:42:41.595952",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954688,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Single",
              "Multiple",
              "Continuous"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ImageMode_RBV",
            "pv": "13SIM1:cam1:ImageMode_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:AcquireBusy": [
        {
          "timestamp": "2025-07-23T11:42:41.608507",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:AcquireBusy",
            "update": {
              "pv": "13SIM1:cam1:AcquireBusy",
              "value": 0,
              "timestamp": 631152000,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:AsynIO.CNCT": [
        {
          "timestamp": "2025-07-23T11:42:41.873440",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Disconnect",
              "Connect"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:AsynIO.CNCT",
            "pv": "13SIM1:cam1:AsynIO.CNCT"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:41.875192",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:AsynIO.CNCT",
            "update": {
              "pv": "13SIM1:cam1:AsynIO.CNCT",
              "value": 1,
              "timestamp": 631152000,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:41.879860",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:AsynIO.CNCT",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "Disconnect",
                "Connect"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:AsynIO.CNCT",
              "pv": "13SIM1:cam1:AsynIO.CNCT",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:41.881818",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:AsynIO.CNCT",
            "value": 1,
            "timestamp": 631152000,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:Manufacturer_RBV": [
        {
          "timestamp": "2025-07-23T11:42:41.878137",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:Manufacturer_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.95413,
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
              "obj": "13SIM1:cam1:Manufacturer_RBV",
              "pv": "13SIM1:cam1:Manufacturer_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:41.878966",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:Manufacturer_RBV",
            "update": {
              "pv": "13SIM1:cam1:Manufacturer_RBV",
              "value": "Simulated detector",
              "timestamp": 1753288930.95413,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.097195",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.95413,
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
            "obj": "13SIM1:cam1:Manufacturer_RBV",
            "pv": "13SIM1:cam1:Manufacturer_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:PortName_RBV": [
        {
          "timestamp": "2025-07-23T11:42:41.882883",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PortName_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.952455,
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
              "obj": "13SIM1:cam1:PortName_RBV",
              "pv": "13SIM1:cam1:PortName_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:41.883489",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.952455,
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
            "obj": "13SIM1:cam1:PortName_RBV",
            "pv": "13SIM1:cam1:PortName_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:41.884377",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PortName_RBV",
            "update": {
              "pv": "13SIM1:cam1:PortName_RBV",
              "value": "SIM1",
              "timestamp": 1753288930.952455,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:FirmwareVersion_RBV": [
        {
          "timestamp": "2025-07-23T11:42:42.099052",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:FirmwareVersion_RBV",
            "value": "No firmware",
            "timestamp": 1753288930.954309,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.101511",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:FirmwareVersion_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954309,
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
              "obj": "13SIM1:cam1:FirmwareVersion_RBV",
              "pv": "13SIM1:cam1:FirmwareVersion_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.109935",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:FirmwareVersion_RBV",
            "update": {
              "pv": "13SIM1:cam1:FirmwareVersion_RBV",
              "value": "No firmware",
              "timestamp": 1753288930.954309,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.159834",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954309,
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
            "obj": "13SIM1:cam1:FirmwareVersion_RBV",
            "pv": "13SIM1:cam1:FirmwareVersion_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:SDKVersion_RBV": [
        {
          "timestamp": "2025-07-23T11:42:42.103372",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SDKVersion_RBV",
            "update": {
              "pv": "13SIM1:cam1:SDKVersion_RBV",
              "value": "2.9.0",
              "timestamp": 1753288930.954215,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.112885",
          "sessionId": "session_1753296161183_g1uuoil2q",
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
          "timestamp": "2025-07-23T11:42:42.176177",
          "sessionId": "session_1753296161183_g1uuoil2q",
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
        }
      ],
      "13SIM1:cam1:DriverVersion_RBV": [
        {
          "timestamp": "2025-07-23T11:42:42.105006",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:DriverVersion_RBV",
            "update": {
              "pv": "13SIM1:cam1:DriverVersion_RBV",
              "value": "2.9.0",
              "timestamp": 1753288930.952815,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.106582",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.952815,
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
            "obj": "13SIM1:cam1:DriverVersion_RBV",
            "pv": "13SIM1:cam1:DriverVersion_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.107866",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:DriverVersion_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.952815,
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
              "obj": "13SIM1:cam1:DriverVersion_RBV",
              "pv": "13SIM1:cam1:DriverVersion_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:SerialNumber_RBV": [
        {
          "timestamp": "2025-07-23T11:42:42.125250",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SerialNumber_RBV",
            "update": {
              "pv": "13SIM1:cam1:SerialNumber_RBV",
              "value": "No serial number",
              "timestamp": 1753288930.954262,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.126554",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954262,
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
            "obj": "13SIM1:cam1:SerialNumber_RBV",
            "pv": "13SIM1:cam1:SerialNumber_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:42.135998",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SerialNumber_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954262,
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
              "obj": "13SIM1:cam1:SerialNumber_RBV",
              "pv": "13SIM1:cam1:SerialNumber_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:ShutterMode": [
        {
          "timestamp": "2025-07-23T11:42:43.135996",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterMode",
            "update": {
              "pv": "13SIM1:cam1:ShutterMode",
              "value": 1,
              "timestamp": 1753288930.94011,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.151387",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.94011,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "None",
              "EPICS PV",
              "Detector output"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ShutterMode",
            "pv": "13SIM1:cam1:ShutterMode"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.152952",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterMode",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.94011,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "None",
                "EPICS PV",
                "Detector output"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ShutterMode",
              "pv": "13SIM1:cam1:ShutterMode",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:ShutterControl": [
        {
          "timestamp": "2025-07-23T11:42:43.140491",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.933842,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Close",
              "Open"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ShutterControl",
            "pv": "13SIM1:cam1:ShutterControl"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.143920",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterControl",
            "value": 0,
            "timestamp": 1753288930.933842,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.150187",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterControl",
            "update": {
              "pv": "13SIM1:cam1:ShutterControl",
              "value": 0,
              "timestamp": 1753288930.933842,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.156318",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterControl",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.933842,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "Close",
                "Open"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ShutterControl",
              "pv": "13SIM1:cam1:ShutterControl",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:ShutterStatus_RBV": [
        {
          "timestamp": "2025-07-23T11:42:43.145897",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterStatus_RBV",
            "update": {
              "pv": "13SIM1:cam1:ShutterStatus_RBV",
              "value": 0,
              "timestamp": 1753288930.953838,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.154945",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterStatus_RBV",
            "value": 0,
            "timestamp": 1753288930.953838,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.160771",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterStatus_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.953838,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "Closed",
                "Open"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ShutterStatus_RBV",
              "pv": "13SIM1:cam1:ShutterStatus_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.166138",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.953838,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Closed",
              "Open"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ShutterStatus_RBV",
            "pv": "13SIM1:cam1:ShutterStatus_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:ShutterOpenDelay": [
        {
          "timestamp": "2025-07-23T11:42:43.159209",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterOpenDelay",
            "value": 3.3,
            "timestamp": 1753288930.933375,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.161966",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.933375,
            "status": 0,
            "severity": 0,
            "precision": 3,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ShutterOpenDelay",
            "pv": "13SIM1:cam1:ShutterOpenDelay"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.163821",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterOpenDelay",
            "update": {
              "pv": "13SIM1:cam1:ShutterOpenDelay",
              "value": 3.3,
              "timestamp": 1753288930.933375,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.164603",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterOpenDelay",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.933375,
              "status": 0,
              "severity": 0,
              "precision": 3,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ShutterOpenDelay",
              "pv": "13SIM1:cam1:ShutterOpenDelay",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:ShutterStatusEPICS_RBV": [
        {
          "timestamp": "2025-07-23T11:42:43.183974",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterStatusEPICS_RBV",
            "value": 0,
            "timestamp": 631152000,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.185910",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterStatusEPICS_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "Closed",
                "Open"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:ShutterStatusEPICS_RBV",
              "pv": "13SIM1:cam1:ShutterStatusEPICS_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.186707",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Closed",
              "Open"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:ShutterStatusEPICS_RBV",
            "pv": "13SIM1:cam1:ShutterStatusEPICS_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.187385",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ShutterStatusEPICS_RBV",
            "update": {
              "pv": "13SIM1:cam1:ShutterStatusEPICS_RBV",
              "value": 0,
              "timestamp": 631152000,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:ADCoreVersion_RBV": [
        {
          "timestamp": "2025-07-23T11:42:43.222045",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ADCoreVersion_RBV",
            "update": {
              "pv": "13SIM1:cam1:ADCoreVersion_RBV",
              "value": "3.12.1",
              "timestamp": 1753288930.952769,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.222839",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ADCoreVersion_RBV",
            "value": "3.12.1",
            "timestamp": 1753288930.952769,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.223713",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.952769,
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
            "obj": "13SIM1:cam1:ADCoreVersion_RBV",
            "pv": "13SIM1:cam1:ADCoreVersion_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.436215",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:ADCoreVersion_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.952769,
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
              "obj": "13SIM1:cam1:ADCoreVersion_RBV",
              "pv": "13SIM1:cam1:ADCoreVersion_RBV",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:NDAttributesMacros": [
        {
          "timestamp": "2025-07-23T11:42:43.439771",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.941032,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:NDAttributesMacros",
            "pv": "13SIM1:cam1:NDAttributesMacros"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.452885",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:NDAttributesMacros",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.941032,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:NDAttributesMacros",
              "pv": "13SIM1:cam1:NDAttributesMacros",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:NDAttributesStatus": [
        {
          "timestamp": "2025-07-23T11:42:43.444667",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:NDAttributesStatus",
            "value": 1,
            "timestamp": 1753288930.953358,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.470089",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:NDAttributesStatus",
            "update": {
              "pv": "13SIM1:cam1:NDAttributesStatus",
              "value": 1,
              "timestamp": 1753288930.953358,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.474872",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.953358,
            "status": 7,
            "severity": 1,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Attributes file OK",
              "File not found",
              "XML syntax error",
              "Macro substitution error"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:NDAttributesStatus",
            "pv": "13SIM1:cam1:NDAttributesStatus"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.482699",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:NDAttributesStatus",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.953358,
              "status": 7,
              "severity": 1,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "Attributes file OK",
                "File not found",
                "XML syntax error",
                "Macro substitution error"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:NDAttributesStatus",
              "pv": "13SIM1:cam1:NDAttributesStatus",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:NDAttributesFile": [
        {
          "timestamp": "2025-07-23T11:42:43.447978",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.94107,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:NDAttributesFile",
            "pv": "13SIM1:cam1:NDAttributesFile"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.456838",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:NDAttributesFile",
            "update": {
              "pv": "13SIM1:cam1:NDAttributesFile",
              "value": "ddd",
              "timestamp": 1753288930.94107,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.461660",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:NDAttributesFile",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.94107,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:NDAttributesFile",
              "pv": "13SIM1:cam1:NDAttributesFile",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:PoolAllocBuffers": [
        {
          "timestamp": "2025-07-23T11:42:43.466084",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolAllocBuffers",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:PoolAllocBuffers",
              "pv": "13SIM1:cam1:PoolAllocBuffers",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.468567",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:PoolAllocBuffers",
            "pv": "13SIM1:cam1:PoolAllocBuffers"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.481470",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolAllocBuffers",
            "update": {
              "pv": "13SIM1:cam1:PoolAllocBuffers",
              "value": 0,
              "timestamp": 631152000,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:PoolUsedBuffers": [
        {
          "timestamp": "2025-07-23T11:42:43.472269",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": 0,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:PoolUsedBuffers",
            "pv": "13SIM1:cam1:PoolUsedBuffers"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.476306",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedBuffers",
            "value": 0,
            "timestamp": 631152000,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.477882",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedBuffers",
            "update": {
              "pv": "13SIM1:cam1:PoolUsedBuffers",
              "value": 0,
              "timestamp": 631152000,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.484686",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedBuffers",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": 0,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:PoolUsedBuffers",
              "pv": "13SIM1:cam1:PoolUsedBuffers",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:PoolMaxMem": [
        {
          "timestamp": "2025-07-23T11:42:43.675318",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolMaxMem",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.933229,
              "status": 0,
              "severity": 0,
              "precision": 1,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "MB",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:PoolMaxMem",
              "pv": "13SIM1:cam1:PoolMaxMem",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.687072",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.933229,
            "status": 0,
            "severity": 0,
            "precision": 1,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "MB",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:PoolMaxMem",
            "pv": "13SIM1:cam1:PoolMaxMem"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.692224",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolMaxMem",
            "update": {
              "pv": "13SIM1:cam1:PoolMaxMem",
              "value": 0,
              "timestamp": 1753288930.933229,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:PoolUsedMem.SCAN": [
        {
          "timestamp": "2025-07-23T11:42:43.677730",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedMem.SCAN",
            "update": {
              "pv": "13SIM1:cam1:PoolUsedMem.SCAN",
              "value": 0,
              "timestamp": 631152000,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.684353",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "Passive",
              "Event",
              "I/O Intr",
              "10 second",
              "5 second",
              "2 second",
              "1 second",
              ".5 second",
              ".2 second",
              ".1 second"
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:PoolUsedMem.SCAN",
            "pv": "13SIM1:cam1:PoolUsedMem.SCAN"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.690601",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedMem.SCAN",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "Passive",
                "Event",
                "I/O Intr",
                "10 second",
                "5 second",
                "2 second",
                "1 second",
                ".5 second",
                ".2 second",
                ".1 second"
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:PoolUsedMem.SCAN",
              "pv": "13SIM1:cam1:PoolUsedMem.SCAN",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:EmptyFreeList": [
        {
          "timestamp": "2025-07-23T11:42:43.680305",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:EmptyFreeList",
            "update": {
              "pv": "13SIM1:cam1:EmptyFreeList",
              "value": 0,
              "timestamp": 631152000,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.682378",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:EmptyFreeList",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": null,
              "upper_ctrl_limit": null,
              "units": null,
              "enum_strs": [
                "",
                ""
              ],
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:EmptyFreeList",
              "pv": "13SIM1:cam1:EmptyFreeList",
              "min": null,
              "max": null
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.693772",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": null,
            "upper_ctrl_limit": null,
            "units": null,
            "enum_strs": [
              "",
              ""
            ],
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:EmptyFreeList",
            "pv": "13SIM1:cam1:EmptyFreeList"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:PoolUsedMem": [
        {
          "timestamp": "2025-07-23T11:42:43.689151",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 631152000,
            "status": 17,
            "severity": 3,
            "precision": 1,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "MB",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:PoolUsedMem",
            "pv": "13SIM1:cam1:PoolUsedMem"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.696902",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedMem",
            "update": {
              "pv": "13SIM1:cam1:PoolUsedMem",
              "value": 0,
              "timestamp": 631152000,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.700119",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:PoolUsedMem",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 631152000,
              "status": 17,
              "severity": 3,
              "precision": 1,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "MB",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:PoolUsedMem",
              "pv": "13SIM1:cam1:PoolUsedMem",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:BinX": [
        {
          "timestamp": "2025-07-23T11:42:43.697908",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.934628,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:BinX",
            "pv": "13SIM1:cam1:BinX"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.700962",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinX",
            "update": {
              "pv": "13SIM1:cam1:BinX",
              "value": 1,
              "timestamp": 1753288930.934628,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.701748",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinX",
            "value": 1,
            "timestamp": 1753288930.934628,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.702657",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinX",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.934628,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:BinX",
              "pv": "13SIM1:cam1:BinX",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:BinY": [
        {
          "timestamp": "2025-07-23T11:42:43.699072",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinY",
            "update": {
              "pv": "13SIM1:cam1:BinY",
              "value": 1,
              "timestamp": 1753288930.93463,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.703701",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.93463,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:BinY",
            "pv": "13SIM1:cam1:BinY"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.866872",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinY",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.93463,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:BinY",
              "pv": "13SIM1:cam1:BinY",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:MinX_RBV": [
        {
          "timestamp": "2025-07-23T11:42:43.863330",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinX_RBV",
            "value": 0,
            "timestamp": 1753288930.954353,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.893747",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954353,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:MinX_RBV",
            "pv": "13SIM1:cam1:MinX_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.897835",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinX_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954353,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:MinX_RBV",
              "pv": "13SIM1:cam1:MinX_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.901085",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinX_RBV",
            "update": {
              "pv": "13SIM1:cam1:MinX_RBV",
              "value": 0,
              "timestamp": 1753288930.954353,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:BinX_RBV": [
        {
          "timestamp": "2025-07-23T11:42:43.870278",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinX_RBV",
            "update": {
              "pv": "13SIM1:cam1:BinX_RBV",
              "value": 1,
              "timestamp": 1753288930.954439,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.875914",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954439,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:BinX_RBV",
            "pv": "13SIM1:cam1:BinX_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.886692",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinX_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954439,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:BinX_RBV",
              "pv": "13SIM1:cam1:BinX_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:BinY_RBV": [
        {
          "timestamp": "2025-07-23T11:42:43.879632",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954479,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:BinY_RBV",
            "pv": "13SIM1:cam1:BinY_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.883112",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinY_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954479,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:BinY_RBV",
              "pv": "13SIM1:cam1:BinY_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.896004",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinY_RBV",
            "value": 1,
            "timestamp": 1753288930.954479,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:43.904409",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:BinY_RBV",
            "update": {
              "pv": "13SIM1:cam1:BinY_RBV",
              "value": 1,
              "timestamp": 1753288930.954479,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:MinY": [
        {
          "timestamp": "2025-07-23T11:42:44.062817",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinY",
            "update": {
              "pv": "13SIM1:cam1:MinY",
              "value": 0,
              "timestamp": 1753288930.934632,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.065192",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinY",
            "value": 0,
            "timestamp": 1753288930.934632,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.074371",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.934632,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:MinY",
            "pv": "13SIM1:cam1:MinY"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.078536",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinY",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.934632,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:MinY",
              "pv": "13SIM1:cam1:MinY",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:MinY_RBV": [
        {
          "timestamp": "2025-07-23T11:42:44.067821",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954395,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:MinY_RBV",
            "pv": "13SIM1:cam1:MinY_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.082659",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinY_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954395,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:MinY_RBV",
              "pv": "13SIM1:cam1:MinY_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.085070",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MinY_RBV",
            "update": {
              "pv": "13SIM1:cam1:MinY_RBV",
              "value": 0,
              "timestamp": 1753288930.954395,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:SizeX": [
        {
          "timestamp": "2025-07-23T11:42:44.070736",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeX",
            "update": {
              "pv": "13SIM1:cam1:SizeX",
              "value": 1024,
              "timestamp": 1753288930.934633,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.076322",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeX",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.934633,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:SizeX",
              "pv": "13SIM1:cam1:SizeX",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.080098",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.934633,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:SizeX",
            "pv": "13SIM1:cam1:SizeX"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:SizeY": [
        {
          "timestamp": "2025-07-23T11:42:44.072827",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeY",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.934634,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:SizeY",
              "pv": "13SIM1:cam1:SizeY",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.081541",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeY",
            "update": {
              "pv": "13SIM1:cam1:SizeY",
              "value": 1024,
              "timestamp": 1753288930.934634,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.083772",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.934634,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:SizeY",
            "pv": "13SIM1:cam1:SizeY"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        }
      ],
      "13SIM1:cam1:SizeX_RBV": [
        {
          "timestamp": "2025-07-23T11:42:44.086186",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954598,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:SizeX_RBV",
            "pv": "13SIM1:cam1:SizeX_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.086800",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeX_RBV",
            "update": {
              "pv": "13SIM1:cam1:SizeX_RBV",
              "value": 1024,
              "timestamp": 1753288930.954598,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.219227",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeX_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954598,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:SizeX_RBV",
              "pv": "13SIM1:cam1:SizeX_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:SizeY_RBV": [
        {
          "timestamp": "2025-07-23T11:42:44.213000",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeY_RBV",
            "update": {
              "pv": "13SIM1:cam1:SizeY_RBV",
              "value": 1024,
              "timestamp": 1753288930.954628,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.233465",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.954628,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:SizeY_RBV",
            "pv": "13SIM1:cam1:SizeY_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.237940",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:SizeY_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.954628,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:SizeY_RBV",
              "pv": "13SIM1:cam1:SizeY_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        }
      ],
      "13SIM1:cam1:MaxSizeX_RBV": [
        {
          "timestamp": "2025-07-23T11:42:44.215695",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.953516,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:MaxSizeX_RBV",
            "pv": "13SIM1:cam1:MaxSizeX_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.234858",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MaxSizeX_RBV",
            "update": {
              "connected": true,
              "read_access": true,
              "write_access": true,
              "timestamp": 1753288930.953516,
              "status": 0,
              "severity": 0,
              "precision": null,
              "setpoint_timestamp": null,
              "setpoint_status": null,
              "setpoint_severity": null,
              "lower_ctrl_limit": 0,
              "upper_ctrl_limit": 0,
              "units": "",
              "enum_strs": null,
              "setpoint_precision": null,
              "sub_type": "meta",
              "obj": "13SIM1:cam1:MaxSizeX_RBV",
              "pv": "13SIM1:cam1:MaxSizeX_RBV",
              "min": 0,
              "max": 0
            }
          },
          "label": "PROCESSING META UPDATE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.237093",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MaxSizeX_RBV",
            "update": {
              "pv": "13SIM1:cam1:MaxSizeX_RBV",
              "value": 1024,
              "timestamp": 1753288930.953516,
              "connected": false,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
        }
      ],
      "13SIM1:cam1:MaxSizeY_RBV": [
        {
          "timestamp": "2025-07-23T11:42:44.223028",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "connected": true,
            "read_access": true,
            "write_access": true,
            "timestamp": 1753288930.953562,
            "status": 0,
            "severity": 0,
            "precision": null,
            "setpoint_timestamp": null,
            "setpoint_status": null,
            "setpoint_severity": null,
            "lower_ctrl_limit": 0,
            "upper_ctrl_limit": 0,
            "units": "",
            "enum_strs": null,
            "setpoint_precision": null,
            "sub_type": "meta",
            "obj": "13SIM1:cam1:MaxSizeY_RBV",
            "pv": "13SIM1:cam1:MaxSizeY_RBV"
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.231329",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MaxSizeY_RBV",
            "value": 1024,
            "timestamp": 1753288930.953562,
            "connected": true,
            "read_access": true,
            "write_access": true
          },
          "label": "INCOMING WEBSOCKET MESSAGE"
        },
        {
          "timestamp": "2025-07-23T11:42:44.238979",
          "sessionId": "session_1753296161183_g1uuoil2q",
          "data": {
            "pv": "13SIM1:cam1:MaxSizeY_RBV",
            "update": {
              "pv": "13SIM1:cam1:MaxSizeY_RBV",
              "value": 1024,
              "timestamp": 1753288930.953562,
              "connected": true,
              "read_access": true,
              "write_access": true
            }
          },
          "label": "PROCESSING VALUE UPDATE"
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
            // Process messages in order to simulate the real behavior
messages.forEach((messageWrapper, index) => {
    setTimeout(() => {
        const message = messageWrapper.data;

        setDevices((prevDevices) => {
            if (!prevDevices[deviceName]) return prevDevices;

            let updatedDevice = { ...prevDevices[deviceName] };

            // Handle meta updates
            if ('update' in message && message.update.sub_type === 'meta') {
                updatedDevice = {
                    ...updatedDevice,
                    ...message.update,
                    min: message.update.lower_ctrl_limit,
                    max: message.update.upper_ctrl_limit,
                };
            }
            // Handle value updates (when update exists but no sub_type)
            else if ('update' in message && !message.update.sub_type) {
                updatedDevice = {
                    ...updatedDevice,
                    ...message.update,
                };
            }
            // Handle direct messages with 'pv' field
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
    }, index * 100);
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