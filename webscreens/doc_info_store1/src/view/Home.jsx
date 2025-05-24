import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Fab,
  Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";


const Home = () => {
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
            Document Info Store
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
        
	  {!rootJson && <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please click on + icon to add new document
        </Typography>}
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
