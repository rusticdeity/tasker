// EditDocumentDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText, // Can remove if not using specific text styling here
  DialogTitle,
  Button,
  TextField,
  Stack,
  Box,
  Slide, // Import Slide for transition
  Typography, // Added for the "no entries" message
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Optional: for a close button in the title

// Transition component for sliding up from the bottom
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditDocumentDialog = ({ open, onClose, documentData, onSave }) => {
  const [formData, setFormData] = useState({});
  const [docName, setDocName] = useState("");
  const [originalDocNameForSave, setOriginalDocNameForSave] = useState("");

  useEffect(() => {
    if (open && documentData) {
      setOriginalDocNameForSave(documentData.originalName || "");
      setDocName(documentData.name || "");
      setFormData(documentData.values || {});
    } else {
      // Reset form when dialog is closed or no data
      setDocName("");
      setFormData({});
      setOriginalDocNameForSave("");
    }
  }, [open, documentData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDocNameChange = (event) => {
    setDocName(event.target.value);
  };

  const handleSave = () => {
    if (!docName.trim()) {
      alert("Document name cannot be empty."); // Simple validation
      return;
    }
    onSave(originalDocNameForSave, docName, formData);
    // onClose(); // Consider if onClose should be called by onSave or separately
  };

  if (!documentData && open) {
    // Check documentData only if open, to allow transition out
    console.warn("EditDocumentDialog opened without documentData!");
    return null;
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      keepMounted // Good for transitions
      aria-labelledby="edit-document-dialog-title"
      aria-describedby="edit-document-dialog-description"
      // Optional: To make the backdrop slightly less dark if desired
      slotProps={{
        paper: {
          sx: {
            position: "fixed",
            bottom: 0,
            left: { xs: "8px", sm: "16px" }, // Responsive left margin
            right: { xs: "8px", sm: "16px" }, // Responsive right margin
            width: {
              // Auto width based on margins
              xs: "calc(100% - 16px)",
              sm: "calc(100% - 32px)",
            },
            m: 0, // Crucial to override default centering margins of Dialog
            borderTopLeftRadius: "16px", // Rounded top corners
            borderTopRightRadius: "16px",
            borderBottomLeftRadius: 0, // No rounding at the very bottom
            borderBottomRightRadius: 0,
            maxHeight: "65vh", // Max height to 65% of viewport height (adjust as needed)
            minHeight: '30vh', // Optional: ensure a minimum height
            boxShadow: "0px -5px 15px rgba(0,0,0,0.1)", // Custom shadow for bottom sheet
            pt: 0, // Remove default top padding of Paper if DialogTitle is used properly
          },
        }, backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }
      }}
    >
      <DialogTitle
        id="edit-document-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 2,
          pb: 1, // Adjust padding
        }}
      >
        Edit: {originalDocNameForSave || "New Document"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            // position: 'absolute',
            // right: 8,
            // top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        // id="edit-document-dialog-description" // Can add if DialogContentText is used
        sx={{
          pt: 3, // Adjust padding to flow from title
          pb: 2, // Space before actions
          // overflowY is handled by DialogContent by default if content exceeds maxHeight of Paper
        }}
      >
        {/* <DialogContentText sx={{ mb: 2 }}>
                    Modify the document details below.
                </DialogContentText> */}
        <TextField
          label="Document Name"
          fullWidth
          value={docName}
          onChange={handleDocNameChange}
          sx={{ mb: 2.5, mt: 1.5 }}
          variant="outlined"
          size="small"
        />
        <Stack spacing={2}>
          {Object.entries(formData).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              fullWidth
              value={
                typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : value
              }
              onChange={(e) => handleChange(key, e.target.value)}
              multiline
              minRows={1} // Start with one row
              maxRows={6} // Max rows before scrolling within textfield
              variant="outlined"
              size="small"
            />
          ))}
        </Stack>
        {Object.keys(formData).length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            This document has no editable fields.
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{ p: "16px 24px", borderTop: "1px solid rgba(0,0,0,0.12)" }}
      >
        <Button onClick={onClose} color="secondary.main">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDocumentDialog;
