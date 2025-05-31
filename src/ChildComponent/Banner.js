import React from "react";
import { Box, Typography } from "@mui/material";

function Banner() {
  return (
    <div>
      <Box
        sx={{
          height: "400px",
          backgroundImage:
            "url(https://cdn.bollywoodbubble.com/wp-content/uploads/2025/05/Akshay-Kumars-Kesari-Chapter-2-Enters-IMDb-Top-250.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* This is the inner div with your text */}
        <Box
          sx={{
            color: '#fff',
            display: 'inline-block',              // text color
            border: '2px solid #fff',     // white border
            borderRadius: 2,              // rounded corners (theme spacing * 2 = 16px)
            padding: '8px 16px',          // space inside the box
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // optional semi-transparent background
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ color: "#fff" }}>
              Welcome to Our IMDB
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
export default Banner;
