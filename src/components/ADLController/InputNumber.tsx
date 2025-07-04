import { CSSProperties, useState, useEffect, useRef } from "react";

type InputIntegerProps = {
    label?: string;
    onSubmit?: (value: number) => void;
    isDisabled?: boolean;
    precision?: number | null
    style?: CSSProperties;
    val?: number | string | boolean;
};

export default function InputInteger({
    label = '',
    onSubmit = (input) => { console.log('submit ' + input) },
    isDisabled = false,
    style,
    val
}: InputIntegerProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof val === 'number') {
            setInputValue(val.toFixed(2));
        } else {
            setInputValue('');
        }
    }, [val]);

    if (typeof val !== 'number') {
        return null; 
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^$|^[0-9]*\.?[0-9]*$/.test(newValue)) {
            setInputValue(newValue);
        }
    };

    const formatToTwoDecimals = () => {
        if (inputValue === '') {
            setInputValue('');
            return;
        }
        const num = parseFloat(inputValue);
        if (!isNaN(num)) {
            setInputValue(num.toFixed(2));
        } else {
            setInputValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            formatToTwoDecimals();
            const num = parseFloat(inputValue);
            if (!isNaN(num)) {
                onSubmit(num);
            }
        }
    };

    return (
        <label className={`${isDisabled ? 'text-slate-400' : 'text-black'} w-full max-w-64 flex justify-between`}>
            {label}
            <input
                ref={inputRef}
                disabled={isDisabled}
                type="text"
                value={inputValue}
                className={`${isDisabled ? 'hover:cursor-not-allowed' : ''} w-1/2 border border-slate-300 pl-2`}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                onBlur={formatToTwoDecimals}
                onFocus={handleFocus}
                style={style}
            />
        </label>
    );
}