import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { API_KEY, IMAGE_BASE_URL, WATCHLIST_KEY } from "../API_KEY/constant";
import { useEffect, useState } from "react";
import { getWatchlistFromLocalStorage } from "../util";

// const movies = [
//   {
//     id: 1,
//     title: "Inception",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7fsyeYUDI3QD4xeSzHY7eCu_E_KyfHw5JAtvVadnIdrJeZOtHIxa2bjAHcOPyhdrhpDg&usqp=CAU",
//   },
//   {
//     id: 2,
//     title: "Interstellar",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMzsZYpklmQ-dGmLsdqTfiqRTqSA2YRbHPSQ&s",
//   },
//   {
//     id: 3,
//     title: "The Dark Knight",
//     image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
//   },
//   {
//     id: 4,
//     title: "Tenet",
//     image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
//   },
//   {
//     id: 5,
//     title: "Tenet",
//     image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
//   },
//   {
//     id: 6,
//     title: "Tenet",
//     image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
//   },
//   {
//     id: 7,
//     title: "Tenet",
//     image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
//   },
//   // Add more movies as needed
// ];

function Movies() {
  const [Movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());

  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${pageNumber}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  //Previous page function
  const handlePreviousPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  //Next page function
  const handleNextPage = () => {
    if (pageNumber === 500) return;
    setPageNumber(pageNumber + 1);
  };
  //
  const isMovieAlreadyPresentInWatchlist = (mediaId, watchlistMovies) => {
    return watchlistMovies.find((movie) => movie.id === mediaId);
  };
  //save movies to local Storage
  const saveToLocalStorage = (movieObj) => {
    let currentWatchList = getWatchlistFromLocalStorage();
    if (isMovieAlreadyPresentInWatchlist(movieObj.id, currentWatchList)) return;
    currentWatchList = [
      ...currentWatchList,
      {
        id: movieObj.id,
        title: movieObj.title,
        posterPath: movieObj.poster_path,
        voteAverage: movieObj.vote_average,
        genreIds: movieObj.genre_ids,
      },
    ];
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentWatchList));
    setWatchlist(currentWatchList);
  };

  //watchlist
  const handleWatchlist = (movieObj) => {
    saveToLocalStorage(movieObj);
  };
  //create function for fetching the data from api
  const getMovies = () => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.err(err));
  };

  //Using useEffect with dependency empty array to call once
  useEffect(() => {
    getMovies();
  }, [pageNumber]);

  console.log(Movies);

  return (
    <div>
      <Box sx={{ my: 3, padding: 2 }}>
        {/* Centered heading */}
        <Box sx={{ textAlign: "center", textDecoration: "underline" }}>
          <Typography variant="h4" fontWeight="bold">
            Trending Movies
          </Typography>
        </Box>
        <div>
          {/* <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            {Movies.map((movie, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card
                //   sx={{
                //     transition: "transform 0.3s, box-shadow 0.3s",
                //     "&:hover": { transform: "scale(1.03)", boxShadow: 6},
                //   }}
                sx = {{
                    height: 400,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden", // prevent content from overflowing
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={IMAGE_BASE_URL + movie.poster_path}
                    alt={movie.title} 
                    sx={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover", // Ensures image is cropped and fills the area
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {movie.title || movie.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid> */}

          {/* New thing trying */}
          <Box
            sx={{
              display: "flex",
              //   overflowX: "auto",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 2,
              padding: 2,
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": {
                display: "none", // optional: hide scrollbar
              },
            }}
          >
            {Movies.map((movie, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 185,
                  maxWidth: 185,
                  height: 340,
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={IMAGE_BASE_URL + movie.poster_path}
                  alt={movie.title || movie.name}
                  sx={{
                    height: 250,
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" noWrap>
                    {movie.title || movie.name}
                  </Typography>
                </CardContent>
                <Button onClick={() => handleWatchlist(movie)}>
                  Add To WatchList
                </Button>
              </Card>
            ))}
          </Box>
        </div>
      </Box>
      {/* Pagination */}
      <div>
        <Box
          sx={{ display: "flex", width: "100%", height: "25px", gap: 2, mb: 4 }}
        >
          <Button
            onClick={handlePreviousPage}
            sx={{
              width: "50%",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "#115293", // darker on hover
              },
              boxShadow: 2,
              ml: 2,
            }}
          >
            Previous
          </Button>
          <p>{pageNumber}</p>
          <Button
            onClick={handleNextPage}
            sx={{
              width: "50%",
              "&:hover": {
                backgroundColor: "#115293", // darker on hover
              },
              boxShadow: 2,
              mr: 2,
            }}
          >
            Next
          </Button>
        </Box>
      </div>
    </div>
  );
}
export default Movies;
