import React, { useEffect } from 'react';
import '../App.css';
import TapoCamera from '../assets/tapoc200.png';
import HWSensor from '../assets/hw-201.jpg';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    useEffect(() => {
        const currentDayOfWeek = new Date().getDay();
        
        const widget = document.getElementById('widget');
        const days = widget.querySelectorAll('.rounded-3xl');
        days[currentDayOfWeek].classList.add('bg-slate-700'); 
    }, []); 

    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    return (
        <div className='bg-gray-50'>
            <div className='flex justify-center mt-6 mb-6'>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Monitoring <mark className="px-2 text-white bg-slate-950 rounded dark:bg-blue-500">Devices</mark> 
                </h1>
            </div>

            <div className="flex justify-center mt-8"> 
                <div className="flex justify-between max-w-full">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-8">
                        <a href="#">
                            <img className="rounded-t-lg h-80" src={TapoCamera} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Camera Tapo C200</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Follow this section to get more information about the events associated with the IP camera, currently connected to our application.</p>
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <Link to="/camera-events" className='flex'>
                                    <span>Read more</span>
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </Link>
                                
                            </a>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-8">
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg h-80" src={HWSensor} alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Motion sensor HW-201</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Follow this section to take a deep look about all the events associated with the motion sensor, which is able to send information in real time about motion detections.</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <Link to="/motion-events" className='flex'>
                                        <span>Read more</span>
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                        </svg>
                                    </Link>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex flex-col items-center justify-center overflow-hidden py-6 sm:py-12" style={{ marginTop: '5rem' }}>
                <div className="flex justify-between space-x-1 rounded-3xl bg-slate-800 p-8" id="widget">
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => {
                        let realDay = new Date().getDate() - new Date().getDay() + index;
                        if (realDay < 1) realDay += daysInMonth;
                        else if (realDay > daysInMonth) realDay -= daysInMonth;
                        return (
                            <div key={index} className={`flex w-16 sm:w-20 justify-center rounded-3xl duration-200 hover:ring hover:ring-slate-500 py-2 cursor-pointer ${index === new Date().getDay() ? 'bg-slate-700' : ''}`}>
                                <div className="tranform flex flex-col items-center justify-center space-y-2">
                                    <div className={`font-medium ${index === new Date().getDay() ? 'text-indigo-500' : 'text-white'}`}>{day}</div>
                                    <div className="text-xl font-medium text-white">{realDay}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
