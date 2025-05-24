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
import DocCard from "./DocCard";

const Home = () => {
  const [rootJson, setRootJson] = useState(myDataJson ? JSON.parse(myDataJson) : {});
  const handleAddNewDocument = (newDocJson) => {
        setRootJson(prev => ({ ...prev, newDocJson  }));
    };
  const handleDeleteDocument = (docNameToDelete) => {
        console.log("Deleting document:", docNameToDelete);
        setRootJson(prev => {
            const newState = { ...prev };
            delete newState[docNameToDelete];
            return newState;
        });
    };
  const handleDeleteEntry = (docName, entryKeyToDelete) => {
        console.log("Deleting entry:", entryKeyToDelete, "from document:", docName);
        setRootJson(prev => {
            const docToUpdate = prev[docName];
            if (!docToUpdate) return prev;

            const updatedEntries = { ...docToUpdate };
            delete updatedEntries[entryKeyToDelete];

            return {
                ...prev,
                [docName]: updatedEntries
            };
        });
    };
  const showCards = () => {
    if (!rootJson || typeof rootJson !== 'object') {
        return null;
    }
    // You can directly map over Object.keys()
    return Object.keys(rootJson).map((key) => (
        <DocCard key={key} docName={key} docVals={rootJson[key]} onDeleteDocument={handleDeleteDocument} onDeleteEntry={handleDeleteEntry}/>
    ));
};
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
        {Object.keys(rootJson).length > 0 ? (
		<>
		{showCards()}
		</>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Please click on + icon to add new document
          </Typography>
        )}
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
