import { useEffect } from 'react';
import {
    Paper, Typography,
    Box,IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../firebase';

const DataList = ({data,deleteData,editData}) => {

    return (
        <>
            <Paper sx={{
                display: 'flex',
                padding : '10px',
                justifyContent: 'space-between',
                marginTop : '20px'
            }}>
                <Box component='div'>
                    <Typography sx={{
                        fontSize : '20px',
                        fontFamily : 'Quicksand'
                    }}>{data.desc}</Typography>
                    <Typography sx={{
                        fontSize : '15px',
                        fontFamily : 'Quicksand'
                    }}>{data.amount}</Typography>
                </Box>
                <Box component='div'>
                    <IconButton onClick={() => deleteData(data.id)}><DeleteIcon /></IconButton>
                    <IconButton onClick={() => editData(data.id,data.desc,data.amount)}><EditIcon /></IconButton>
                </Box>
            </Paper>
        </>
    );
}
 
export default DataList;