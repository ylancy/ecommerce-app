import { Box, Tab, Tabs, Typography, useMediaQuery, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { setItems } from '../../state';
import ItemCard from '../../components/itemCard';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items)
    const isNonMobileSc = useMediaQuery('(min-width:600px)');
    const [value, setValue] = useState('all');

    const handleChange = (event, newValue) => { setValue(newValue); }
    const topRatedItems = items.filter((item) => item.attributes.category === 'topRated');
    const newArrivalsItems = items.filter((item) => item.attributes.category === 'newArrivals');
    const bestSellersItems = items.filter((item) => item.attributes.category === 'bestSellers');

    const getItems = async () => {
        const items = await fetch("http://localhost:1337/api/items?populate=image",
            { method: "GET" });
        const itemsJs = await items.json();
        dispatch(setItems(itemsJs.data));
    }

    useEffect(() => {
        getItems();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width='80%' margin="80px auto">
            <Typography variant='h3' textAlign='center'>Our featured <b>Produces</b></Typography>
            <Tabs value={value} onChange={handleChange} textColor='primary' centered
                TabIndicatorProps={{ sx: { display: isNonMobileSc ? 'block' : 'none' } }}>
                <Tab label='ALL' value="all" />
                <Tab label='NEW ARRIVAL' value="newArrivals" />
                <Tab label='BEST SELLERS' value="bestSellers" />
                <Tab label='TOP RATED' value="topRated" />
            </Tabs>
            <Box display='grid' gridTemplateColumns='repeat(auto-fill, 300px)' marginTop='40px'
                rowGap="10px" columnGap='1%' justifyContent='space-around'>
                {value === "all" &&
                    items.map((item) => (
                        <ItemCard item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "newArrivals" &&
                    newArrivalsItems.map((item) => (
                        <ItemCard item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "bestSellers" &&
                    bestSellersItems.map((item) => (
                        <ItemCard item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "topRated" &&
                    topRatedItems.map((item) => (
                        <ItemCard item={item} key={`${item.name}-${item.id}`} />
                    ))}
            </Box>

        </Box>
    )
}

export default ShoppingList;