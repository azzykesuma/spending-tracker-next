import { useEffect } from 'react';
import {
    Paper, Typography,
    Box,IconButton
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from '../firebase';

const DataList = ({data,deleteData,editData,inputType}) => {
    const date = data.timestamp.toDate().toDateString()
    console.log(date);
    return (
        <>
            <Paper sx={{
                display: 'flex',
                padding : '10px',
                justifyContent: 'space-between',
                marginTop : '20px',
                alignItems : 'center'
            }}
            className={data.inputType}
            >
                <Box component='div'>
                    <Typography sx={{
                        fontSize : '20px',
                        fontWeight : '500',
                        fontFamily : 'Quicksand'
                    }}>{data.desc[0].toUpperCase() + data.desc.slice(1)}</Typography>
                    <Typography sx={{
                        fontSize : '15px',
                        fontFamily : 'Quicksand'
                    }}>{data.amount}</Typography>
                </Box>
                <Typography>{date}</Typography>
                <Box component='div'>
                    <IconButton onClick={() => deleteData(data.id)}><DeleteIcon /></IconButton>
                    <IconButton onClick={() => editData(data.id,data.desc,data.amount)}><EditIcon /></IconButton>
                </Box>
            </Paper>
        </>
    );
}
 
export default DataList;