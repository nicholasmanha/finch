import './App.css';
import { Routes, Route } from 'react-router';
import About from './pages/About';
import SamplePage1 from './pages/SamplePage1';
import QServer from './pages/QServer';
import Tiled from '../components/Tiled/Tiled';
import Devices from './pages/Devices';
import Bolt from './pages/Bolt';
import Camera from './pages/Camera';
import HubAppLayout from '@/components/HubAppLayout';
import BoltControl from '@/features/bolt/BoltControl';
import ContainerQServer from '@/components/QServer/ContainerQServer';

import { RouteItem } from '@/types/navigationRouterTypes';

import { House, Joystick, StackPlus, ImageSquare  } from "@phosphor-icons/react";

function App() {
  const routes:RouteItem[] = [
    {element:<About />, path: "/", label: "Home", icon: <House size={32} />},
    {element:<BoltControl/>, path: "/control", label: "Control", icon: <Joystick size={32} />},
    {element:<QServer />, path: "/qserver", label: "Q Server", icon: <StackPlus size={32} />},
    {element:<Tiled />, path: "/data", label: "Data", icon: <ImageSquare size={32} />},
  ]
  return (
    <HubAppLayout routes={routes}/>
  )

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
