import { Badge, Box, IconButton, Typography } from "@mui/material";
import { shades } from '../../theme';
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined,
    CardTravel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from "../../state";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    return (
        <Box display="flex" alignItems="center" width='100%' height='60px' backgroundColor="rgba(255,255,255, 0.9)"
            position='fixed' top="0" left='0' zIndex='10'>
            <Box width='80%' display='flex' justifyContent='space-between' alignItems='center' margin='auto'>
                <Box color={shades.secondary[500]} onClick={() => navigate('/')} sx={{ "&:hover": { cursor: "pointer" } }}><Typography variant="h4" fontWeight='bold'>ECOMMER</Typography></Box>
                <Box display='flex' justifyContent='space-between' gap='20px'>
                    <IconButton sx={{ color: "black" }}>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton sx={{ color: "black" }}>
                        <PersonOutline />
                    </IconButton>
                    <Badge badgeContent={cart.length} color="secondary" invisible={cart.length === 0} sx={{
                        "&:MuiBadge-badge": {
                            right: 5, top: 5, padding: "0 4px", height: '14px'
                        }
                    }}>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: "black" }}>
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>
                    <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton>
                </Box>
            </Box>

        </Box>
    )
}

export default Navbar;