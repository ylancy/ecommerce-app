import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Button, IconButton, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import ItemCard from "../../components/itemCard";
import FlexBetween from "../../components/flexBetween";

const ItemDetails = () => {
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState({});
    const [items, setItems] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItem() {
        const item = await fetch(
            `http://localhost:1337/api/items/${itemId}?populate=image`,
            {
                method: "GET",
            }
        );
        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    const getItems = async () => {
        const items = await fetch(
            `http://localhost:1337/api/items/?populate=image`,
            {
                method: "GET",
            }
        );
        const itemsJson = await items.json();
        setItems(itemsJson.data);
    }

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]) // react-hooks/exhaustive-deps

    return (
        <Box width='80%' margin="80px auto">
            <Box display='flex' flexWrap='wrap' columnGap='40px' width='100%' style={{ objectFit: 'contain' }}>
                <Box flex='1 1 40%' marginBottom='20px'>
                    <img src={`http://localhost:1337${item?.attributes?.image?.data.attributes.formats.medium.url}`} alt={itemId} width="100%"
                        height="100%" style={{ objectFit: "contain" }} />
                </Box>
                <Box flex='1 1 50%'>
                    <FlexBetween>
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </FlexBetween>
                    <Box marginTop='60px'>
                        <Typography variant="h3">{item?.attributes?.name}</Typography>
                        <Typography fontWeight='bold'>${item?.attributes?.price}</Typography>
                        <Typography marginTop='30px'>{item?.attributes?.longDescription}</Typography>
                    </Box>
                    <Box display="flex" width='100%' gap="20px" marginTop='30px'>
                        <Box backgroundColor={shades.neutral[100]} display='flex' alignItems='center' padding='5px 10px'>
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}><RemoveIcon /></IconButton>
                            <Typography>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)} > <AddIcon /></IconButton>
                        </Box>
                        <Button onClick={() => dispatch(addToCart({ ...item, count: count }))}
                            sx={{ backgroundColor: shades.primary[500], color: "white", padding: '5px 30px', borderRadius: 0, minWidth: '150px' }} >
                            Add to Cart
                        </Button>
                    </Box>
                    <Box marginTop='30px'>
                        <Box display='flex'>
                            <FavoriteBorderOutlinedIcon />
                            <Typography>ADD TO WISHLIST</Typography>
                        </Box>
                        <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box marginTop='30px'>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>
                <Box marginTop='20px'>
                    {value === 'description' && (
                        <div>{item?.attributes?.longDescription}</div>
                    )}
                    {value === 'reviews' && (
                        <div>reviews</div>
                    )}
                </Box>
            </Box>

            <Box marginTop='50px'>
                <Typography variant="h3" fontWeight='bold'> Related Products</Typography>
                <Box display='flex' flexWrap='wrap' justifyContent='space-around' marginTop='20px'>
                    {items.slice(0, 4).map((item) => (<ItemCard key={`${item.name}-${item.id}`} item={item} />))}
                </Box>
            </Box>
        </Box>
    )
}

export default ItemDetails;