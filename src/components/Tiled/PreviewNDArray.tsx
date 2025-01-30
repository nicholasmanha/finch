import { useState, useEffect, useCallback } from "react";
import InputSlider from "../InputSlider";
import { TiledSearchItem, ArrayStructure } from "./types";
import { generateSearchPath, generateFullImagePngPath, numpyTypeSizesBytes } from './utils';
import {  } from "./apiClient";


type PreviewNDArrayProps = {
    arrayItem?: TiledSearchItem<ArrayStructure>
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

export default function PreviewNDArray({
    arrayItem
}: PreviewNDArrayProps) {
    if (arrayItem) {
        const shape = arrayItem.attributes.structure.shape
        const dims = shape.length;
        const sliderCount = dims - 2; //2D array is an image, no slider needed, 3D array needs a single slider, etc.
        var initialSliders:Slider[] = [];
        //the first values from shape represent the number of stacks, the last two dims are the actual 'image' size
        for ( let i = 0; i < sliderCount; i++) {
            const newSlider = {
                min: 0,
                max: shape[i],
                index: i,
                value: Math.floor((shape[i]) / 2)
            };
            initialSliders.push(newSlider);
        }

        const handleSliderChange = (newValue:number, slider:Slider) => {
            //make an API call to overwrite the current image

            //set state for the slider values
        }

        const [ sliders, setSliders ] = useState(initialSliders);
        const [ imageUrl, setImageUrl ] = useState('');
        const [ popoutUrl, setPopoutUrl ] = useState('');

        const handleArrayClick = useCallback(() => {
            //get path of array and set as image URL
            //we need to downsample certain images based on size
            if (dims < 2) {
                console.error('Current UI only supports 2D+ arrays');
                return;
            }
            var step = 1; //the step to call for both X and Y axis when retrieving array data, 1 is all, 2 is every other, etc..
            const letter = arrayItem.attributes.structure.data_type.kind[0] as keyof typeof numpyTypeSizesBytes;
            const bytesPerElement = numpyTypeSizesBytes[letter];
            const totalImageSizeBytes = shape[shape.length-1] * shape[shape.length-2] * bytesPerElement; //last two index are the frame data
            const maxBytesAllowed = 1000000;
            if (totalImageSizeBytes > maxBytesAllowed) {
                const ratio = totalImageSizeBytes / maxBytesAllowed;
                step = Math.ceil(Math.sqrt(ratio)); //make a step in both X and Y, so step should be square root of the ratio
            }
            const searchPath = generateSearchPath(arrayItem); //TODO: modify this function call so that we include the slider values
            const stack = sliders.map((slider) => slider.value);
            const reducedImagePath = generateFullImagePngPath(searchPath, step, step, stack);
            setImageUrl(reducedImagePath); //renders in the preview
            const fullSizeImagePath = generateFullImagePngPath(searchPath, 1);
            setPopoutUrl(fullSizeImagePath); //attaches to a click handler for when users want to see full image in new tab
        }, []);


        useEffect(() => {
            //make an api call to fill the image
        }, [])
        return (
            <div className="flex flex-col space-y-2">
                <div className="relative bg-slate-300 min-h-56 w-56 m-auto">
                    {popoutUrl && <div onClick={()=>onPopoutClick(popoutUrl)} className="absolute top-2 right-2 w-6 aspect-square hover:cursor-pointer hover:text-slate-500">{arrowTopRight}</div>}
                    {imageUrl && <img src={imageUrl} className="w-full h-full"/>}
                </div>
                <div>
                    {sliders.map((slider) => <InputSlider key={slider.index} min={slider.min} max={slider.max} value={slider.value} onChange={(newValue)=>handleSliderChange(newValue, slider)}/>)}
                </div>
            </div>
        )
    }
}