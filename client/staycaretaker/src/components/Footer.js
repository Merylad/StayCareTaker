import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";


  
  const defaultTheme = createTheme();
  
  export default function Footer() {
    return (
      <>
        <ThemeProvider theme={defaultTheme}>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: 'rgb(173, 216, 230)',
              color: 'blue', 
              width: '100%', 
              height: '50px', 
              justifyContent: 'space-between', 
              px: 10,
            }}
            component="footer"
          >
            <CssBaseline />
            
              <Typography variant="body1">
                <span>&copy;</span> Meryl Adjedj
              </Typography>
            
            <Link to="/contact">
            Contact Me 
          </Link>

          
        
          </Box>
          
        </ThemeProvider>
        </>
      );
  }