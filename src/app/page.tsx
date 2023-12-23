'use client';
import { Box, Button, TextField } from '@mui/material'
import styles from './page.module.css'
import { useState } from 'react'
import './style.css'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (event: any) => {
    setUsername(event?.target.value)
  }

  const passwordHandler = (event: any) => {
    setPassword(event?.target.value)
  }

  const login = () => {
    // make API call to mocked GOVAA auth API in the server
  }

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
        <TextField style={{ marginBottom: '6px' }} id="outlined-basic" label="Username" variant="outlined" onChange={usernameHandler} />
        <TextField style={{ marginBottom: '6px' }} id="outlined-basic" label="Password" variant="outlined" onChange={passwordHandler} />
        <div style={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="medium" 
            style={{ marginLeft: '8px', backgroundColor: '#1565C0' }} 
            type='submit'
            id="submit-btn"
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
            Login
          </Button>
        </div>
      </Box>
    </main>
  )
}
