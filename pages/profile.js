import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import {
    Container,
    TextField,
    Box,
    Typography,
    Button
} from '@mui/material';
import Link from 'next/link';
import { getAuth,updateProfile } from "firebase/auth";

const Profile = () => {
    const [user,setUser] = useState(null);
    const [name,setName] = useState('')
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        getAuth().onAuthStateChanged(user => {
            if(!user) {
                router.push('/login');
            }
            setUser(user);
        })
    })
    const updateName = () => {
        updateProfile(auth.currentUser, {
            displayName : name
        })
        .then(() => {
            alert(`${user.displayName} updated`)
            router.push('/')
        })
        .catch(err => {
            alert(err.message)
        })
    }
    return (
        <Container maxWidth='md'
        sx={{
            height : '50vh',
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
            <Typography variant="h2">Profile</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                border : '1px solid black',
                width : '300px',
                padding : '10px'
            }}>
                <TextField
                value={name}
                onChange={e => setName(e.target.value)}
                label='display name'
                placeholder="update your display name"
                fullWidth
                />
                <Button onClick={updateName}
                variant='contained' sx={{ marginTop : '10px'}}
                >Update</Button>
            </Box>
            <Button href='/' variant='contained'
            sx={{marginBlock : '10px'}}
            >Home</Button>
        </Container>
    );
}
 
export default Profile;