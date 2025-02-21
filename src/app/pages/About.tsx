import Button from "../../components/Button";
import Tiled from "../../components/Tiled/Tiled";
import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();
    return (
        <div className="">
            <p className="text-sky-600">About</p>
            <Button text="sample page" cb={()=> {navigate('/samplepage1')}}/>
            <div>
                <Tiled onSelectCallback={(links:any) => console.log(links)}/>
            </div>
        </div>
    )
}