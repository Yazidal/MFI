import { Dialog } from "@mui/material";
import React, { useRef } from "react";

const Popup = ({ onClose, selectedResult }) => {
  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    const contentWindow = iframeRef.current.contentWindow;
    const iframeDocument = contentWindow.document;

    // Set styles to allow highlighting
    iframeDocument.body.style.backgroundColor = "transparent";

    // Scroll to the specified element ID
    const scrollElement = iframeDocument.getElementById(selectedResult.id);

    if (scrollElement) {
      scrollElement.style.backgroundColor = "yellow";
      scrollElement.scrollIntoView();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={Boolean(selectedResult)}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
    >
      <iframe
        ref={iframeRef}
        src={
          selectedResult.section
            ? `../documents/${selectedResult.section}.html`
            : `../documents/${selectedResult.sectiontext}.html`
        }
        title={
          selectedResult.section
            ? selectedResult.section
            : selectedResult.sectiontext
        }
        width="100%"
        height="800px"
        // onLoad={handleIframeLoad}
      />
    </Dialog>
  );
};

export default Popup;
