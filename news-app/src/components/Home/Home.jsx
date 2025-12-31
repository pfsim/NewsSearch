import React, { useState, useEffect, useRef } from 'react';
import { Typography, LinearProgress, Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '../Header/Header';
import DisplayResults from '../DisplayResults/DisplayResults';
import MyFavouritesPanel from '../MyFavouritesPanel/MyFavouritesPanel';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const scrollContainerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const savedFavs = localStorage.getItem('my-favourites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
  }, [news]);

  const fetchNews = async (keyword, pageNum = 1) => {
    setLoading(true);
    setError('');
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY; 
    const url = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&sortBy=publishedAt&q=${keyword}&searchIn=title&pageSize=20&page=${pageNum}&language=en`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "ok") {
        if (pageNum === 1) setNews(data.articles);
        else setNews(prev => [...prev, ...data.articles]);
      } else {
        setError("Error: " + data.message);
      }
    } catch (err) {
      setError("Failed to connect to News API");
    }
    setLoading(false);
  };

  const handleSearch = (keyword) => {
    setCurrentKeyword(keyword);
    setPage(1);
    fetchNews(keyword, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(currentKeyword, nextPage);
  };

  const toggleFavorite = (article) => {
    let updatedFavorites;
    const exists = favorites.find(fav => fav.url === article.url);
    if (exists) updatedFavorites = favorites.filter(fav => fav.url !== article.url);
    else updatedFavorites = [...favorites, article];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('my-favourites', JSON.stringify(updatedFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('my-favourites');
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundImage: 'url(https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_1280.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      
      <Header 
        onSearch={handleSearch} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* LEFT PANEL */}
        <Box 
          sx={{ 
            width: isSidebarOpen ? (isMobile ? '100%' : '22%') : '0px',
            minWidth: isSidebarOpen ? (isMobile ? '100%' : '280px') : '0px',
            transition: 'width 0.3s ease, min-width 0.3s ease',
            overflow: 'hidden',
            borderRight: isSidebarOpen ? '1px solid rgba(255,255,255,0.1)' : 'none', 
            whiteSpace: 'nowrap',
            
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            backdropFilter: 'blur(5px)', 
           

            zIndex: 10
          }}
        >
           <MyFavouritesPanel 
              favorites={favorites} 
              onClearFavorites={clearFavorites} 
           />
        </Box>

        {/* RIGHT PANEL */}
        <Box 
          ref={scrollContainerRef}
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: 3,
            display: 'block' 
          }}
        >
          {loading && <LinearProgress color="warning" sx={{ mb: 2 }} />}
          {error && <Typography color="error" sx={{ bgcolor: 'rgba(0,0,0,0.5)', p: 1, borderRadius: 1 }}>{error}</Typography>}

          {!loading && news.length === 0 && !error && (
             <Box sx={{ height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h4" color="white" align="center" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                   Please search for your favourite topic to get started :)
                </Typography>
             </Box>
          )}

          {news.length > 0 && (
            <DisplayResults 
              news={news} 
              favorites={favorites} 
              onToggleFavorite={toggleFavorite} 
              onLoadMore={handleLoadMore}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;