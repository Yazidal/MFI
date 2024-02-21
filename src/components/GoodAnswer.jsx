import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function GoodAnswer() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    textField1: "",
    textField2: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Make API call using formData
      const response = await axios.post("your_api_endpoint", formData);
      console.log(response.data); // Log response or handle accordingly

      // Close the modal after successful submission
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogContent>
          <TextField
            name="textField1"
            label="Text Field 1"
            value={formData.textField1}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="textField2"
            label="Text Field 2"
            value={formData.textField2}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GoodAnswer;
