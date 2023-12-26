'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../page.module.css'
import '../style.css'
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import agencyData from './data.json'

export default function RegisterPage() {
  // useEffect(() => {
  //   fetchPackageDetails().then(json => {
  //     setData(json.data)
  //   })
  // }, [data?.name])

  const [agency, setAgency] = useState('')

  const agencyHandler = (event: any) => {
    setAgency(event?.target.value)
  }

  const register = () => {
    // make API call to mocked GOVAA auth API in the server
    console.log('test register')
  }

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 350px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 2;
    padding: 16px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  return (
    <main className={styles.main}>
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 350 }}
        noValidate
        autoComplete="off"
        onSubmit={register}
        className='textfield-container'
      >
        <TextField style={{ marginBottom: '6px' }} id="outlined-name" label="Name" variant="outlined" disabled />
        <TextField style={{ marginBottom: '6px' }} id="outlined-email" label="Contact Email" variant="outlined" />
        <FormControl fullWidth>
          <InputLabel id="agency-select-label">Agency</InputLabel>
          <Select
            labelId="agency-select-label"
            id="agency-select"
            value={agency}
            label="Agency"
            style={{ marginBottom: '6px' }}
            onChange={agencyHandler}
          >
            {agencyData.map((agency) => {
              return (
                <MenuItem value={agency}>{agency}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextareaAutosize aria-label="empty textarea" placeholder="Job description" />
        <FormControlLabel required control={<Checkbox />} label="Terms of Use" />
        <Button
          variant="contained" 
          size="medium" 
          style={{ marginLeft: '8px', backgroundColor: '#1565C0' }} 
          id="submit-btn"
          type="submit"
        >
          Register
        </Button>
      </Box>
    </main>
  )
}
