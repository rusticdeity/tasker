import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Box,
  Stack,
  TextField, // Added TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add"; // Added AddIcon
import SaveIcon from "@mui/icons-material/Save"; // Added SaveIcon
import { motion, AnimatePresence } from "framer-motion"; // Import motion

// Helper to display different types of values nicely
const displayValue = (value) => {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2); // Pretty print JSON
  }
  return String(value);
};

const entryAnimation = {
  initial: { opacity: 0, height: 0, y: -10 },
  animate: { opacity: 1, height: "auto", y: 0 },
  exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.2 } },
};

// Animation for the add entry form
const formAnimation = {
  initial: { opacity: 0, height: 0, y: -10 }, // Matched y for consistency
  animate: { opacity: 1, height: "auto", y: 0 },
  exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.2 } },
};

const DocCard = ({
  docName,
  docVals,
  onDeleteDocument,
  onDeleteEntry,
  onEditDocument,
  onAddEntry, // New prop for adding an entry
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const keyInputRef = useRef(null);

  useEffect(() => {
    if (isAdding && keyInputRef.current) {
      // Timeout to allow the element to be fully rendered and visible before focusing
      const timer = setTimeout(() => {
        keyInputRef.current.focus();
      }, 150); // Adjusted delay slightly for animation
      return () => clearTimeout(timer);
    }
  }, [isAdding]);

  if (!docName || !docVals) {
    return null;
  }

  const handleOpenAddEntryForm = () => {
    setIsAdding(true);
    setNewKey(""); // Clear fields when opening
    setNewValue("");
  };

  const handleSaveOrCloseAddForm = () => {
    alert(trimmedKey);
    const trimmedKey = newKey.trim();
    const trimmedValue = newValue.trim();

    if (isAdding && trimmedKey && trimmedValue) {
      // Check isAdding to ensure it's a save action from the save button
      // and both key and value are provided
      onAddEntry(docName, trimmedKey, trimmedValue);
    }

    // Always close form and reset state, regardless of save success or empty fields
    setIsAdding(false);
    // Clearing newKey/newValue will happen on next open or can be done here too
    // setNewKey("");
    // setNewValue("");
    // It's good practice to clear them immediately after processing.
    alert("hete");
	  setNewKey(""); 
    setNewValue("");
  };

  return (
    <Card
      sx={{
        mb: 2,
        position: "relative",
        boxShadow: 3,
        overflow: "hidden" /* For exit animations and containing absolutely positioned elements */,
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {docName}
          </Typography>
        }
        action={
          <>
            <IconButton
              aria-label="edit document"
              onClick={() => onEditDocument(docName, docVals)} // Pass data to edit
              sx={{ color: "primary.main", mr: 0.5 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete document"
              onClick={() => onDeleteDocument(docName)}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
        sx={{ pb: 1, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      />
      <CardContent sx={{ pt: 1, pb: 8 /* Ensure space for FAB at bottom */ }}>
        {Object.keys(docVals).length > 0 ? (
          <AnimatePresence initial={false}>
            {Object.entries(docVals).map(([key, value]) => (
              <motion.div
                key={key}
                layout
                variants={entryAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    py: 1,
                    textAlign: "left",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    "&:not(:last-child)": {
                      borderBottom: "1px dashed rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    sx={{
                      flexGrow: 1,
                      pr: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {key}:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {displayValue(value)}
                    </Typography>
                  </Stack>
                  <IconButton
                    aria-label={`delete entry ${key}`}
                    onClick={() => onDeleteEntry(docName, key)}
                    size="small"
                    sx={{
                      color: "warning.dark",
                      mt: 0.5,
                    }}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          // Show "No entries" only if not in adding mode and docVals is empty
          Object.keys(docVals).length === 0 &&
          !isAdding && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No entries in this document.
            </Typography>
          )
        )}

        {/* Form for adding a new entry */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              key="add-entry-form" // Unique key for AnimatePresence child
              layout // Animates layout changes including card height
              variants={formAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ overflow: 'hidden', marginTop: '16px' }} // marginTop for spacing from last item
            >
              {/* Using Box as form to enable submit on Enter, though button is external */}
              <Box 
                component="form" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  handleSaveOrCloseAddForm(); 
                }}
              > 
                <Stack spacing={2} sx={{ p: 1.5, border: '1px dashed #ccc', borderRadius: 1}}>
                  <TextField
                    label="Key"
                    variant="outlined"
                    size="small"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    inputRef={keyInputRef} // For autofocus
                    fullWidth
                    required // HTML5 validation, though we check trim manually
                  />
                  <TextField
                    label="Value"
                    variant="outlined"
                    size="small"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    fullWidth
                    required // HTML5 validation
                  />
                </Stack>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      {/* Floating Add/Save Button */}
      <IconButton
        aria-label={isAdding ? "Save new entry" : "Add new entry"}
        onClick={isAdding ? handleSaveOrCloseAddForm : handleOpenAddEntryForm}
        size="small" // Makes the icon button larger, more like a FAB
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: isAdding ? "success.main" : "primary.main",
          color: "common.white",
          boxShadow: 3,
          '&:hover': {
            backgroundColor: isAdding ? "success.dark" : "primary.dark",
          },
        }}
      >
        {isAdding ? <SaveIcon fontSize="small"/> : <AddIcon fontSize="small"/>}
      </IconButton>
    </Card>
  );
};

export default DocCard;
