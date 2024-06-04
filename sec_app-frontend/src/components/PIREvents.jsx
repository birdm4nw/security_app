import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const PIREvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://esp8266:port/motion-sensor');
                setEvents(response.data.reverse());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();

        const interval = setInterval(fetchEvents, 5000);

        return () => clearInterval(interval);
    }, []);

    const formatDate = (dateString) => {
        return dateString.replace('T', ' ').replace('Z', '').slice(0, 19);
    };

    return (
        <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className='bg-gray-50'>
            <div className='flex justify-center mt-6 mb-6'>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    PIR <mark className="px-2 text-white bg-slate-950 rounded dark:bg-blue-500">Events</mark> Information
                </h1>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress color='inherit' size={60} />
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ flex: 1, overflowY: 'auto', margin: 'auto', width: '80%' }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell align="right">Time</StyledTableCell>
                                    <StyledTableCell align="right">Motion detection</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((event, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            {events.length - index}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{formatDate(event.time)}</StyledTableCell>
                                        <StyledTableCell align="right">{event.detected_motion ? 'Yes' : 'No'}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default PIREvents;
