import { cn } from "@/lib/utils";
import ADLCanvas from "./CSICanvas";
import { useADLData } from "./utils/useUIData";

export type ADLViewProps = {
  className?: string;
  fileName: string;
  [key: string]: any;
};

export default function ADLView({
  className,
  fileName,
  ...args
}: ADLViewProps) {
  // ADLData is Entry[] (aka from the ADL file), devices are the devices from the WS
  const { ADLData, loading, error, devices, onSubmitSettings } = useADLData({
    fileName,
    args
  });
  console.log(fileName)
  if (loading) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-blue-500">Loading {fileName}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!ADLData) {
    return (
      <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
        <div className="text-white">No data available</div>
      </div>
    );
  }

  return (
    <div className={cn("inline-block rounded-xl bg-slate-100 p-4 mt-4", className)}>
      <ADLCanvas
        ADLData={ADLData}
        devices={devices}
        onSubmit={onSubmitSettings}
        {...args}
      />
    </div>
  );
}