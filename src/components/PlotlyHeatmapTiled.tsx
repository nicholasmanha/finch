// import React, { useEffect, useState } from 'react';
// import PlotlyHeatmap from './PlotlyHeatmap';

// type Props = {
//   url: string; // Metadata URL from Tiled (e.g., /api/v1/metadata/my_image)
// };

// export default function PlotlyHeatmapTiled({ url }: Props) {
//   const [array, setArray] = useState<number[][] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchArrayFromMetadataUrl = async () => {
//       try {
//         setError(null);

//         // Step 1: Fetch metadata
//         const metadataResp = await fetch(url);
//         console.log('fetched metadata', metadataResp);
//         const metadataJson = await metadataResp.json();
//         console.log('parsed metadata', metadataJson);

//         const fullUrl = metadataJson.data?.links?.full;
//         const shape = metadataJson.data?.attributes?.structure?.shape;
//         const dtypeInfo = metadataJson.data?.attributes?.structure?.data_type;

//         if (!fullUrl || !shape || shape.length !== 2 || !dtypeInfo) {
//           throw new Error('Invalid metadata format.');
//         }

//         const [height, width] = shape;

//         console.log('about to fetch binary')

//         // Step 2: Fetch binary array data
//         const binaryResp = await fetch(`${fullUrl}?format=application/octet-stream`);
//         const buffer = await binaryResp.arrayBuffer();
//         console.log('fetched binary data', buffer);

//         const uint8 = new Uint8Array(buffer);

//         // Step 4: Convert flat array to 2D array
//         const array2D: number[][] = Array.from({ length: height }, (_, row) =>
//           Array.from(uint8.slice(row * width, (row + 1) * width))
//         );

//         console.log({array2D})

//         setArray(array2D);
//       } catch (err) {
//         const msg = err instanceof Error ? err.message : String(err);
//         setError(`Failed to load data: ${msg}`);
//       }
//     };

//     fetchArrayFromMetadataUrl();
//   }, [url]);

//   return (
//     <div className="flex flex-col items-center gap-4 h-full">
//       {error && <div className="text-red-600">{error}</div>}
//       {array && (
//         <PlotlyHeatmap
//           array={array}
//           title="Tiled Image"
//           colorScale="Viridis"
//           lockPlotHeightToParent={true}
//           showTicks={false}
//           showScale={true}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import PlotlyHeatmap from './PlotlyHeatmap';

type Props = {
  url: string; // Metadata URL from Tiled (e.g., /api/v1/metadata/my_image)
};

export default function PlotlyHeatmapTiled({ url }: Props) {
  const [array, setArray] = useState<number[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [shape, setShape] = useState<number[] | null>(null);
  const [blockUrlTemplate, setBlockUrlTemplate] = useState<string | null>(null);

  const fetchSlice = async (zIndex: number, shape: number[], blockUrl: string) => {
    const height = shape[1];
    const width = shape[2];

    try {
      const sliceUrl = blockUrl
        .replace('{0}', zIndex.toString())
        .replace('{1}', '0')
        .replace('{2}', '0');

      const binaryResp = await fetch(`${sliceUrl}&format=application/octet-stream`);
      const buffer = await binaryResp.arrayBuffer();
      const uint8 = new Uint8Array(buffer);

      const array2D: number[][] = Array.from({ length: height }, (_, row) =>
        Array.from(uint8.slice(row * width, (row + 1) * width))
      );

      setArray(array2D);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Failed to load 2D slice: ${msg}`);
    }
  };

  useEffect(() => {
    const fetchArrayFromMetadataUrl = async () => {
      try {
        setError(null);

        const metadataResp = await fetch(url);
        const metadataJson = await metadataResp.json();

        const shape = metadataJson.data?.attributes?.structure?.shape;
        const dtypeInfo = metadataJson.data?.attributes?.structure?.data_type;
        const fullUrl = metadataJson.data?.links?.full;
        const blockUrl = metadataJson.data?.links?.block;

        if (!shape || !dtypeInfo) {
          throw new Error('Invalid metadata format.');
        }

        setShape(shape);
        setBlockUrlTemplate(blockUrl);

        // 2D array support
        if (shape.length === 2 && fullUrl) {
          const [height, width] = shape;

          const binaryResp = await fetch(`${fullUrl}?format=application/octet-stream`);
          const buffer = await binaryResp.arrayBuffer();
          const uint8 = new Uint8Array(buffer);

          const array2D: number[][] = Array.from({ length: height }, (_, row) =>
            Array.from(uint8.slice(row * width, (row + 1) * width))
          );

          setArray(array2D);
        }

        // 3D array support
        else if (shape.length === 3 && blockUrl) {
          fetchSlice(0, shape, blockUrl); // default to first slice
        }

        // Unsupported dimensions
        else {
          throw new Error(`Arrays with ${shape.length} dimensions are not supported.`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Failed to load data: ${msg}`);
      }
    };

    fetchArrayFromMetadataUrl();
  }, [url]);

  // Re-fetch slice on slider change
  useEffect(() => {
    if (shape?.length === 3 && blockUrlTemplate) {
      fetchSlice(sliderIndex, shape, blockUrlTemplate);
    }
  }, [sliderIndex]);

  return (
    <div className="flex flex-col items-center gap-4 h-4/5">
      {error && <div className="text-red-600">{error}</div>}

      {shape?.length === 3 && (
        <div className="w-full px-8">
          <input
            type="range"
            min={0}
            max={shape[0] - 1}
            value={sliderIndex}
            onChange={(e) => setSliderIndex(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600">Z-slice: {sliderIndex}</div>
        </div>
      )}

      {array && (
        <PlotlyHeatmap
          array={array}
          title="Tiled Image"
          colorScale="Viridis"
          lockPlotHeightToParent={true}
          showTicks={false}
          showScale={true}
        />
      )}
    </div>
  );
}
