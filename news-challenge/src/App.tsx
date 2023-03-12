import { Route, Routes, Navigate } from "react-router-dom";
import NewsPage from "./pages/News"
import News from "./components/News/News";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to="/news/1" />}/>
      <Route path='/news' element={<NewsPage />}>
        <Route path=":page" element={<News />} />
      </Route>
    </Routes>
  );
}

export default App;
