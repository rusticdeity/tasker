// DocCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
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

const DocCard = ({
  docName,
  docVals,
  onDeleteDocument,
  onDeleteEntry,
  onEditDocument,
}) => {
  if (!docName || !docVals) {
    return null;
  }

  return (
    <Card
      sx={{
        mb: 2,
        position: "relative",
        boxShadow: 3,
        overflow: "hidden" /* For exit animations */,
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
      <CardContent sx={{ pt: 1 }}>
        {Object.keys(docVals).length > 0 ? (
          <AnimatePresence initial={false}>
            {" "}
            {/* initial={false} to prevent initial animation on load */}
            {Object.entries(docVals).map(([key, value]) => (
              <motion.div
                key={key} // Crucial for AnimatePresence to track items
                layout // Animates layout changes
                variants={entryAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start", // Align items to top for multiline text
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
                      minWidth: 0 /* Important for text ellipsis/wrap */,
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
                      mt: 0.5 /* Adjust alignment */,
                    }}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No entries in this document.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DocCard;
