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
        if (!isNaN(parseFloat(newValue)) || newValue==='' || newValue==='.') {
            if (newValue === '') {
                setValue('');
            } else {
                setValue(newValue);
            }
        }
        
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log(typeof value)
            if (typeof value === 'number') {
                onSubmit(value);
            }
            else if(typeof value === 'string') {
                onSubmit(parseFloat(value));
            }
        }
    };

    return (
        <label className={`${isDisabled ? 'text-slate-400' : 'text-black'} w-full max-w-64 flex justify-between`}>
            {label}
            <input
                disabled={isDisabled}
                type="text"
                value={value}
                className={`${isDisabled ? 'hover:cursor-not-allowed' : ''} w-1/2 border border-slate-300 pl-2`}
                onKeyDown={handleKeyPress}
                onChange={handleChange}
                style={style}
            />
        </label>
    )
}