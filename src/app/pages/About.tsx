import { useNavigate } from "react-router";

import Paper from "@/components/Paper";


export default function About() {

    const navigate = useNavigate();

    return (
     
            <Paper title="About">
                
                <p className="text-lg text-center mt-4">
                    This is a sample application demonstrating the use of React Router and Tailwind CSS.
                </p>
                <button 
                    className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </button>
            </Paper>

    )
}