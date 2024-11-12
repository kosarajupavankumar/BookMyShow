import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./hoc/ProtectedRoute";
import ForgetPasswordPage from "./pages/Forget/Forget";
import ResetPage from "./pages/Reset";
import SingleMoviePage from "./pages/SinglwMovie";
import BookShowPage from "./pages/BookShow";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forget" element={<ForgetPasswordPage />}></Route>
          <Route path="/reset" element={<ResetPage />}></Route>
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <SingleMoviePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                {" "}
                <BookShowPage />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
