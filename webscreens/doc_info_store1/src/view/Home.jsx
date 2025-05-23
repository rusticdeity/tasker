import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Fab,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";


var myDataJson = "";
const Home = () => {
  if (myDataJson === "") {
    AutoTools.sendCommand("/mydata/read")
  } else {
    alert(myDataJson);
  }
  const [rootJson, setRootJson] = useState(myDataJson);
  return (
    <Box
      sx={{ minHeight: "100vh", position: "relative", width: "100vw", pb: 0 }}
    >
      {/* Navbar */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to MyApp
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A modern, responsive landing page built with Material UI.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Home;
