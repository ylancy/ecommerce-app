import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { increaseCount, decreaseCount, removeFromCart, setIsCartOpen } from "../../state";
import FlexBetween from '../../components/flexBetween';
import { shades } from "../../theme";

const CartMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart)
    console.log("🚀 ~ file: cartMenu.jsx:15 ~ CartMenu ~ cart", cart)
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const subTotal = cart.reduce((total, item) => total + item.count * item?.attributes?.price, 0);

    return (
        <Box display={isCartOpen ? 'block' : 'none'} backgroundColor='rgba(0,0,0,0.4)' margin='auto'
            position='fixed' top='0' left='0' zIndex='20' width='100%' height='100%'>
            <Box backgroundColor='white' position='fixed' right='0' top='0' width='max(400px, 30%)' height='100%' padding='30px' overflow="auto">
                <FlexBetween>
                    <Box><Typography variant="h3">SHOPPING BAG ({cart.length})</Typography></Box>
                    <IconButton onClick={() => dispatch(setIsCartOpen({}))}><CloseIcon /></IconButton>
                </FlexBetween>

                <Box marginBottom='20px'>
                    {cart.map((item) =>
                        <FlexBetween key={`${item.attributes.name}-${item.id}`} gap='40px' marginTop='20px'>
                            <Box><img src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} alt={item?.attributes?.name} width='123px' height='164px' /></Box>
                            <Box height='100%' flexGrow='1'>
                                <FlexBetween>
                                    <Typography fontWeight='bold'>{item.attributes.name}</Typography>
                                    <IconButton onClick={() => dispatch(removeFromCart(item))}><CloseIcon /></IconButton>
                                </FlexBetween>
                                <Typography>{item.attributes.shortDescription}</Typography>
                                <FlexBetween marginTop='5px'>
                                    <Box display='flex' alignItems='center' border={`1.5px solid ${shades.neutral[500]}`}>
                                        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}><RemoveIcon /></IconButton>
                                        <Typography>{item.count}</Typography>
                                        <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}><AddIcon /></IconButton>
                                    </Box>
                                    <Typography fontWeight='bold'>${item.attributes.price}</Typography>
                                </FlexBetween>
                            </Box>
                        </FlexBetween>)}
                </Box>

                <Divider />
                <FlexBetween marginTop='20px'>
                    <Typography fontWeight='bold'>SUBTTOTAL</Typography>
                    <Typography fontWeight='bold'>${subTotal}</Typography>
                </FlexBetween>
                <Button sx={{
                    backgroundColor: shades.primary[400],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                }}
                    onClick={() => { navigate('/checkout'); dispatch(setIsCartOpen({})) }}>
                    CHECKOUT
                </Button>
            </Box>
        </Box>
    )
}

export default CartMenu;