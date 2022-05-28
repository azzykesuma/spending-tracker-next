import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Alert
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const login = () => {
    const [error,setError] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const auth = getAuth();
    const router = useRouter();
    // sign in email
    const handleEmailSignin = () => {
        if(email && password) {
            // checking the value of email and password
            signInWithEmailAndPassword(auth,email,password)
            .then(res => {
                router.push('/')
                sessionStorage.setItem('Token', res.user.accessToken )
            })
        } else {
            setError('Login failed, please check your email and password')
        }
    }
    return (
        <Container maxWidth='sm'
        sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <Box sx={{
                border : '1px solid black',
                padding : '10px',
                borderRadius : '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width : '300px'
            }}>
                <Box
                component='form'
                sx={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems : 'center'
                }}
                >
                    <Typography sx={{textAlign : 'center', fontFamily : 'Quicksand', fontWeight : '700'}} variant='h4'>Log in</Typography>
                    {error && <Alert severity='error'>{error}</Alert>}
                    <TextField
                    variant='outlined'
                    label='Email'
                    placeholder='e.g : johndoe@gmail.com'
                    fullWidth
                    margin='normal'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <TextField
                    variant='outlined'
                    label='Password'
                    placeholder='min 6 characters'
                    fullWidth
                    margin='normal'
                    value={password}
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    />

                    <Button 
                    sx={{
                    marginBottom : '20px'
                    }}
                    variant='contained'
                    margin='normal'
                    onClick={handleEmailSignin}
                    >Log in</Button>
                </Box>
                <Typography variant='body2' component='p'
                sx={{textAlign:'center'}}>
                    Don't have an account? <Link href='/signup'><a className='link'>Sign up</a></Link>
                </Typography>
            </Box>
        </Container>
    );
}
 
export default login;