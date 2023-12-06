
import {
  Dialog,
} from '@mui/material';
import React, { useRef } from 'react';

const Popup = ({ onClose, selectedResultId }) => {
  const iframeRef = useRef(null);
console.log("selectedResultId",selectedResultId);
  const handleIframeLoad = () => {
    // Access the contentWindow of the iframe
    const contentWindow = iframeRef.current.contentWindow;
    
    // Access the document inside the iframe
    const iframeDocument = contentWindow.document;
  
    // Set styles to allow highlighting
    iframeDocument.body.style.backgroundColor = 'transparent';
  
    // Scroll to the specified element ID
    const scrollElement = iframeDocument.getElementById(selectedResultId);
    if (scrollElement) {
      scrollElement.style.backgroundColor = 'yellow';
      // scrollElement.classList.add('highlight');
      scrollElement.scrollIntoView();
    }
  };
  const handleClose = () => {  
    onClose();
  };
  return (
    <Dialog open={Boolean(selectedResultId)} onClose={handleClose} maxWidth="lg" fullWidth>
      {/* Attach the onLoad event to the iframe */}
      <iframe
        ref={iframeRef}
        src={"/textecomplet.html"}
        title="HTML File"
        width="100%"
        height="800px"
        onLoad={handleIframeLoad}
      />
    </Dialog>
  );
};

export default Popup;
