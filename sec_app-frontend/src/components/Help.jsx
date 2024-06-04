import React, { useEffect } from 'react';
import '../App.css';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { LayoutDashboard, ScanEye, Webcam, PersonStanding } from "lucide-react";
import cardData from '../data/cardsData';

const iconMap = {
    LayoutDashboard: LayoutDashboard,
    ScanEye: ScanEye,
    WebCam: Webcam,
    PersonStanding: PersonStanding
};

const Help = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.card-animation');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 300); 
        });
    }, []);

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <div className="background-image"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                {cardData.map((card, index) => {
                    const IconComponent = iconMap[card.icon];
                    return (
                        <Card
                            key={index}
                            className="card-animation bg-white shadow-lg rounded-lg transform transition duration-500 ease-in-out opacity-0"
                            sx={{
                                textAlign: 'center',
                                alignItems: 'center',
                                width: 343,
                                overflow: 'auto',
                                '--icon-size': '100px',
                            }}
                        >
                            <CardOverflow variant="success" className="bg-stone-900	">
                                <AspectRatio
                                    variant="outlined"
                                    color="inherit"
                                    ratio="1"
                                    sx={{
                                        m: 'auto',
                                        transform: 'translateY(50%)',
                                        borderRadius: '50%',
                                        width: 'var(--icon-size)',
                                        boxShadow: 'sm',
                                        bgcolor: 'background.surface',
                                        position: 'relative',
                                    }}
                                >
                                    <div>
                                        <IconComponent color={card.color} sx={{ fontSize: '4rem' }} />
                                    </div>
                                </AspectRatio>
                            </CardOverflow>
                            <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
                                {card.title}
                            </Typography>
                            <CardContent sx={{ maxWidth: '40ch' }}>
                                {card.content}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default Help;
