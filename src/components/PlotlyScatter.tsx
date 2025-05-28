import { useRef, useEffect, useState } from 'react';
import Plot, { PlotParams } from 'react-plotly.js';
import { cn } from '@/lib/utils';

export type PlotlyScatterProps = {
  data: PlotParams['data'];
  title?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  xAxisRange?: [number, number];
  yAxisRange?: [number, number];
  xAxisLayout?: {[key: string]: any};
  yAxisLayout?: {[key: string]: any};
  className?: string;
};

const sampleData: PlotParams['data'] = [
  {
    x: [1, 2, 3],
    y: [2, 6, 3],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'red' },
  },
];

export default function PlotlyScatter({
  data = sampleData,
  title,
  xAxisTitle,
  yAxisTitle,
  xAxisRange,
  yAxisRange,
  xAxisLayout,
  yAxisLayout,
  className,
}: PlotlyScatterProps) {
  const plotContainer = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Hook to update dimensions dynamically
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    if (plotContainer.current) {
      resizeObserver.observe(plotContainer.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={cn(`pb-4`, className)} ref={plotContainer}>
      <Plot
        data={data}
        layout={{
          title: title,
          xaxis: { 
            title: xAxisTitle,
            range: xAxisRange ? xAxisRange : undefined,
            ...xAxisLayout,
          },
          yaxis: { 
            title: yAxisTitle,
            range: yAxisRange ? yAxisRange : undefined, 
            ...yAxisLayout,
          },
          autosize: true,
          width: dimensions.width,
          height: dimensions.height,
          margin: {
            l: xAxisTitle ? 60 : 30,
            r: 30,
            t: 30,
            b: yAxisTitle ? 60 : 30,
          },
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}