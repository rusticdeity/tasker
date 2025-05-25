// EditDocumentDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Stack,
  Box,
} from "@mui/material";

const EditDocumentDialog = ({ open, onClose, documentData, onSave }) => {
  const [formData, setFormData] = useState({});
  const [docName, setDocName] = useState("");

  useEffect(() => {
    if (open && documentData) {
      setDocName(documentData.name || ""); // Assuming you pass name as part of documentData
      setFormData(documentData.values || {});
    } else {
      // Reset form when dialog is closed or no data
      setDocName("");
      setFormData({});
    }
  }, [open, documentData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDocNameChange = (event) => {
    setDocName(event.target.value);
  };

  const handleSave = () => {
    // Basic validation: ensure docName is not empty
    if (!docName.trim()) {
      alert("Document name cannot be empty.");
      return;
    }
    onSave(documentData.originalName || docName, docName, formData); // Pass original name for lookup, new name, and new values
    onClose();
  };

  if (!documentData) {
	  alert("nodata");
    return null; // Don't render if no data (shouldn't happen if logic is correct)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Edit Document: {documentData.originalName || "New Document"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Modify the document details below.
        </DialogContentText>
        <TextField
          label="Document Name"
          fullWidth
          value={docName}
          onChange={handleDocNameChange}
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <Stack spacing={2}>
          {Object.entries(formData).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              fullWidth
              value={typeof value === "object" ? JSON.stringify(value) : value}
              onChange={(e) => handleChange(key, e.target.value)}
              multiline // Allow multiline for potentially long string values
              rowsMax={4} // Optional: limit multiline rows
              variant="outlined"
            />
          ))}
        </Stack>
        {Object.keys(formData).length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This document currently has no entries. You can add them after
            saving if needed.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ p: "16px 24px" }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDocumentDialog;
