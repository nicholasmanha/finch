import { useState} from "react";

import InputNumber from "./InputNumber";
import { cn } from "@/lib/utils";
import { ArrowCircleRight, ArrowCircleLeft } from "@phosphor-icons/react";
type ControllerRelativeMoveProps = {
    handleEnter?: (input: number | null) => void;
    inputLabel?: string;
    inputClassName?: string;
    className?: string;
    currentValue: number | null;
}
export default function ControllerRelativeMove({handleEnter, inputLabel, inputClassName, className, currentValue}: ControllerRelativeMoveProps) {
    const [ inputValue, setInputValue ] = useState<number | null>(null);
    const resultantAddition = currentValue !== null && inputValue !== null ? currentValue + inputValue : null;
    const resultantSubtraction = currentValue !== null && inputValue !== null ? currentValue - inputValue : null;

    const subtractionText = resultantSubtraction !== null ? `${resultantSubtraction} ${inputLabel}` : '';
    const additionText = resultantAddition !== null ? `${resultantAddition} ${inputLabel}` : '';

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <p className="font-extralight w-12 text-right">{subtractionText}</p>
            <ArrowCircleLeft size={24} className="hover:text-sky-500 hover:cursor-pointer" onClick={()=>handleEnter && handleEnter(resultantSubtraction)} />
            <InputNumber className={`w-24 text-center ${inputClassName}`} onChange={(input) => setInputValue(input)} inputClassName="text-center"/>
            <ArrowCircleRight size={24} className="hover:text-sky-500 hover:cursor-pointer" onClick={()=>handleEnter && handleEnter(resultantAddition)}/>
            <p className="font-extralight w-12 text-left">{additionText}</p>
        </div>
    )
}


