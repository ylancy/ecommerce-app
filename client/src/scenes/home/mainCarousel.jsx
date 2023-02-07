import { Box, IconButton, Typography, useMediaQuery, } from '@mui/material';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { shades } from '../../theme';

const importAll = (r) =>
    r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});

export const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton onClick={onClickHandler}
                    sx={{ position: 'absolute', top: "50%", left: '0', color: 'white', padding: '5px', zIndex: '10' }}>
                    <NavigateBeforeIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton onClick={onClickHandler}
                    sx={{ position: 'absolute', top: "50%", right: '0', color: 'white', padding: '5px', zIndex: '10' }}>
                    <NavigateNextIcon sx={{ fontSize: 40 }} />
                </IconButton>
            )}>
            {Object.values(heroTextureImports).map((image, idx) => (
                <Box key={idx}>
                    <img src={image} alt='carousel' width='100%' height='700px' style={{ objectFit: 'cover' }} />
                    <Box position='absolute' top='46%' left={isNonMobile ? "10%" : '0'} right={isNonMobile ? undefined : '0'}
                        backgroundColor="rgba(0,0,0,0.4)" padding='10px'
                        textAlign='left' >
                        <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
                        <Typography variant='h1' color='white'>SUMMER SALE</Typography>
                        <Typography color={shades.secondary[300]} sx={{ textDecoration: "underline" }} >Discover More</Typography>
                    </Box>
                </Box >
            ))}
        </Carousel >)
}

export default MainCarousel;