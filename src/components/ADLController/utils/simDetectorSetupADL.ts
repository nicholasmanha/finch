import { parseCustomFormat } from "./ADLtoJSON";

const simDetectorSetup = parseCustomFormat(`

file {
	name="/home/epics/devel/areaDetector/ADSimDetector/simDetectorApp/op/adl/simDetectorSetup.adl"
	version=030109
}
display {
	object {
		x=233
		y=109
		width=870
		height=350
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
text {
	object {
		x=65
		y=10
		width=300
		height=25
	}
	"basic attribute" {
		clr=14
	}
	textix="Simulation Detector Setup"
	align="horiz. centered"
}
text {
	object {
		x=435
		y=10
		width=430
		height=25
	}
	"basic attribute" {
		clr=54
	}
	textix="$(P)$(R)"
	align="horiz. centered"
}
text {
	object {
		x=322
		y=55
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Peak mode"
	align="horiz. right"
}
rectangle {
	object {
		x=250
		y=50
		width=235
		height=265
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
"text entry" {
	object {
		x=352
		y=110
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakStartY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=85
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakStartX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=135
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakNumX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=160
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakNumY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=185
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakStepX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=210
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakStepY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=235
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakWidthX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=260
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakWidthY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=352
		y=285
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)PeakVariation"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=111
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakStartY_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=86
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakStartX_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=136
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakNumX_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=161
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakNumY_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=186
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakStepX_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=211
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakStepY_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=236
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakWidthX_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=261
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakWidthY_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=417
		y=285
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PeakVariation"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=277
		y=110
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Start Y"
}
text {
	object {
		x=277
		y=85
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Start X"
}
text {
	object {
		x=297
		y=135
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Num X"
}
text {
	object {
		x=297
		y=160
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Num Y"
}
text {
	object {
		x=287
		y=185
		width=60
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Step X"
}
text {
	object {
		x=287
		y=210
		width=60
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Step Y"
}
text {
	object {
		x=277
		y=235
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Width X"
}
text {
	object {
		x=277
		y=260
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Width Y"
}
text {
	object {
		x=257
		y=285
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="% Variat."
}
text {
	object {
		x=22
		y=55
		width=200
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Gains, Ofset & Noise"
	align="horiz. right"
}
rectangle {
	object {
		x=5
		y=50
		width=235
		height=245
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=82
		y=110
		width=10
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Y"
	align="horiz. right"
}
text {
	object {
		x=82
		y=85
		width=10
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="X"
	align="horiz. right"
}
text {
	object {
		x=22
		y=135
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Overall"
	align="horiz. right"
}
text {
	object {
		x=62
		y=160
		width=30
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Red"
	align="horiz. right"
}
text {
	object {
		x=42
		y=185
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Green"
	align="horiz. right"
}
text {
	object {
		x=52
		y=210
		width=40
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Blue"
	align="horiz. right"
}
"text entry" {
	object {
		x=97
		y=110
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)GainY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=97
		y=85
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)GainX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=97
		y=135
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)Gain"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=97
		y=160
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)GainRed"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=97
		y=185
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)GainGreen"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=97
		y=210
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)GainBlue"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=162
		y=111
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)GainY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=162
		y=86
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)GainX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=162
		y=136
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)Gain_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=162
		y=161
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)GainRed_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=162
		y=186
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)GainGreen_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=162
		y=211
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)GainBlue_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
text {
	object {
		x=632
		y=55
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Sine mode"
	align="horiz. right"
}
rectangle {
	object {
		x=490
		y=50
		width=375
		height=260
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=500
		y=130
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Frequency"
}
text {
	object {
		x=500
		y=105
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Amplitude"
}
text {
	object {
		x=540
		y=155
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Phase"
}
"text entry" {
	object {
		x=595
		y=130
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)XSine1Frequency"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=595
		y=105
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)XSine1Amplitude"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=595
		y=155
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)XSine1Phase"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=660
		y=131
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)XSine1Frequency_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=660
		y=106
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)XSine1Amplitude_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=660
		y=156
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)XSine1Phase_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=610
		y=80
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="X sine #1"
	align="horiz. right"
}
"text entry" {
	object {
		x=730
		y=130
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)YSine1Frequency"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=730
		y=105
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)YSine1Amplitude"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=730
		y=155
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)YSine1Phase"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=795
		y=131
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)YSine1Frequency_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=795
		y=106
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)YSine1Amplitude_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=795
		y=156
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)YSine1Phase_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=745
		y=80
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Y sine #1"
	align="horiz. right"
}
text {
	object {
		x=500
		y=230
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Frequency"
}
text {
	object {
		x=500
		y=205
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Amplitude"
}
text {
	object {
		x=540
		y=255
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Phase"
}
text {
	object {
		x=610
		y=180
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="X sine #2"
	align="horiz. right"
}
"text entry" {
	object {
		x=595
		y=230
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)XSine2Frequency"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=595
		y=205
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)XSine2Amplitude"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=595
		y=255
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)XSine2Phase"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=660
		y=231
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)XSine2Frequency_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=660
		y=206
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)XSine2Amplitude_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=660
		y=256
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)XSine2Phase_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=745
		y=180
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Y sine #2"
	align="horiz. right"
}
"text entry" {
	object {
		x=730
		y=230
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)YSine2Frequency"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=730
		y=205
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)YSine2Amplitude"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=730
		y=255
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)YSine2Phase"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=795
		y=231
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)YSine2Frequency_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=795
		y=206
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)YSine2Amplitude_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=795
		y=256
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)YSine2Phase_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=500
		y=280
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Operation"
	align="horiz. right"
}
menu {
	object {
		x=595
		y=280
		width=120
		height=20
	}
	control {
		chan="$(P)$(R)XSineOperation"
		clr=14
		bclr=51
	}
}
menu {
	object {
		x=730
		y=280
		width=120
		height=20
	}
	control {
		chan="$(P)$(R)YSineOperation"
		clr=14
		bclr=51
	}
}
text {
	object {
		x=280
		y=322
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	text-type="title"
	textix="Reset"
	align="horiz. right"
}
"message button" {
	object {
		x=335
		y=322
		width=100
		height=20
	}
	control {
		chan="$(P)$(R)Reset"
		clr=14
		bclr=51
	}
	label="Reset image"
	press_msg="1"
}
menu {
	object {
		x=54
		y=325
		width=150
		height=20
	}
	control {
		chan="$(P)$(R)SimMode"
		clr=14
		bclr=51
	}
}
text {
	object {
		x=54
		y=300
		width=150
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Simulation mode"
	align="horiz. centered"
}
text {
	object {
		x=32
		y=235
		width=60
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Offset"
}
"text entry" {
	object {
		x=97
		y=235
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)Offset"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=162
		y=236
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)Offset_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=42
		y=260
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Noise"
}
"text entry" {
	object {
		x=97
		y=260
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)Noise"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=162
		y=261
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)Noise_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}`)

const ADAttrFile = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector/ADCore/ADApp/op/adl/ADAttrFile.adl"
	version=030109
}
display {
	object {
		x=214
		y=81
		width=350
		height=110
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
rectangle {
	object {
		x=127
		y=2
		width=107
		height=21
	}
	"basic attribute" {
		clr=2
	}
}
text {
	object {
		x=130
		y=2
		width=100
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Attributes"
	align="horiz. centered"
}
rectangle {
	object {
		x=0
		y=0
		width=350
		height=110
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=25
		y=30
		width=40
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="File"
	align="horiz. right"
}
"text entry" {
	object {
		x=71
		y=31
		width=275
		height=20
	}
	control {
		chan="$(P)$(R)NDAttributesFile"
		clr=14
		bclr=51
	}
	format="string"
	limits {
	}
}
text {
	object {
		x=5
		y=55
		width=60
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Macros"
	align="horiz. right"
}
"text entry" {
	object {
		x=70
		y=56
		width=275
		height=20
	}
	control {
		chan="$(P)$(R)NDAttributesMacros"
		clr=14
		bclr=51
	}
	format="string"
	limits {
	}
}
text {
	object {
		x=5
		y=80
		width=60
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Status"
	align="horiz. right"
}
"text update" {
	object {
		x=70
		y=81
		width=275
		height=18
	}
	monitor {
		chan="$(P)$(R)NDAttributesStatus"
		clr=14
		bclr=2
	}
	clrmod="alarm"
	format="string"
	limits {
	}
}
	`
)

const ADShutter = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector-3-2/ADCore/ADApp/op/adl/ADShutter.adl"
	version=030109
}
display {
	object {
		x=85
		y=111
		width=350
		height=165
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
rectangle {
	object {
		x=122
		y=2
		width=107
		height=21
	}
	"basic attribute" {
		clr=2
	}
}
rectangle {
	object {
		x=0
		y=0
		width=350
		height=165
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=140
		y=3
		width=70
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Shutter"
	align="horiz. centered"
}
text {
	object {
		x=46
		y=34
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Shutter mode"
	align="horiz. right"
}
menu {
	object {
		x=173
		y=34
		width=120
		height=20
	}
	control {
		chan="$(P)$(R)ShutterMode"
		clr=14
		bclr=51
	}
}
text {
	object {
		x=66
		y=83
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Open/Close"
	align="horiz. right"
}
"message button" {
	object {
		x=173
		y=83
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)ShutterControl"
		clr=14
		bclr=51
	}
	label="Open"
	press_msg="1"
}
"message button" {
	object {
		x=240
		y=83
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)ShutterControl"
		clr=14
		bclr=51
	}
	label="Close"
	press_msg="0"
}
text {
	object {
		x=6
		y=58
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Status: Det."
	align="horiz. right"
}
"text update" {
	object {
		x=132
		y=59
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)ShutterStatus_RBV"
		clr=54
		bclr=2
	}
	clrmod="alarm"
	align="horiz. centered"
	format="string"
	limits {
	}
}
"text entry" {
	object {
		x=132
		y=108
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)ShutterOpenDelay"
		clr=14
		bclr=51
	}
	limits {
	}
}
text {
	object {
		x=15
		y=108
		width=110
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Delay: Open"
	align="horiz. right"
}
text {
	object {
		x=215
		y=108
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Close"
	align="horiz. right"
}
"text entry" {
	object {
		x=272
		y=108
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)ShutterCloseDelay"
		clr=14
		bclr=51
	}
	limits {
	}
}
"related display" {
	object {
		x=205
		y=136
		width=70
		height=20
	}
	display[0] {
		label="EPICS shutter setup"
		name="ADEpicsShutter.adl"
		args="P=$(P),R=$(R)"
	}
	clr=14
	bclr=51
}
text {
	object {
		x=6
		y=136
		width=190
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="EPICS shutter setup"
	align="horiz. right"
}
text {
	object {
		x=215
		y=58
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="EPICS"
	align="horiz. right"
}
"text update" {
	object {
		x=272
		y=59
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)ShutterStatusEPICS_RBV"
		clr=54
		bclr=2
	}
	clrmod="alarm"
	align="horiz. centered"
	format="string"
	limits {
	}
}
	`
)

const ADPlugins = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector-3-11/ADCore/ADApp/op/adl/ADPlugins.adl"
	version=030109
}
display {
	object {
		x=141
		y=292
		width=350
		height=80
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
text {
	object {
		x=122
		y=10
		width=1
		height=40
	}
	"basic attribute" {
		clr=14
	}
}
rectangle {
	object {
		x=0
		y=0
		width=350
		height=80
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
rectangle {
	object {
		x=122
		y=2
		width=107
		height=21
	}
	"basic attribute" {
		clr=2
	}
}
text {
	object {
		x=140
		y=3
		width=70
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Plugins"
	align="horiz. centered"
}
text {
	object {
		x=90
		y=29
		width=40
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="File"
}
text {
	object {
		x=230
		y=29
		width=30
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="ROI"
}
"related display" {
	object {
		x=135
		y=29
		width=64
		height=20
	}
	display[0] {
		label="netCDF file #1"
		name="NDFileNetCDF.adl"
		args="P=$(P), R=netCDF1:, EXT=nc"
	}
	display[1] {
		label="TIFF file #1"
		name="NDFileTIFF.adl"
		args="P=$(P), R=TIFF1:, EXT=tif"
	}
	display[2] {
		label="JPEG file #1"
		name="NDFileJPEG.adl"
		args="P=$(P), R=JPEG1:, EXT=jpg"
	}
	display[3] {
		label="NeXus file #1"
		name="NDFileNexus.adl"
		args="P=$(P), R=Nexus1:, EXT=h5"
	}
	display[4] {
		label="Magick file #1"
		name="NDFileMagick.adl"
		args="P=$(P), R=Magick1:, EXT=tif"
	}
	display[5] {
		label="HDF5 file #1"
		name="NDFileHDF5.adl"
		args="P=$(P), R=HDF1:, EXT=h5"
	}
	display[6] {
		label="Null file #1"
		name="NDFileNull.adl"
		args="P=$(P), R=Null1:, EXT=null"
	}
	clr=14
	bclr=51
}
"related display" {
	object {
		x=265
		y=29
		width=64
		height=20
	}
	display[0] {
		label="ROI #1"
		name="NDROI.adl"
		args="P=$(P), R=ROI1:"
	}
	display[1] {
		label="ROI #2"
		name="NDROI.adl"
		args="P=$(P), R=ROI2:"
	}
	display[2] {
		label="ROI #3"
		name="NDROI.adl"
		args="P=$(P), R=ROI3:"
	}
	display[3] {
		label="ROI #4"
		name="NDROI.adl"
		args="P=$(P), R=ROI4:"
	}
	display[4] {
		label="ROI 1-4 combined"
		name="NDROI4.adl"
		args="P=$(P), R1=ROI1:,R2=ROI2:, R3=ROI3:,R4=ROI4:"
	}
	clr=14
	bclr=51
}
"related display" {
	object {
		x=10
		y=29
		width=64
		height=20
	}
	display[0] {
		label="Common plugins"
		name="commonPlugins.adl"
		args="P=$(P)"
	}
	clr=14
	bclr=51
	label="-All"
}
text {
	object {
		x=10
		y=55
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Stats"
}
"related display" {
	object {
		x=65
		y=55
		width=64
		height=20
	}
	display[0] {
		label="Statistics #1"
		name="NDStats.adl"
		args="P=$(P), R=Stats1:"
	}
	display[1] {
		label="Statistics #2"
		name="NDStats.adl"
		args="P=$(P), R=Stats2:"
	}
	display[2] {
		label="Statistics #3"
		name="NDStats.adl"
		args="P=$(P), R=Stats3:"
	}
	display[3] {
		label="Statistics #4"
		name="NDStats.adl"
		args="P=$(P), R=Stats4:"
	}
	display[4] {
		label="Statistics #5"
		name="NDStats.adl"
		args="P=$(P), R=Stats5:"
	}
	display[5] {
		label="Statistics 1-5"
		name="NDStats5.adl"
		args="P=$(P), R1=Stats1:,R2=Stats2:,R3=Stats3:,R4=Stats4:,R5=Stats5:"
	}
	clr=14
	bclr=51
}
"related display" {
	object {
		x=177
		y=55
		width=80
		height=20
	}
	display[0] {
		label="Image #1"
		name="NDStdArrays.adl"
		args="P=$(P), R=image1:"
	}
	display[1] {
		label="Pva #1"
		name="NDPva.adl"
		args="P=$(P), R=Pva1:"
	}
	display[2] {
		label="Process #1"
		name="NDProcess.adl"
		args="P=$(P), R=Proc1:"
	}
	display[3] {
		label="Transform #1"
		name="NDTransform.adl"
		args="P=$(P), R=Trans1:"
	}
	display[4] {
		label="Color convert #1"
		name="NDColorConvert.adl"
		args="P=$(P), R=CC1:"
	}
	display[5] {
		label="Color convert #2"
		name="NDColorConvert.adl"
		args="P=$(P), R=CC2:"
	}
	display[6] {
		label="Overlay #1"
		name="NDOverlay.adl"
		args="P=$(P), R=Over1:"
	}
	display[7] {
		label="Overlays 1-8"
		name="NDOverlay8.adl"
		args="P=$(P), R=Over1:,O1=Over1:1:,O2=Over1:2:,O3=Over1:3:,O4=Over1:4:,O5=Over1:5:,O6=Over1:6:,O7=Over1:7:,O8=Over1:8:"
	}
	display[8] {
		label="Circular buffer #1"
		name="NDCircularBuff.adl"
		args="P=$(P), R=CB1:"
	}
	display[9] {
		label="ROI Statistics #1"
		name="NDROIStat.adl"
		args="P=$(P), R=ROIStat1:"
	}
	display[10] {
		label="Attribute #1"
		name="NDPluginAttribute.adl"
		args="P=$(P), R=Attr1:"
	}
	display[11] {
		label="FFT #1"
		name="NDFFT.adl"
		args="P=$(P), R=FFT1:"
	}
	display[12] {
		label="Scatter #1"
		name="NDScatter.adl"
		args="P=$(P), R=Scatter1:"
	}
	display[13] {
		label="Gather #1"
		name="NDGather8.adl"
		args="P=$(P), R=Gather1:"
	}
	display[14] {
		label="Codec #1"
		name="NDCodec.adl"
		args="P=$(P), R=Codec1:"
	}
	display[15] {
		label="Codec #2"
		name="NDCodec.adl"
		args="P=$(P), R=Codec2:"
	}
	clr=14
	bclr=51
	label="Other #1"
}
"related display" {
	object {
		x=264
		y=55
		width=80
		height=20
	}
	display[0] {
		label="Image #2"
		name="NDStdArrays.adl"
		args="P=$(P), R=image2:"
	}
	display[1] {
		label="Scan #1"
		name="scan_more.adl"
		args="P=$(P), S=scan1, N=1"
	}
	display[2] {
		label="Acquire Sequence"
		name="yySseq.adl"
		args="P=$(P), S=AcquireSequence"
	}
	display[3] {
		label="devIocStats"
		name="ioc_stats_soft.adl"
		args="ioc=$(P)"
	}
	display[4] {
		label="Open CV #1"
		name="ADCompVision.adl"
		args="P=$(P), R=CV1:"
	}
	display[5] {
		label="Edge #1"
		name="NDPluginEdge.adl"
		args="P=$(P), R=Edge1:"
	}
	display[6] {
		label="Bad Pixel #1"
		name="NDBadPixel.adl"
		args="P=$(P), R=BadPix1:"
	}
	display[7] {
		label="AS configMenu"
		name="configMenu.adl"
		args="P=$(P), CONFIG=ADAutoSave"
	}
	clr=14
	bclr=51
	label="Other #2"
}
	`
)

const ADBuffers = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector/ADCore/ADApp/op/adl/ADBuffers.adl"
	version=030109
}
display {
	object {
		x=603
		y=111
		width=350
		height=160
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
composite {
	object {
		x=123
		y=2
		width=105
		height=21
	}
	"composite name"=""
	children {
		rectangle {
			object {
				x=123
				y=2
				width=105
				height=21
			}
			"basic attribute" {
				clr=2
			}
		}
	}
}
text {
	object {
		x=97
		y=3
		width=157
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Buffers"
	align="horiz. centered"
}
text {
	object {
		x=50
		y=30
		width=160
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Buffers used"
	align="horiz. right"
}
"text update" {
	object {
		x=215
		y=31
		width=50
		height=18
	}
	monitor {
		chan="$(P)$(R)PoolUsedBuffers"
		clr=54
		bclr=4
	}
	align="horiz. right"
	limits {
	}
}
text {
	object {
		x=30
		y=55
		width=180
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Buffers alloc/free"
	align="horiz. right"
}
"text update" {
	object {
		x=215
		y=56
		width=50
		height=18
	}
	monitor {
		chan="$(P)$(R)PoolAllocBuffers"
		clr=54
		bclr=4
	}
	align="horiz. right"
	limits {
	}
}
"text update" {
	object {
		x=270
		y=56
		width=50
		height=18
	}
	monitor {
		chan="$(P)$(R)PoolFreeBuffers"
		clr=54
		bclr=4
	}
	align="horiz. right"
	limits {
	}
}
rectangle {
	object {
		x=0
		y=0
		width=350
		height=160
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
menu {
	object {
		x=245
		y=105
		width=90
		height=20
	}
	control {
		chan="$(P)$(R)PoolUsedMem.SCAN"
		clr=14
		bclr=51
	}
}
text {
	object {
		x=10
		y=105
		width=230
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Buffer & memory polling"
	align="horiz. right"
}
"text update" {
	object {
		x=215
		y=81
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PoolMaxMem"
		clr=54
		bclr=4
	}
	align="horiz. right"
	limits {
	}
}
"text update" {
	object {
		x=280
		y=81
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)PoolUsedMem"
		clr=54
		bclr=4
	}
	align="horiz. right"
	limits {
	}
}
text {
	object {
		x=10
		y=80
		width=200
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Memory max/used (MB)"
	align="horiz. right"
}
text {
	object {
		x=60
		y=130
		width=150
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Empty free list"
	align="horiz. right"
}
"message button" {
	object {
		x=215
		y=130
		width=83
		height=20
	}
	control {
		chan="$(P)$(R)EmptyFreeList"
		clr=14
		bclr=51
	}
	label="Empty"
	press_msg="1"
}
	`
)

const simDetector = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector-3-8/ADSimDetector/simDetectorApp/op/adl/simDetector.adl"
	version=030109
}
display {
	object {
		x=794
		y=75
		width=715
		height=945
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
rectangle {
	object {
		x=0
		y=4
		width=715
		height=25
	}
	"basic attribute" {
		clr=2
	}
}
text {
	object {
		x=0
		y=5
		width=715
		height=25
	}
	"basic attribute" {
		clr=54
	}
	textix="Simulation Detector - $(P)$(R)"
	align="horiz. centered"
}
composite {
	object {
		x=5
		y=35
		width=350
		height=340
	}
	"composite name"=""
	"composite file"="ADSetup.adl"
}
composite {
	object {
		x=5
		y=465
		width=350
		height=380
	}
	"composite name"=""
	"composite file"="ADReadout.adl"
}
composite {
	object {
		x=360
		y=665
		width=350
		height=110
	}
	"composite name"=""
	"composite file"="ADAttrFile.adl"
}
composite {
	object {
		x=360
		y=35
		width=350
		height=165
	}
	"composite name"=""
	"composite file"="ADShutter.adl"
}
composite {
	object {
		x=5
		y=380
		width=350
		height=80
	}
	"composite name"=""
	"composite file"="ADPlugins.adl"
}
composite {
	object {
		x=360
		y=780
		width=350
		height=160
	}
	"composite name"=""
	"composite file"="ADBuffers.adl"
}
composite {
	object {
		x=66
		y=867
		width=238
		height=20
	}
	"composite name"=""
	children {
		text {
			object {
				x=66
				y=867
				width=160
				height=20
			}
			"basic attribute" {
				clr=14
			}
			textix="Simulation setup"
			align="horiz. right"
		}
		"related display" {
			object {
				x=234
				y=867
				width=70
				height=20
			}
			display[0] {
				label="Simulation setup"
				name="simDetectorSetup.adl"
				args="P=$(P),R=$(R)"
			}
			clr=14
			bclr=51
		}
	}
}
rectangle {
	object {
		x=360
		y=205
		width=350
		height=455
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=405
		y=235
		width=130
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Exposure time"
	align="horiz. right"
}
"text entry" {
	object {
		x=540
		y=235
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)AcquireTime"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=605
		y=236
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)AcquireTime_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=395
		y=260
		width=140
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Acquire period"
	align="horiz. right"
}
"text entry" {
	object {
		x=540
		y=260
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)AcquirePeriod"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=605
		y=261
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)AcquirePeriod_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=455
		y=285
		width=80
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="# Images"
	align="horiz. right"
}
"text entry" {
	object {
		x=540
		y=285
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)NumImages"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=605
		y=286
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)NumImages_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text update" {
	object {
		x=605
		y=311
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)NumImagesCounter_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=365
		y=310
		width=170
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="# Images complete"
	align="horiz. right"
}
text {
	object {
		x=415
		y=335
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="# Exp./image"
	align="horiz. right"
}
"text entry" {
	object {
		x=540
		y=335
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)NumExposures"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=605
		y=336
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)NumExposures_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=583
		y=415
		width=40
		height=20
	}
	"basic attribute" {
		clr=63
	}
	"dynamic attribute" {
		vis="if zero"
		calc="A"
		chan="$(P)$(R)Acquire"
	}
	textix="Done"
	align="horiz. centered"
}
text {
	object {
		x=554
		y=415
		width=100
		height=20
	}
	"basic attribute" {
		clr=30
	}
	"dynamic attribute" {
		vis="if not zero"
		calc="A"
		chan="$(P)$(R)Acquire"
	}
	textix="Collecting"
	align="horiz. centered"
}
"message button" {
	object {
		x=540
		y=435
		width=59
		height=20
	}
	control {
		chan="$(P)$(R)Acquire"
		clr=14
		bclr=51
	}
	label="Start"
	press_msg="1"
}
"message button" {
	object {
		x=607
		y=435
		width=59
		height=20
	}
	control {
		chan="$(P)$(R)Acquire"
		clr=14
		bclr=51
	}
	label="Stop"
	press_msg="0"
}
text {
	object {
		x=465
		y=435
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Acquire"
	align="horiz. right"
}
rectangle {
	object {
		x=483
		y=207
		width=105
		height=21
	}
	"basic attribute" {
		clr=2
	}
}
text {
	object {
		x=500
		y=208
		width=70
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Collect"
	align="horiz. centered"
}
text {
	object {
		x=385
		y=360
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Image mode"
	align="horiz. right"
}
menu {
	object {
		x=490
		y=360
		width=120
		height=20
	}
	control {
		chan="$(P)$(R)ImageMode"
		clr=14
		bclr=51
	}
}
"text update" {
	object {
		x=615
		y=362
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)ImageMode_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
text {
	object {
		x=395
		y=535
		width=140
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Detector state"
	align="horiz. right"
}
"text update" {
	object {
		x=540
		y=535
		width=160
		height=18
	}
	monitor {
		chan="$(P)$(R)DetectorState_RBV"
		clr=54
		bclr=2
	}
	clrmod="alarm"
	format="string"
	limits {
	}
}
text {
	object {
		x=395
		y=560
		width=140
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Time remaining"
	align="horiz. right"
}
"text update" {
	object {
		x=540
		y=561
		width=67
		height=18
	}
	monitor {
		chan="$(P)$(R)TimeRemaining_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
"text entry" {
	object {
		x=540
		y=585
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)ArrayCounter"
		clr=14
		bclr=51
	}
	limits {
	}
}
text {
	object {
		x=405
		y=585
		width=130
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Image counter"
	align="horiz. right"
}
"text update" {
	object {
		x=605
		y=586
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)ArrayCounter_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=435
		y=610
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Image rate"
	align="horiz. right"
}
"text update" {
	object {
		x=540
		y=611
		width=100
		height=18
	}
	monitor {
		chan="$(P)$(R)ArrayRate_RBV"
		clr=54
		bclr=4
	}
	limits {
	}
}
text {
	object {
		x=365
		y=635
		width=150
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Array callbacks"
	align="horiz. right"
}
menu {
	object {
		x=520
		y=635
		width=90
		height=20
	}
	control {
		chan="$(P)$(R)ArrayCallbacks"
		clr=14
		bclr=51
	}
}
"text update" {
	object {
		x=615
		y=637
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)ArrayCallbacks_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	format="string"
	limits {
	}
}
text {
	object {
		x=385
		y=460
		width=150
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="# Queued arrays"
	align="horiz. right"
}
"text update" {
	object {
		x=540
		y=461
		width=60
		height=18
	}
	monitor {
		chan="$(P)$(R)NumQueuedArrays"
		clr=54
		bclr=4
	}
	align="horiz. right"
	limits {
	}
}
text {
	object {
		x=365
		y=385
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Trigger mode"
	align="horiz. right"
}
menu {
	object {
		x=490
		y=385
		width=120
		height=20
	}
	control {
		chan="$(P)$(R)TriggerMode"
		clr=14
		bclr=51
	}
}
"text update" {
	object {
		x=615
		y=386
		width=80
		height=18
	}
	monitor {
		chan="$(P)$(R)TriggerMode_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
text {
	object {
		x=375
		y=485
		width=160
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Wait for plugins"
	align="horiz. right"
}
menu {
	object {
		x=540
		y=485
		width=80
		height=20
	}
	control {
		chan="$(P)$(R)WaitForPlugins"
		clr=14
		bclr=51
	}
}
text {
	object {
		x=415
		y=510
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Acquire busy"
	align="horiz. right"
}
"text update" {
	object {
		x=540
		y=511
		width=160
		height=18
	}
	monitor {
		chan="$(P)$(R)AcquireBusy"
		clr=54
		bclr=2
	}
	clrmod="alarm"
	format="string"
	limits {
	}
}
	`
)

const ADReadout = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector/ADCore/ADApp/op/adl/ADReadout.adl"
	version=030109
}
display {
	object {
		x=409
		y=269
		width=350
		height=380
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
rectangle {
	object {
		x=117
		y=2
		width=117
		height=21
	}
	"basic attribute" {
		clr=2
	}
}
rectangle {
	object {
		x=0
		y=0
		width=350
		height=380
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=140
		y=3
		width=70
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Readout"
	align="horiz. centered"
}
text {
	object {
		x=168
		y=30
		width=10
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="X"
	align="horiz. right"
}
text {
	object {
		x=261
		y=30
		width=10
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Y"
	align="horiz. right"
}
"text entry" {
	object {
		x=143
		y=100
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)BinX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=236
		y=100
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)BinY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=143
		y=80
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)BinX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=236
		y=80
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)BinY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
text {
	object {
		x=62
		y=100
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Binning"
	align="horiz. right"
}
"text update" {
	object {
		x=143
		y=125
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)MinX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text entry" {
	object {
		x=143
		y=145
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)MinX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=236
		y=145
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)MinY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=236
		y=125
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)MinY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
text {
	object {
		x=12
		y=145
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Region start"
	align="horiz. right"
}
text {
	object {
		x=22
		y=190
		width=110
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Region size"
	align="horiz. right"
}
"text entry" {
	object {
		x=143
		y=190
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)SizeX"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text entry" {
	object {
		x=236
		y=190
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)SizeY"
		clr=14
		bclr=51
	}
	limits {
	}
}
"text update" {
	object {
		x=143
		y=170
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)SizeX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=236
		y=170
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)SizeY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
text {
	object {
		x=22
		y=55
		width=110
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Sensor size"
	align="horiz. right"
}
"text update" {
	object {
		x=143
		y=56
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)MaxSizeX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=236
		y=56
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)MaxSizeY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
text {
	object {
		x=29
		y=280
		width=180
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Image size (bytes)"
	align="horiz. right"
}
"text update" {
	object {
		x=236
		y=281
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)ArraySize_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=236
		y=306
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)Gain_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text entry" {
	object {
		x=143
		y=305
		width=60
		height=20
	}
	control {
		chan="$(P)$(R)Gain"
		clr=14
		bclr=51
	}
	limits {
	}
}
text {
	object {
		x=92
		y=305
		width=40
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Gain"
	align="horiz. right"
}
text {
	object {
		x=42
		y=330
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Data type"
	align="horiz. right"
}
menu {
	object {
		x=138
		y=330
		width=80
		height=20
	}
	control {
		chan="$(P)$(R)DataType"
		clr=14
		bclr=51
	}
}
"text update" {
	object {
		x=236
		y=331
		width=79
		height=18
	}
	monitor {
		chan="$(P)$(R)DataType_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=143
		y=215
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)ReverseX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=236
		y=215
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)ReverseY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	format="string"
	limits {
	}
}
text {
	object {
		x=62
		y=235
		width=70
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Reverse"
	align="horiz. right"
}
menu {
	object {
		x=143
		y=235
		width=60
		height=18
	}
	control {
		chan="$(P)$(R)ReverseX"
		clr=14
		bclr=51
	}
}
menu {
	object {
		x=236
		y=235
		width=60
		height=18
	}
	control {
		chan="$(P)$(R)ReverseY"
		clr=14
		bclr=51
	}
}
text {
	object {
		x=32
		y=355
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Color mode"
	align="horiz. right"
}
menu {
	object {
		x=138
		y=355
		width=80
		height=20
	}
	control {
		chan="$(P)$(R)ColorMode"
		clr=14
		bclr=51
	}
}
"text update" {
	object {
		x=236
		y=356
		width=79
		height=18
	}
	monitor {
		chan="$(P)$(R)ColorMode_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	format="string"
	limits {
	}
}
text {
	object {
		x=32
		y=255
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Image size"
	align="horiz. right"
}
"text update" {
	object {
		x=143
		y=256
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)ArraySizeX_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
"text update" {
	object {
		x=236
		y=256
		width=61
		height=18
	}
	monitor {
		chan="$(P)$(R)ArraySizeY_RBV"
		clr=54
		bclr=4
	}
	align="horiz. centered"
	limits {
	}
}
	`
)

const ADSetup = parseCustomFormat(
	`
	
file {
	name="/home/epics/devel/areaDetector/ADCore/ADApp/op/adl/ADSetup.adl"
	version=030109
}
display {
	object {
		x=389
		y=255
		width=350
		height=340
	}
	clr=14
	bclr=4
	cmap=""
	gridSpacing=5
	gridOn=0
	snapToGrid=0
}
"color map" {
	ncolors=65
	colors {
		ffffff,
		ececec,
		dadada,
		c8c8c8,
		bbbbbb,
		aeaeae,
		9e9e9e,
		919191,
		858585,
		787878,
		696969,
		5a5a5a,
		464646,
		2d2d2d,
		000000,
		00d800,
		1ebb00,
		339900,
		2d7f00,
		216c00,
		fd0000,
		de1309,
		be190b,
		a01207,
		820400,
		5893ff,
		597ee1,
		4b6ec7,
		3a5eab,
		27548d,
		fbf34a,
		f9da3c,
		eeb62b,
		e19015,
		cd6100,
		ffb0ff,
		d67fe2,
		ae4ebc,
		8b1a96,
		610a75,
		a4aaff,
		8793e2,
		6a73c1,
		4d52a4,
		343386,
		c7bb6d,
		b79d5c,
		a47e3c,
		7d5627,
		58340f,
		99ffff,
		73dfff,
		4ea5f9,
		2a63e4,
		0a00b8,
		ebf1b5,
		d4db9d,
		bbc187,
		a6a462,
		8b8239,
		73ff6b,
		52da3b,
		3cb420,
		289315,
		1a7309,
	}
}
rectangle {
	object {
		x=121
		y=2
		width=107
		height=21
	}
	"basic attribute" {
		clr=2
	}
}
rectangle {
	object {
		x=0
		y=0
		width=350
		height=340
	}
	"basic attribute" {
		clr=14
		fill="outline"
	}
}
text {
	object {
		x=149
		y=3
		width=50
		height=20
	}
	"basic attribute" {
		clr=54
	}
	textix="Setup"
	align="horiz. centered"
}
text {
	object {
		x=68
		y=315
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Debugging"
	align="horiz. right"
}
"related display" {
	object {
		x=167
		y=315
		width=70
		height=20
	}
	display[0] {
		label="asyn record"
		name="asynRecord.adl"
		args="P=$(P),R=$(R)AsynIO"
	}
	display[1] {
		label="Save restore status"
		name="save_restoreStatus_more.adl"
		args="P=$(P)"
	}
	clr=14
	bclr=51
}
text {
	object {
		x=58
		y=286
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Connection"
	align="horiz. right"
}
"message button" {
	object {
		x=166
		y=286
		width=80
		height=20
	}
	control {
		chan="$(P)$(R)AsynIO.CNCT"
		clr=14
		bclr=51
	}
	label="Connect"
	press_msg="1"
}
"message button" {
	object {
		x=251
		y=286
		width=80
		height=20
	}
	control {
		chan="$(P)$(R)AsynIO.CNCT"
		clr=14
		bclr=51
	}
	label="Disconnect"
	press_msg="0"
}
text {
	object {
		x=197
		y=259
		width=90
		height=20
	}
	"basic attribute" {
		clr=63
	}
	"dynamic attribute" {
		vis="if not zero"
		calc="0"
		chan="$(P)$(R)AsynIO.CNCT"
	}
	textix="Connected"
	align="horiz. centered"
}
text {
	object {
		x=182
		y=259
		width=120
		height=20
	}
	"basic attribute" {
		clr=20
	}
	"dynamic attribute" {
		vis="if zero"
		chan="$(P)$(R)AsynIO.CNCT"
	}
	textix="Disconnected"
	align="horiz. centered"
}
text {
	object {
		x=70
		y=59
		width=100
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="EPICS name"
	align="horiz. right"
}
text {
	object {
		x=50
		y=84
		width=120
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Manufacturer"
	align="horiz. right"
}
text {
	object {
		x=80
		y=34
		width=90
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="asyn port"
	align="horiz. right"
}
text {
	object {
		x=120
		y=109
		width=50
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Model"
	align="horiz. right"
}
text {
	object {
		x=40
		y=134
		width=130
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Serial number"
	align="horiz. right"
}
text {
	object {
		x=10
		y=159
		width=160
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Firmware version"
	align="horiz. right"
}
text {
	object {
		x=60
		y=184
		width=110
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="SDK version"
	align="horiz. right"
}
text {
	object {
		x=30
		y=209
		width=140
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="Driver version"
	align="horiz. right"
}
text {
	object {
		x=30
		y=234
		width=140
		height=20
	}
	"basic attribute" {
		clr=14
	}
	textix="ADCore version"
	align="horiz. right"
}
text {
	object {
		x=175
		y=60
		width=165
		height=18
	}
	"basic attribute" {
		clr=54
	}
	textix="$(P)$(R)"
}
"text update" {
	object {
		x=175
		y=85
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)Manufacturer_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=35
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)PortName_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=110
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)Model_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=135
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)SerialNumber_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=160
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)FirmwareVersion_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=185
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)SDKVersion_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=210
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)DriverVersion_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
"text update" {
	object {
		x=175
		y=235
		width=165
		height=18
	}
	monitor {
		chan="$(P)$(R)ADCoreVersion_RBV"
		clr=54
		bclr=4
	}
	format="string"
	limits {
	}
}
	`
)

export { simDetector, ADSetup, ADAttrFile, ADPlugins, ADBuffers, ADReadout, ADShutter};