import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [formData, setFormData] = useState({ title: "", summary: "", date: "", publisher: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.date || !formData.publisher) {
      setError("All fields are required");
      return;
    }
    try {
      await axios.post("http://localhost:5000/articles", formData);
      navigate("/");
    } catch (err) {
      console.error("Error saving article", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create News Article</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Summary" name="summary" multiline fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Date" name="date" type="date" fullWidth margin="normal" onChange={handleChange} />
        <TextField label="Publisher" name="publisher" fullWidth margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
};

export default CreateArticle;
