import {
    Box,
    IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const FooterBar = ({handleClickOpen}) => {
    return (
        <Box component='div'
        sx={{
            padding : '10px',
            backgroundColor : '#2F3E46',
            display : 'flex',
            justifyContent : 'center'
        }}
        >
            <IconButton
            size='large'
            sx={{
                position : 'relative',
                bottom : '40px',
                backgroundColor : '#B0DB43',
            }}
            onClick={handleClickOpen}
            ><AddCircleIcon fontSize='large' /></IconButton>
        </Box>
    );
}
 
export default FooterBar;