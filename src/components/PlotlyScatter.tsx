import { useRef, useEffect, useState } from 'react';
import Plot, { PlotParams } from 'react-plotly.js';

export type PlotlyScatterProps = {
  data: PlotParams['data'];
  title?: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
  height?: `h-${string}`,
  width?: `w-${string}`
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
  height = 'h-full',
  width = 'w-full',
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
    <div className={`${height} ${width} pb-4`} ref={plotContainer}>
      <Plot
        data={data}
        layout={{
          title: title,
          xaxis: { title: xAxisTitle },
          yaxis: { title: yAxisTitle },
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