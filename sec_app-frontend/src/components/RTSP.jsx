import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const RTSP = () => {
    const [frame, setFrame] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const socket = new WebSocket('ws://live_stream_ip:8765');

        socket.onmessage = (event) => {
            const arrayBuffer = event.data;
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob);
            setFrame(imageUrl);
            setLoading(false); 
        };

        return () => socket.close();
    }, []);

    return (

        <div className='mx-8'>
            <div className='flex justify-center mt-6'>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Live <mark class="px-2 text-white bg-slate-950 rounded dark:bg-blue-500">Detection</mark></h1>
            </div>


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 120px)',
                }}
            >
                {loading && <CircularProgress color='inherit' size={60} />}
                {frame && !loading && (
                    <div style={{ border: '3px solid black', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={frame} alt="Frame" style={{ width: '100%' }} />
                    </div>
                )}
            </Box>
        </div>
    );
};

export default RTSP;





