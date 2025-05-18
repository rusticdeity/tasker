import { useState } from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {lightTheme, darkTheme } from './styles/theme_regular'
import { Button, Typography, Box } from '@mui/material';
import Home from './view/Home';

function App() {

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      <Home/>
    </ThemeProvider>
  )
}

export default App
