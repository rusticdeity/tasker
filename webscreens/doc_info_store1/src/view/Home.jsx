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
import EditDocumentDialog from "./EditDocumentDialog";
import { motion, AnimatePresence } from "framer-motion";

const myDataJson=JSON.stringify({"Github":{
    "PAT": "Mypat",
    "Expiry": "Expiry"
  }})
const cardAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.3 } },
};

const Home = () => {
  const [rootJson, setRootJson] = useState(
    myDataJson ? JSON.parse(myDataJson) : {},
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDocData, setEditingDocData] = useState(null);

  const handleAddDocument = () => {
    const newDocName = `New Document ${Object.keys(rootJson).length + 1}`;
    // Open dialog to edit the new document immediately
    setEditingDocData({
      originalName: newDocName,
      name: newDocName,
      values: { property1: "value1" },
    });
    setIsEditDialogOpen(true);
    // Or, if you want to add directly without dialog first:
    // setDocuments(prevDocs => ({
    //     ...prevDocs,
    //     [newDocName]: { "property1": "value1" }
    // }));
  };
  const handleDeleteDocument = (docNameToDelete) => {
    console.log("Deleting document:", docNameToDelete);
    setRootJson((prev) => {
      const newState = { ...prev };
      delete newState[docNameToDelete];
      return newState;
    });
  };
  const handleDeleteEntry = (docName, entryKeyToDelete) => {
    console.log("Deleting entry:", entryKeyToDelete, "from document:", docName);
    setRootJson((prev) => {
      const docToUpdate = prev[docName];
      if (!docToUpdate) return prev;

      const updatedEntries = { ...docToUpdate };
      delete updatedEntries[entryKeyToDelete];

      return {
        ...prev,
        [docName]: updatedEntries,
      };
    });
  };
  const handleOpenEditDialog = (docName, docVals) => {
    setEditingDocData({
      originalName: docName,
      name: docName,
      values: { ...docVals },
    }); // Clone docVals
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingDocData(null);
  };
  const handleSaveDocument = (originalDocName, newDocName, updatedDocVals) => {
    setRootJson((prevDocs) => {
      const newDocs = { ...prevDocs };
      // If the name changed, we need to delete the old key and add the new one
      if (
        originalDocName !== newDocName &&
        newDocs.hasOwnProperty(originalDocName)
      ) {
        delete newDocs[originalDocName];
      }
      newDocs[newDocName] = updatedDocVals;
      return newDocs;
    });
    handleCloseEditDialog();
  };

  const showCards = () => {
    if (!rootJson || typeof rootJson !== "object") {
      return <Typography>Loading documents...</Typography>;
    }
    return (
      <AnimatePresence initial={false}>
        {Object.entries(rootJson).map(([docName, docVals]) => (
          <motion.div
            key={docName} // Key must be on the motion component
            layout // Animates layout changes (e.g., when an item is removed)
            variants={cardAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <DocCard
              docName={docName}
              docVals={docVals}
              onDeleteDocument={handleDeleteDocument}
              onDeleteEntry={handleDeleteEntry}
              onEditDocument={handleOpenEditDialog} // Pass handler to open dialog
            />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };
  return (
    <>
      <Box
        sx={{ minHeight: "100vh", position: "relative", pb: 0 }}
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
          <>
            {Object.keys(rootJson).length > 0 ? (
              showCards()
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, textAlign: "center", mt: 5 }}
              >
                Please click on the "+" icon to add a new document.
              </Typography>
            )}
          </>
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddDocument}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
      {editingDocData && (
        <EditDocumentDialog
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          documentData={editingDocData}
          onSave={handleSaveDocument}
        />
      )}
    </>
  );
};

export default Home;
