'use client';
import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import styles from './page.module.css'
import { useState } from 'react'
import './style.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SurveySG() {
  const [successPrompt, setSuccessPrompt] = useState(false)
  const [warningPrompt, setWarningPrompt] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const emailHandler = (event: any) => {
    setEmail(event?.target.value)
  }

  const passwordHandler = (event: any) => {
    setPassword(event?.target.value)
  }

  const authApiCall = async () => {
    const validEmail = email.includes('.gov')
    validEmail ? setEmailError(false) : setEmailError(true)
    validEmail ? setEmailErrorMessage('') : setEmailErrorMessage('Email should contain .gov')

    const validPassword = password.length >= 8
    validPassword ? setPasswordError(false) : setPasswordError(true)
    validPassword ? setPasswordErrorMessage('') : setPasswordErrorMessage('Password should contain 8 or more characters')

    try {
      const res = await axios.post(`http://localhost:8000/login`, { email, password })
      setSuccessPrompt(true)
      setWarningPrompt(false)
      return res
    } catch (error: any) {
      console.error(error)
      setWarningPrompt(true);
      setPromptMessage(error.response.data.message)
      return null
    }
  }

  const register = async (e: any) => {
    e.preventDefault()
    const res = await authApiCall()
    if (res?.status === 200) {
      router.push('/register')
    }
  }

  const login = async (e: any) => {
    e.preventDefault()
    const res = await authApiCall()
    if (res?.status === 200) {
      router.push('/profile')
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessPrompt(false);
    setWarningPrompt(false);
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
        <Snackbar open={warningPrompt} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {promptMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={successPrompt} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Login successfully!
          </Alert>
        </Snackbar>
      </Box>
    </main>
  )
}
