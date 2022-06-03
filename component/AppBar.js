import { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from '@mui/material';
import { app,db } from '../firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Appbar = ({userAcc}) => {
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [account,setAccount] = useState(null)
    const [name,setName] = useState('Guest')
    const router = useRouter();
    const authHandler = getAuth();

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut(authHandler)
          .then(() => {
            sessionStorage.removeItem('Token');
            router.push('/login');
            setName('Guest')
            setAnchorEl(null)
          })
          .catch(err => {
            console.log(err.message);
          })
    }

    useEffect(() => {
      onAuthStateChanged(authHandler, user => {
        setAccount(user);
      })
      let token = sessionStorage.getItem('Token')

      if(!account) {
        setAuth(false)
      } else {
        setAuth(true)
        setName(account.displayName)
      }
    })

    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {name ? name : 'Stranger'} !
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link href='/profile'><a>Profile</a></Link></MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    );
}
 
export default Appbar;