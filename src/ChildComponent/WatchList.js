import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { getWatchlistFromLocalStorage } from "../util";
import { useEffect, useState } from "react";
import { IMAGE_BASE_URL } from "../API_KEY/constant";
function WatchList() {
  let store = getWatchlistFromLocalStorage();
  const [storeWatchList, setWatchList] = useState(store);
  // console.log(store);
  // useEffect(() => {
  //   console.log(storeWatchList);
  // }, []);
  console.log(storeWatchList);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "fles-start",
          gap: 2,
          padding: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": {
            display: "none", // optional: hide scrollbar
          },
        }}
      >
        {storeWatchList.map((movie) => {
          console.log("This inside card Block =>", movie.id);
          <Card
            key={movie.id}
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
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" noWrap>
                  {movie.title || movie.name}
                </Typography>
              </CardContent>
            </CardMedia>
          </Card>;
        })}
      </Box>
    </div>
  );
}
export default WatchList;
