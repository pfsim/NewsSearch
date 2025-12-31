import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button, IconButton, Box, Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const NewsItem = ({ article, isFavorite, onToggleFavorite }) => {
  const image = article.urlToImage || "https://via.placeholder.com/300x140?text=No+Image";
  const date = new Date(article.publishedAt).toISOString().split('T')[0];
  const sourceName = article.source.name || "News";
  const firstLetter = sourceName.charAt(0).toUpperCase();

  return (
    <Card 
      sx={{ 
        height: 400,          
        width: '100%',        
        maxWidth: 280,        
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: 6 },
        '&:hover .hover-overlay': { opacity: 1 },
      }}
    >
      {/* HEADER */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 32, height: 32, fontSize: '0.9rem' }} aria-label="source">
            {firstLetter}
          </Avatar>
        }
        title={
          <Typography variant="body2" fontWeight="bold" noWrap sx={{ maxWidth: 130 }}>
            {sourceName}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        }
        sx={{ padding: 1.5, pb: 1, height: 70, boxSizing: 'border-box' }}
      />

      {/* IMAGE */}
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={article.title}
        sx={{ objectFit: 'cover' }}
      />

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, pt: 2, px: 2, pb: 0, overflow: 'hidden' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontSize: '0.95rem', 
            fontWeight: 'bold', 
            lineHeight: 1.3,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 4, 
          }}
        >
          {article.title}
        </Typography>
      </CardContent>

      {/* FOOTER */}
      <Box sx={{ 
          height: 50, 
          p: 1.5, 
          pt: 0, 
          display: 'flex', 
          alignItems: 'center', 
          zIndex: 3 
      }}>
        <IconButton 
          onClick={(e) => {
            e.stopPropagation(); 
            onToggleFavorite(article);
          }} 
          color="error"
          size="small"
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* HOVER OVERLAY */}
      <Box 
        className="hover-overlay"
        sx={{
          position: 'absolute',
          top: 70, 
          bottom: 50,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between', 
          opacity: 0, 
          transition: 'opacity 0.2s ease-in-out',
          zIndex: 2,
          padding: 3,
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
         <Box sx={{ overflow: 'hidden', maxHeight: '75%' }}>
            <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.5 }}>
                {article.description || article.title || "Click the button below to read the full article."}
            </Typography>
         </Box>

         <Button 
          variant="contained" 
          color="warning" 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ width: '100%' }}
        >
          Read Article
        </Button>
      </Box>
    </Card>
  );
};

export default NewsItem;