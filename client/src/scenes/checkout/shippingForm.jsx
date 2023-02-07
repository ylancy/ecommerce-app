import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import AddressForm from './addressForm';

const ShippingForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue }) => {

    return (
        <Box margin='30px 0'>
            <Typography fontSize='18px' marginBottom='15px'>Billing Informatiom</Typography>
            <AddressForm
                type="billingAddress"
                values={values.billingAddress}
                touched={touched}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange} />
            <Box>
                <FormControlLabel
                    control={
                        <Checkbox defaultChecked value={values.shippingAddress.isSameAddress} onChange={() => { setFieldValue('shippingAddress.isSameAddress', !values.shippingAddress.isSameAddress) }} />}
                    label="Same for Shipping Address" />
            </Box>

            {!values.shippingAddress.isSameAddress && (
                <Box>
                    <Typography sx={{ mb: "15px" }} fontSize="18px">
                        Shipping Information
                    </Typography>
                    <AddressForm
                        type="shippingAddress"
                        values={values.shippingAddress}
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ShippingForm;