import React from "react";
import CommentList from "./components/CommentList";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Comment Widget
      </Typography>
      <CommentList />
    </Box>
  );
}

export default App;
