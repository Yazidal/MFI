import { Dialog } from "@mui/material";
import React, { useEffect, useRef } from "react";
const Popup = ({ onClose, selectedResult }) => {
  const iframeRef = useRef(null);
  console.log(`Popup`, selectedResult);
  const handleIframeLoad = () => {
    const contentWindow = iframeRef.current.contentWindow;
    const iframeDocument = contentWindow.document;

    // Set styles to allow highlighting
    iframeDocument.body.style.backgroundColor = "transparent";

    // Scroll to the specified element ID
    if (Array.isArray(selectedResult.id)) {
      selectedResult.id.map((element) => {
        iframeDocument.getElementById(element).style.backgroundColor = "yellow";
      });
      iframeDocument.getElementById(selectedResult.id[0]).scrollIntoView();
    } else {
      iframeDocument.getElementById(selectedResult.id).style.backgroundColor =
        "yellow";
      iframeDocument.getElementById(selectedResult.id).scrollIntoView();
    }
  };

  useEffect(() => {});
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
            ? `/documents/${selectedResult.section}.html`
            : `/documents/${selectedResult.sectiontext}.html`
        }
        title={
          selectedResult.section
            ? selectedResult.section
            : selectedResult.sectiontext
        }
        width="100%"
        height="800px"
        onLoad={handleIframeLoad}
      />
    </Dialog>
  );
};

export default Popup;
