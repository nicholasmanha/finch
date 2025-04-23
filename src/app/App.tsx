import './App.css';
import { Routes, Route } from 'react-router';
import About from './pages/About';
import SamplePage1 from './pages/SamplePage1';
import QServer from './pages/QServer';
import Tiled from '../components/Tiled/Tiled';
import Devices from './pages/Devices';
import Bolt from './pages/Bolt';
import Camera from './pages/Camera';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Camera/>} />
      <Route path="/samplepage1" element={<SamplePage1 />} />
      <Route path="/qserver" element={<QServer />} />
      <Route path="/tiled" element={<Tiled/>} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/bolt" element={<Bolt />} />
      <Route path="/camera" element={<Camera />} />
    </Routes>
  )
}

export default App
