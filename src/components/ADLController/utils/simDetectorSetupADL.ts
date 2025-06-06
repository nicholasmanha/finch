const adSimDetectorSetup = [
    {
        "text entry": {
            "object": {
                "x": 352,
                "y": 110,
                "width": 60,
                "height": 20
            },
            "control": {
                "chan": "$(P)$(R)PeakStartY",
                "clr": 14,
                "bclr": 51
            },
            "limits": {
            },
        },
        "text update": {
            "object": {
                "x": 417,
                "y": 111,
                "width": 60,
                "height": 18
            },
            "monitor": {
                "chan": "$(P)$(R)PeakStartY_RBV",
                "clr": 54,
                "bclr": 4,
            },
            "limits": {
            }
        },
        "text": {
            "object": {
                "x": 277,
                "y": 110,
                "width": 70,
                "height": 20,
            },
            "basic attribute": {
                "clr": 14
            },
            "textix": "Start Y"
        }
    }
]