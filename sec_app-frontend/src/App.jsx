import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LayoutDashboard, Home, ScanEye, Webcam, PersonStanding, LifeBuoy, LogOut } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import './App.css';
/* Components */
import Login from './components/Login';
import Logout from './components/Logout';
import Main from "./components/Main";
import Dashboard from './components/Dashboard';
import RSTP from './components/RTSP';
import CameraEvents from './components/CameraEvents';
import PIREvents from './components/PIREvents';
import Help from './components/Help';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div className="flex">
                {isAuthenticated && (
                    <Sidebar>
                        <SidebarItem icon={<Home size={20} className='text-slate-950 font-bold' />} text="Home" to="/" />
                        <SidebarItem icon={<LayoutDashboard size={20} className='text-slate-950 font-bold' />} text="Dashboard" to="/dashboard" />
                        <SidebarItem icon={<ScanEye size={20} className='text-slate-950 font-bold' />} text="Live_Detection" to="/rtsp-detection" />
                        <SidebarItem icon={<Webcam size={20} className='text-slate-950 font-bold'/>} text="Camera_Events" to="/camera-events" />
                        <SidebarItem icon={<PersonStanding size={20} className='text-slate-950 font-bold' />} text="PIR_Events" to="/motion-events" />
                        <SidebarItem icon={<LifeBuoy size={20} className='text-slate-950 font-bold' />} text="Help" to="/help" />
                        <hr className="my-3" />
                        <SidebarItem icon={<LogOut size={20} className='text-slate-950 font-bold' />} text="Logout" to="/logout" />  
                    </Sidebar>
                )}
                <main className="flex-grow p-4">
                    <Routes>
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Main />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/rtsp-detection" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <RSTP />
                            </ProtectedRoute>
                        } />
                        <Route path="/camera-events" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <CameraEvents />
                            </ProtectedRoute>
                        } />
                        <Route path="/motion-events" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <PIREvents />
                            </ProtectedRoute>
                        } />
                        <Route path="/help" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Help />
                            </ProtectedRoute>
                        } />
                        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} /> 

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
