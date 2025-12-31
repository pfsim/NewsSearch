import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const MyFavouritesPanel = ({ favorites, onClearFavorites }) => {
  return (
    <Box sx={{ padding: 2, height: '100%' }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
          My Favourites: {favorites.length}
        </Typography>
        {favorites.length > 0 && (
          <Button 
            variant="contained" 
            color="warning" 
            size="small" 
            onClick={onClearFavorites}
          >
            Clear
          </Button>
        )}
      </Box>

      {/* LIST OF FAVORITES */}
      {favorites.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', mt: 2, whiteSpace: 'normal' }}>
          No favorites saved yet. Click the heart on a news card to add one!
        </Typography>
      ) : (
        <List sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
          {favorites.map((article, index) => (
            <React.Fragment key={index}>
              <ListItem 
                alignItems="flex-start" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: 1, 
                  mb: 1,
                  backdropFilter: 'blur(3px)'
                }}
              >
                <ListItemText
                  primary={
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        textDecoration: 'none', 
                        color: 'white', 
                        fontWeight: 'bold',
                        whiteSpace: 'normal',      
                        wordBreak: 'break-word',    
                        display: 'block'            
                      }}
                    >
                      {article.title}
                    </a>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        display: 'block', 
                        mt: 0.5,
                        whiteSpace: 'normal' 
                      }}
                    >
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </Typography>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MyFavouritesPanel;