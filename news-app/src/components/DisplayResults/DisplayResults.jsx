import React from 'react';
import { Grid, Button, Box } from '@mui/material';
import NewsItem from '../NewsItem/NewsItem';

const DisplayResults = ({ news, favorites, onToggleFavorite, onLoadMore }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Centered Grid Container */}
      <Grid container spacing={3} justifyContent="center">
        {news.map((article, index) => {
            const isFav = favorites.some(fav => fav.url === article.url);

            return (
              /* GRID ITEM */
              <Grid 
                item 
                xs={12} sm={6} md={4} lg={3} xl={2.4}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }} 
              >
                <NewsItem 
                  article={article} 
                  isFavorite={isFav} 
                  onToggleFavorite={onToggleFavorite} 
                />
              </Grid>
            );
        })}
      </Grid>
      
      {/* Load More Button */}
      {news.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 4 }}>
          <Button 
            variant="contained" 
            color="warning" 
            onClick={onLoadMore}
            size="large"
          >
            Load More...
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DisplayResults;