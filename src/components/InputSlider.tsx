import React, { useState } from "react";

type InputSliderProps = {
  /** Slider label */
  label: string;
  /** Lowest possible value */
  min: number;
  /** Greatest possible value */
  max: number;
  /** Current value of slider */
  value: number;
  /** Unit type */
  units?: string;
  /** An array representing where vertical tick marks should be */
  marks?: number[];
  /** A function that is called with the newest value */
  onChange?: (value: number) => void;
  /** Tailwind ClassNames applied to parent container */
  styles?: string;
};

export default function InputSlider({
  label,
  min,
  max,
  value,
  units,
  marks,
  onChange,
  styles = "",
  ...props
}: InputSliderProps) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleInputChange = (newValue: number) => {
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    handleInputChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var newValue = Number(e.target.value);
    handleInputChange(newValue);
};

  return (
    <div className={`flex items-center w-full ${styles}`} {...props}>
      {label && <label className="font-medium text-gray-700 w-1/5">{label}</label>}
      <div className="flex-grow flex items-center relative w-3/5">
      {/** Slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={handleDrag}
          className="w-full absolute z-10 appearance-none hover:cursor-pointer bg-gray-200/50 h-2 rounded-lg focus:outline-none "
        />
        {/** Popup Current Number */}
        <div className="absolute z-0 -top-8 w-12 h-24" style={{left: `${((value-min) / (max - min)) * 100}%`}}>
            <div className="relative ">
                <div className="absolute w-[1px] h-4 top-2 bg-gray-400"></div>
                <div className="absolute right-4 -top-2">
                    <input 
                        type="number" 
                        value={currentValue}
                        className="w-12 text-center"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
        {/** TickMarks */}
        {marks && (
          <div className="absolute z-0 w-full flex justify-between">
            {marks.map((mark, index) => (
              <div
                key={index}
                className="w-[1px] h-4 bg-gray-400"
                style={{ left: `${((mark - min) / (max - min)) * 100}%` }}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/5 text-gray-700 text-center">
        {currentValue} {units}
      </div>
    </div>
  );
}