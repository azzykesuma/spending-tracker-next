import Head from 'next/head'
import { app, db } from '../firebase'
import {
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem  
} from '@mui/material';
import { useEffect,useState,useRef } from 'react';
import { useRouter } from 'next/router';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc,deleteDoc,doc, updateDoc } from "firebase/firestore"; 
import FooterBar from '../component/FooterBar';
import DataList from '../component/DataList';

export default function Home() {
  const [userAcc,setUserAcc] = useState(null)
  const router = useRouter();
  const auth = getAuth();
  const [dataCol,setDataCol] = useState([])
  const colref = collection(db,'spending');
  const [id,setId] = useState('')
  const [open,setOpen] = useState(false)
  const [desc,setDesc] = useState('')
  const [amount,setAmount] = useState('')
  const [update,setUpdate] = useState(false)
  const [walletAmount,setWalletAmount] = useState(0)
  const [inputType,setInputType] = useState('income')
  const prevMoney = useRef()

  // dialog functions
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClickClose = () => {
    setOpen(false);
  }

  // converting number to rupiah currency
  const toRupiah = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
  }
  
  // retrieving data from firestore
  const getData = async() => {
    getDocs(colref)
    .then(res => {
      setDataCol(res.docs.map(item => {
        return {...item.data(),id:item.id}
      }))
    }).catch(err => {
      console.log(err.message)
    })
  }

  // adding data to firestore
  const addData = () => {
    addDoc(colref , {
      desc,
      amount : toRupiah(amount)
    })
    .then(() => {
      setDesc('')
      setAmount('')
      getData()
      handleClickClose()
      setWalletAmount(amount => amount + toRupiah(amount))
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  // deleting data
  const deleteData = id => {
    let data = doc(db,'spending',id);
    deleteDoc(data)
    .then(() => {
      getData()
    })
    .catch(err => {
      console.log(err.message);
    })    
  }

  // updating data
  const editData = (id,desc,amount) => {
    setUpdate(true)
    setOpen(true)
    setId(id)
    setDesc(desc)
  }

  const updateData = () => {
    let data = doc(db,'spending',id);
    updateDoc(data, {
      desc, 
      amount : toRupiah(amount)
    })
    .then(() => {
      setDesc('')
      setAmount('')
      getData()
      setOpen(false)
      setUpdate(false)
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        router.push('/login');
      }
      setUserAcc(user);
    })

    if(token) {
      getData();
    }
    // changing wallet amount
    prevMoney.current = walletAmount;
  },[walletAmount])


  return (
    <>
      <Head>
        <title>Spending Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container maxWidth='md'
        sx={{
          display : 'flex',
          flexDirection : 'column',
          height : '100vh'
        }}
        >
          <Paper
          sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'space-between',
            padding : '10px',
            mt : '10px',
            width : '100%',
            maxWidth : '500px',
            alignSelf : 'center',
            backgroundColor : '#B0DB43',
          }}
          >
            <Typography variant='h6' component='h1' gutterBottom
            sx={{color : '#323031', fontFamily : 'Quicksand'}}
            >
              Your wallet balance : 
            </Typography>
            <Typography variant='h6' component='h1' gutterBottom
            sx={{color : '#323031', fontFamily : 'Quicksand'}}
            >
              {toRupiah(walletAmount)}
            </Typography>
          </Paper>

          {
            dataCol.map(data => {
              return ( <DataList data={data} 
              key={data.id} deleteData={deleteData}
              editData={editData}
              /> )
            })
          }

          <Dialog open={open} onClose={handleClickClose}
          >
            <DialogTitle>Add a new spending</DialogTitle>
            <DialogContent
            sx={{
              height : '250px',
              display : 'flex',
              flexDirection : 'column',
              justifyContent : 'center'
            }}
            >
              <FormControl>
                <InputLabel id="input-type">Type</InputLabel>
              <Select
                labelId="input-type"
                id="input-type-select"
                value={inputType}
                label="input type"
                onChange={e => setInputType(e.target.value)}
              >
                <MenuItem value={'income'}>Income</MenuItem>
                <MenuItem value={'spending'}>Spending</MenuItem>
              </Select>  

              <TextField
              value={desc}
              onChange={e => setDesc(e.target.value)}
              label='Description'
              placeholder='Add spending description'
              fullWidth
              margin='normal'
              />
              
              <TextField
              value={amount}
              onChange={e => setAmount(e.target.value)}
              label='Amount'
              placeholder='Add spending amount'
              fullWidth
              margin='normal'
              type='number'
              />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickClose}>Cancel</Button>
              <Button onClick={update ? updateData : addData}>{update ? 'Update' : 'Add data'}</Button>
            </DialogActions>
          </Dialog>
        </Container>
        <FooterBar handleClickOpen={handleClickOpen}  />
    </>
  )
}
