import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./pages/ArticleList";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/edit/:id" element={<EditArticle />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
