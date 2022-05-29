import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Alert
} from '@mui/material';
import { useState } from 'react';
import { app } from '../firebase';
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
// firebase auth
import { 
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
} from "firebase/auth";
import Link from 'next/link';

const Signup = () => {
    const auth = getAuth();
    const [name,setName] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const router = useRouter();
    const Googleprovider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    // signup with email
    const signupWithEmail = async () => {
        if(name && email && password) {
            createUserWithEmailAndPassword(auth,email,password)
                .then((res) => {
                    sessionStorage.setItem('Token', res.user.accessToken )
                    displayName : name
                    router.push('/')
                })
        } else {
            setError('Please fill all fields')
        }
    }
    // signup with google
    const signUpGoogle = () => {
        signInWithPopup(auth,Googleprovider)
            .then((res) => {
                sessionStorage.setItem('Token', res.user.accessToken )
                router.push('/')
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    // signup facebook
    const signUpFacebook = () => {
        signInWithPopup(auth,facebookProvider)
            .then(res => {
                sessionStorage.setItem('Token', res.user.accessToken )
                router.push('/')
            }).catch(err => {
                console.log(err.message);
            })
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
                    <Typography sx={{textAlign : 'center', fontFamily : 'Quicksand', fontWeight : '700'}} variant='h4'>Sign Up</Typography>
                    {error && <Alert severity='error'>{error}</Alert>}

                    <TextField
                    variant='outlined'
                    label='Display Name'
                    placeholder='Enter your name here...'
                    fullWidth
                    margin='normal'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />

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
                    onClick={signupWithEmail}
                    >Register</Button>
                </Box>

                <Divider />

                <Typography sx={{
                    textAlign : 'center',
                    opacity : '0.7',
                    marginBottom : '20px'
                }} variant='body2'>Or </Typography>

                <Button 
                sx={{
                textAlign : 'center',
                marginBottom : '20px'
                }}
                startIcon={<GoogleIcon />}
                variant='contained'
                margin='normal'
                onClick={signUpGoogle}
                >Sign up with google</Button>

                <Button 
                sx={{
                textAlign : 'center',
                marginBottom : '20px'
                }}
                startIcon={<FacebookIcon />}
                variant='contained'
                margin='normal'
                onClick={signUpFacebook}
                >Sign up with Facebook</Button>

                <Typography variant='body2' component='p'
                sx={{textAlign : 'center'}}>
                    Already have an account? <Link href='/login'><a className='link'>Log in here</a></Link>
                </Typography>
            </Box>
        </Container>
    );
}
 
export default Signup;