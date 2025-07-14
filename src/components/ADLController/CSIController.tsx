import { useState } from "react";
import PresentationLayer from "./PresentationLayer";
import CSIControllerContent from "./CSIControllerContent";

export type CSIControllerProps = {
  className?: string;
  fileName?: string;
  P?: string;
  R?: string;
};

export default function CSIController({
  className,
  fileName,
  P,
  R,
}: CSIControllerProps) {
  const [configuredProps, setConfiguredProps] = useState<{
    fileName: string;
    P: string;
    R: string;
  } | null>(null);

  const finalFileName = configuredProps?.fileName || fileName;
  const finalP = configuredProps?.P || P;
  const finalR = configuredProps?.R || R;

  if (!finalFileName || !finalP || !finalR) {
    return (
      <PresentationLayer
        onSubmit={(fileName, P, R) => {
          setConfiguredProps({ fileName, P, R });
        }}
      />
    );
  }

  return (
    <CSIControllerContent
      className={className}
      fileName={finalFileName}
      P={finalP}
      R={finalR}
    />
  );
}