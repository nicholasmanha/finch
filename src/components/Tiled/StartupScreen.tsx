import { useState } from 'react';

import Button from '../Button';
import { getSearchResults } from './apiClient';

type StartupScreenProps = {
    url: string | undefined,
    handleUrlChange: Function,
    handleSubmit: Function
}
export default function StartupScreen({
    url,
    handleUrlChange,
    handleSubmit,
    ...props
}: StartupScreenProps) {

    const [ warning, setWarning ] = useState< JSX.Element | null>(null);

    const testTiledConnection = async (url:string | undefined) => {
        console.log({url})
        //ping the tiled server at the url and check if we get a response.
        const res = await getSearchResults('', ()=>{}, url);
        console.log(typeof res)
        if (typeof res !== 'string' && 'data' in res) {
            //Tiled will return a data field when it's working
            console.log({res})
            handleSubmit();
        } else {
            //warn the user that the url isn't working
            console.log({res})
            setWarning(
                <p>
                    Did not receive a valid response from the above url. Verify the url.
                </p>
            );
        }
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-8 h-full w-full" {...props}>
            <div className="h-1/2 flex flex-col space-y-8 justify-end py-8 items-center">
                <h2 className="text-slate-700 font-light text-lg">Enter your Tiled url</h2>
                <input 
                    className="w-72 h-10 pl-2 border border-slate-500" 
                    type="text" 
                    value={url ? url : ''} 
                    onChange={e=> handleUrlChange(e.target.value)}>
                </input>
                <Button disabled={url ? false : true} text="Submit" cb={()=>testTiledConnection(url)}/>
            </div>
            <div className="h-1/2">
                {warning}
            </div>
        </div>
    )
}
