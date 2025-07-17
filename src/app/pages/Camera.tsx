import CameraContainer from "@/components/Camera/CameraContainer";
export default function Camera() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Area Detector Live Stream</h1>
            <CameraContainer prefix="Basler5472" enableControlPanel={true} enableSettings={false} canvasSize="medium"/>
        </div>
    )
}