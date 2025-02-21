import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, deleteArticle } from "../redux/articleSlice"; // ✅ Correct import path
import { AppDispatch, RootState } from "../redux/store"; // ✅ Ensure store is correctly set up

//  Define TypeScript Interface
interface Article {
  id: number;
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

const ArticleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles: Article[] = useSelector((state: RootState) => state.articles.data || []); // ✅ Ensured correct typing

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteArticle(id));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4">News Articles</Typography>
      <TextField
        label="Search Articles"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button component={Link} to="/create" variant="contained" color="primary" style={{ marginBottom: "10px" }}>
        Add Article
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles
            .filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.summary}</TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell>{article.publisher}</TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDelete(article.id)}>Delete</Button>
                  <Button component={Link} to={`/edit/${article.id}`} variant="contained" color="secondary" style={{ marginLeft: 10 }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={articles.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default ArticleList;
