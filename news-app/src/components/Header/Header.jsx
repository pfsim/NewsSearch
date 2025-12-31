import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Box, Chip, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; 
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch, onToggleSidebar, isSidebarOpen }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSearchClick = () => {
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 1, boxShadow: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={onToggleSidebar}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            find.My.News :)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1, alignItems: 'center', width: '40%' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="What do you want to search?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ '& fieldset': { border: 'none' } }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearchClick}
            sx={{ 
              backgroundColor: '#ff9800', 
              color: 'white', 
              borderRadius: '0 4px 4px 0',
              height: '40px',
              '&:hover': { backgroundColor: '#e65100' }
            }}
          >
            SEARCH
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip label={userName} sx={{ backgroundColor: '#ff9800', color: 'white' }} />
          <Button variant="contained" color="error" size="small" onClick={handleLogout}>
            LOGOUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;