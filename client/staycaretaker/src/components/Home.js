import {useContext, useEffect, useState} from 'react';
import { AppContext} from '../App';
import jwt_token from 'jwt-decode';
import { Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate} from 'react-router-dom';




const Home = ()=>{
    const {token, setUser_id} = useContext (AppContext)
    const [firstname, setFirstname] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate()

    

    const userIsLogged = () =>{
        return(
            <>
            <h1>Welcome {firstname}</h1>
            </>
        )
    }

    const userIsNotLogged = () =>{
        return (
            <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                
              <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                <Grid item>
                  <Typography variant="h3" align="center" gutterBottom>
                    Welcome to StayCareTaker
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="center" paragraph>
                    <strong>StayCareTaker</strong> is an application for apartments' owners. It helps you to manage seasonal rental by grouping all the reservations in one place. You can add clients and rentals, track expenses, and monitor your earnings.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="center" paragraph>
                    Want to give it a try? Please <strong>register</strong>. Already a member? <strong>Log in</strong> to access your informations.
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="large" style={{ marginRight: '20px' }} onClick={()=>navigate('/register')}>
                    Register
                  </Button>
                  <Button variant="contained" color="info" size="large" onClick={()=>navigate('/login')}>
                    Log In
                  </Button>
                </Grid>
              </Grid>
              
            </Container>
          );
    }

    useEffect(()=>{
        if (token){
            const payload = jwt_token(token);
            setUser_id(payload.user_id);
            setFirstname(payload.firstname);
            setUsername(payload.username);
            
        }
    },[])

    return (
        <>
        {token ? userIsLogged() : userIsNotLogged()}
        </>
    )
}

export default Home;