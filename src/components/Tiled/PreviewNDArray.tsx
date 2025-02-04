import { useState, useEffect, useCallback } from "react";
import InputSlider from "../InputSlider";
import { TiledSearchItem, ArrayStructure } from "./types";
import { generateSearchPath, generateFullImagePngPath, numpyTypeSizesBytes } from './utils';
import {  } from "./apiClient";


type PreviewNDArrayProps = {
    arrayItem: TiledSearchItem<ArrayStructure>;
};

type Slider = {
    min: number;
    max: number;
    index: number;
    value: number;
};

const arrowsPointingOut = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>;
const arrowDownTray = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>;
const arrowTopRight = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>;

const onPopoutClick =(popoutUrl:string) => {
    //open a new tab with the specified URL
    window.open(popoutUrl, '_blank', 'noopener,noreferrer');
};

const createSliders = (sliderCount:number, shape:number[]) => {
    var initialSliders:Slider[] = [];
    //the first values from shape represent the number of stacks, the last two dims are the actual 'image' size
    for ( let i = 0; i < sliderCount; i++) {
        const newSlider = {
            min: 0,
            max: shape[i]-1,
            index: i,
            value: Math.floor((shape[i]) / 2)
        };
        initialSliders.push(newSlider);
    };
    return initialSliders;
}
export default function PreviewNDArray({
    arrayItem
}: PreviewNDArrayProps) {
    const [ sliders, setSliders ] = useState<Slider[]>([]);
    const [ imageUrl, setImageUrl ] = useState('');
    const [ popoutUrl, setPopoutUrl ] = useState('');

    const maxBytesAllowed = 1000000;
    const shape = arrayItem.attributes.structure.shape;
    const dims = shape.length;
    const sliderCount = dims - 2; //2D array is an image, no slider needed, 3D array needs a single slider, etc.
    

    const handleSliderChange = (newValue:number, slider:Slider) => {
        //make an API call to overwrite the current image

        var stack = sliders.map((slider) => slider.value);
        stack[slider.index] = newValue;
        updateImage(stack);
        setSliders((prevState) => {
            var newState = [...prevState];
            newState[slider.index].value = newValue;
            return newState;
        })
    }


    const updateImage = (stack?:number[]) => {
        var stepX = 1;
        var stepY = 1;
        const letter = arrayItem.attributes.structure.data_type.kind[0] as keyof typeof numpyTypeSizesBytes;
        const bytesPerElement = numpyTypeSizesBytes[letter];
        const totalImageSizeBytes = shape[shape.length-1] * shape[shape.length-2] * bytesPerElement; //last two index are always the frame data to be displayed
        if (totalImageSizeBytes > maxBytesAllowed) {
            const ratio = totalImageSizeBytes / maxBytesAllowed;
            let squareStep = Math.ceil(Math.sqrt(ratio));
            //TO DO - downsamplke for rectangular images instead of assumed square
            stepX = squareStep;
            stepY = squareStep;
        }
        const searchPath = generateSearchPath(arrayItem);
        const reducedImagePath = generateFullImagePngPath(searchPath, stepY, stepX, stack);
        setImageUrl(reducedImagePath); 
        const fullSizeImagePath = generateFullImagePngPath(searchPath, 1, 1, stack);
        setPopoutUrl(fullSizeImagePath); 
    }

    useEffect(() => {
        //make an api call to fill the image
        if (!arrayItem) return;

        const stack = shape.slice(0, sliderCount).map((dim) => Math.floor(dim/2));
        setSliders(createSliders(sliderCount, shape));
        updateImage(stack);
    }, [arrayItem])
    return (
        <div className="flex flex-col space-y-2">
            <p className="text-sky-900 text-center">{arrayItem.id}</p>
            <div className={`${sliderCount > 2 ? 'flex-wrap' : 'flex-col'} flex items-center justify-center`}>
                <div className="relative bg-slate-300 h-72 aspect-square m-auto">
                    {popoutUrl && <div onClick={()=>onPopoutClick(popoutUrl)} className="absolute top-2 right-2 w-6 aspect-square hover:cursor-pointer hover:text-slate-500">{arrowTopRight}</div>}
                    {imageUrl && <img src={imageUrl} className="w-full h-full"/>}
                    <p className="text-sm text-center text-slate-500">{`True Dimensions:  [${arrayItem.attributes.structure.shape.join(', ')}]`}</p>
                </div>
                <div className={`${sliderCount > 0 ? 'w-72' : 'hidden'} flex flex-col space-y-4 pt-6 px-4`}>
                    {sliders.map((slider, index) => <InputSlider key={index} showSideInput={false} min={slider.min} max={slider.max} value={slider.value} onChange={(newValue)=>handleSliderChange(newValue, slider)}/>)}
                </div>
            </div>
        </div>
    )
}