import Button from "../../components/Button";
import { useNavigate } from "react-router";

export default function About() {
    const navigate = useNavigate();
    return (
        <div className="text-amber-50">
            <p className="text-sky-600">About</p>
            <Button  text="sample page" cb={()=> {navigate('/samplepage1')}}/>
        </div>
    )
}