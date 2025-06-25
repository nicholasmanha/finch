import { CSSProperties, useState, useEffect, useRef } from "react";

type InputTextProps = {
    label?: string;
    onSubmit?: (value: string) => void;
    isDisabled?: boolean;
    style?: CSSProperties;
    val?: string | number | boolean;
};

export default function InputText({
    label = '',
    onSubmit = (input) => { console.log('submit ' + input) },
    isDisabled = false,
    style,
    val = ''
}: InputTextProps) {
    if (typeof val === 'string') {


        const [inputValue, setInputValue] = useState<string>(val);
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (val !== undefined) {
                setInputValue(val);
            }
        }, [val]);

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            e.target.select();
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        };

        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                onSubmit(inputValue);
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
                    onFocus={handleFocus}
                    style={style}
                />
            </label>
        );
    }
}