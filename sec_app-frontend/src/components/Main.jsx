import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import anime from 'animejs';
import backgroundImage from '../assets/back-image.jpg';
// CURRENT

const BackgroundImage = styled(Box)(({ theme }) => ({
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', 
        zIndex: 1,
    },
}));

const Content = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    color: 'white',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: 2, 
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontFamily: 'Cormorant Garamond, serif',
    fontWeight: 700, 
    [theme.breakpoints.down('sm')]: {
        fontSize: '3rem', 
    },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Cormorant Garamond, serif', 
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem', 
    },
}));

const Main = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const title = titleRef.current;
        title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline()
            .add({
                targets: '.letter',
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 2250,
                delay: (el, i) => 150 * (i + 1)
            });
    }, []);

    return (
        <Box>
            <BackgroundImage>
                <Content>
                    <Title ref={titleRef} variant="h1" component="h1" gutterBottom className="ml3">
                        Security AV Manager
                    </Title>
                    <Subtitle variant="h4" component="p">
                        Manage the security of your spaces
                    </Subtitle>
                </Content>
            </BackgroundImage>
        </Box>
    );
};

export default Main;
