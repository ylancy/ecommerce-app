import { useState } from "react";
import { Box, Typography, IconButton, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../state";
import { shades } from "../theme";

const ItemCard = ({ item }) => {
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette: { neutral } } = useTheme();
    const { category, name, price } = item.attributes;
    const imageurl = item.attributes.image.data.attributes.formats.medium.url;

    return (
        <Box>
            <Box position='relative' onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
                <img src={`http://localhost:1337${imageurl}`} alt={name} width='300px' height='400px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/items/${item.id}`)} />
                <Box position='absolute' display={isHovered ? 'block' : 'none'}
                    left='0' bottom='20%' width='100%'>
                    <Box display="flex" justifyContent="space-between" width='100%'>
                        <Box backgroundColor={shades.neutral[100]} display='flex' alignItems='center'>
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}><RemoveIcon /></IconButton>
                            <Typography>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)} > <AddIcon /></IconButton>
                        </Box>
                        <Button onClick={() => dispatch(addToCart({ ...item, count: count }))}
                            sx={{ backgroundColor: shades.primary[300], color: "white" }} >Add to Cart</Button>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color={neutral.dark}>{category}</Typography>
                    <Typography>{name}</Typography>
                    <Typography fontWeight='bold'>${price}</Typography>
                </Box>
            </Box >
        </Box >
    )
}
export default ItemCard;