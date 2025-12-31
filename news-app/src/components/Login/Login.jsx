import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Alert } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = () => {
    if (username === 'Sim' && password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', username);
      if (!localStorage.getItem('my-favourites')) {
        localStorage.setItem('my-favourites', JSON.stringify([]));
      }
      navigate('/home');
    } else {
      setError(true);
    }
  };

  return (
    <Box 
      sx={{
        height: '100vh', 
        width: '100vw',
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_1280.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            padding: 4,
            borderRadius: 4, 
            boxShadow: 5,
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            find.My.News :)
          </Typography>
          
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>Invalid User name or Password</Alert>}

          <TextField
            margin="normal"
            required
            fullWidth
            label="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            sx={{ backgroundColor: 'white' }} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: 'white' }}
          />
          <Button
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mt: 3, mb: 2, height: 50, fontWeight: 'bold' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;