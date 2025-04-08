import React, { useMemo, useState } from "react";


import Button from "../../components/Button";
import Tiled from "../../components/Tiled/Tiled";
import { useNavigate } from "react-router";
import TableDeviceController from "@/components/TableDeviceController";

export default function About() {

    const navigate = useNavigate();
    return (
        <div className="">
            <p className="text-sky-600">About</p>
            <Button text="sample page" cb={()=> {navigate('/samplepage1')}}/>
            <Button text="qserver" cb={()=> {navigate('/qserver')}}/>
            <TableDeviceController />
            
            {/* <div>
                <Tiled onSelectCallback={(links:any) => console.log(links)} isPopup={true} closeOnSelect={true}/>
            </div> */}
        </div>
    )
}