export function logNormalizeArray(array2D: number[][], lowerPercentile = 10, upperPercentile = 99.99): number[][] {
    const flat = array2D.flat().filter((v) => v > 0); // exclude zeros for log
  
    // Compute percentiles
    const sorted = [...flat].sort((a, b) => a - b);
    const lowerIdx = Math.floor((lowerPercentile / 100) * sorted.length);
    const upperIdx = Math.floor((upperPercentile / 100) * sorted.length);
    const vmin = sorted[lowerIdx];
    const vmax = sorted[upperIdx];
    const logVmin = Math.log(vmin);
    const logVmax = Math.log(vmax);
    const logRange = logVmax - logVmin || 1;
  
    return array2D.map(row =>
      row.map(val => {
        if (val <= 0) return 0; // or NaN if preferred
        const logVal = Math.log(val);
        return ((logVal - logVmin) / logRange) * 255; // scale to 0–255
      })
    );
  }