import { CSSProperties, useState, useEffect } from "react";

type InputIntegerProps = {
    label?: string;
    onSubmit?: (value: number) => void;
    isDisabled?: boolean;
    style?: CSSProperties;
    val?: number;
};

export default function InputInteger({
    label = '',
    onSubmit = (input) => { console.log('submit ' + input) },
    isDisabled = false,
    style,
    val
}: InputIntegerProps) {
    const [value, setValue] = useState<string | number>(val ?? '');

    useEffect(() => {
        if (val !== undefined) {
            setValue(val);
        }
    }, [val]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // Allow numbers with decimals and empty string
        if (newValue === '' || !isNaN(parseFloat(newValue))) {
            if (newValue === '') {
                setValue('');
            } else {
                // Convert to number but preserve decimal places
                const numValue = parseFloat(newValue);
                setValue(numValue);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (typeof value === 'number') {
                onSubmit(value);
            }
        }
    };

    return (
        <label className={`${isDisabled ? 'text-slate-400' : 'text-black'} w-full max-w-64 flex justify-between`}>
            {label}
            <input
                disabled={isDisabled}
                type="text"
                value={typeof value === 'number' ? value.toFixed(2) : parseFloat(value).toFixed(2)}
                className={`${isDisabled ? 'hover:cursor-not-allowed' : ''} w-1/2 border border-slate-300 pl-2`}
                onKeyDown={handleKeyPress}
                onChange={handleChange}
                style={style}
            />
        </label>
    )
}