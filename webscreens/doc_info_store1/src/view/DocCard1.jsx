// DocCard.js
import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Bin icon
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"; // Minus icon

// Helper to attempt to stringify values safely for display
const formatValue = (value) => {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return "[Object]";
    }
  }
  return String(value);
};

const DocCard = ({ docName, docVals, onDeleteDocument, onDeleteEntry }) => {
  if (!docName) return null; // Or some placeholder if docName is missing

  const handleDeleteDocument = () => {
    if (onDeleteDocument) {
      onDeleteDocument(docName);
    }
  };

  const handleDeleteEntry = (entryKey) => {
    if (onDeleteEntry) {
      onDeleteEntry(docName, entryKey);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2, // padding
        mb: 2, // margin bottom
        textAlign: "left", // Content left aligned
        overflowWrap: "break-word", // Text wrapping for all content within
        wordWrap: "break-word", // Older browser support for word-wrap
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6" component="h3" sx={{ flexGrow: 1, mr: 1 }}>
          {docName}
        </Typography>
        <IconButton
          aria-label={`Delete document ${docName}`}
          onClick={handleDeleteDocument}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {docVals &&
      typeof docVals === "object" &&
      Object.keys(docVals).length > 0 ? (
        <List dense disablePadding>
          {Object.entries(docVals).map(([key, value]) => (
            <ListItem
              key={key}
              disableGutters
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label={`Delete entry ${key} from ${docName}`}
                  onClick={() => handleDeleteEntry(key)}
                  size="small"
                >
                  <RemoveCircleOutlineIcon fontSize="small" />
                </IconButton>
              }
              sx={{
                // Ensure wrapping within list item text as well
                "& .MuiListItemText-primary": {
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap", // Preserves whitespace and newlines, and wraps
                },
                "& .MuiListItemText-secondary": {
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                },
                pr: "40px", // Make space for the icon button
              }}
            >
              <ListItemText
                primary={`${key}:`}
                secondary={formatValue(value)} // Use helper to format value
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No entries in this document.
        </Typography>
      )}
    </Paper>
  );
};

export default DocCard;
