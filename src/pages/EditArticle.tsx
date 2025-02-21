import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    date: "",
    publisher: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing article details
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };
    fetchArticle();
  }, [id]);

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
      await axios.put(`http://127.0.0.1:5000/articles/${id}`, { ...formData, id });
      navigate("/");
    } catch (err) {
      console.error("Error updating article", err);
    }
  };  

  return (
    <Container>
      <Typography variant="h4">Edit News Article</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField label="Title" name="title" fullWidth margin="normal" value={formData.title} onChange={handleChange} />
        <TextField label="Summary" name="summary" multiline fullWidth margin="normal" value={formData.summary} onChange={handleChange} />
        <TextField label="Date" name="date" type="date" fullWidth margin="normal" value={formData.date} onChange={handleChange} />
        <TextField label="Publisher" name="publisher" fullWidth margin="normal" value={formData.publisher} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>
    </Container>
  );
};

export default EditArticle;
