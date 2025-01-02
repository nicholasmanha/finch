import './App.css';
import { Routes, Route } from 'react-router';
import About from './pages/About';
import SamplePage1 from './pages/SamplePage1';

function App() {

  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/samplepage1" element={<SamplePage1 />} />
    </Routes>
  )
}

export default App
