'use client';
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import styles from './page.module.css'
import { useState } from 'react'
import './style.css'
import axios from 'axios';

export default function Home() {
  const [loginPrompt, setLoginPrompt] = useState(false)

  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  

  const emailHandler = (event: any) => {
    setEmail(event?.target.value)
  }

  const passwordHandler = (event: any) => {
    setPassword(event?.target.value)
  }

  const login = () => {
    // make API call to mocked GOVAA auth API in the server
  }

  const register = async () => {
    if (!email || !password) {
      setLoginPrompt(true);
    }
    const validEmail = email.includes('.gov')
    validEmail ? setEmailError(false) : setEmailError(true)
    validEmail ? setEmailErrorMessage('') : setEmailErrorMessage('Email should contain .gov')

    const validPassword = password.length >= 8
    validPassword ? setPasswordError(false) : setPasswordError(true)
    validPassword ? setPasswordErrorMessage('') : setPasswordErrorMessage('Password should contain 8 or more characters')

    const res = await axios.post(`http://localhost:8000/auth`, { email: email, password: password })
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginPrompt(false);
  };

  return (
    <main className={styles.main}>
      <h2 style={{ marginBottom: '10px' }}>Survey SG</h2>
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 300 }}
        noValidate
        autoComplete="off"
        onSubmit={login}
        className='textfield-container'
      >
        <TextField error={emailError} helperText={emailErrorMessage} style={{ marginBottom: '6px' }} id="outlined-email" label="Email" variant="outlined" onChange={emailHandler} />
        <TextField error={passwordError} helperText={passwordErrorMessage} style={{ marginBottom: '6px' }} id="outlined-password" label="Password" variant="outlined" type="password" autoComplete="current-password" onChange={passwordHandler} />
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained" 
            size="medium" 
            style={{ marginLeft: '8px', backgroundColor: '#1565C0' }} 
            id="submit-btn"
            onClick={register}
          >
            Register
          </Button>
          <Button 
            variant="contained" 
            size="medium" 
            style={{ marginLeft: '8px', backgroundColor: '#1565C0' }} 
            type='submit'
            id="submit-btn"
          >
            Login with GOVAA
          </Button>
        </div>
        <Snackbar open={loginPrompt} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please enter your GOVAA account details before clicking on register.
          </Alert>
        </Snackbar>
      </Box>
    </main>
  )
}
