import { Box } from "@northlight/ui";
import React from "react";
import HighScore from "./Highscore";

const App = () => {
  return (
    <Box mx={{ base: "6vw", md: "10vw", lg: "20vw" }}>
      <HighScore />
    </Box>
  );
};

export default App;
