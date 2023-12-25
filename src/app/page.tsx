'use client';
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import styles from './page.module.css'
import { useState } from 'react'
import './style.css'

export default function Home() {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [loginPrompt, setLoginPrompt] = useState(false)

  const emailHandler = (event: any) => {
    setEmail(event?.target.value)
  }

  const passwordHandler = (event: any) => {
    setPassword(event?.target.value)
  }

  const login = () => {
    // make API call to mocked GOVAA auth API in the server
  }

  const register = () => {
    setLoginPrompt(true);
    const validEmail = email.includes('.gov')
    validEmail ? setError(false) : setError(true)
    validEmail ? setErrorMessage('') : setErrorMessage('Email should contain .gov')
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
        <TextField error={error} helperText={errorMessage} style={{ marginBottom: '6px' }} id="outlined-basic" label="Email" variant="outlined" onChange={emailHandler} />
        <TextField style={{ marginBottom: '6px' }} id="outlined-basic" label="Password" variant="outlined" onChange={passwordHandler} />
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
