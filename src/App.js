import { Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import * as authService from "./services/auth";

function App() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(authService.getAccessToken());

  const handleLogin = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      console.log(response.data.accessToken);
      localStorage.setItem("accessToken", response.data.accessToken);
      setAccessToken(response.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  const handleLogout = () => {
    authService.logout();
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <>
      <CssBaseline>
        <NavBar onLogout={handleLogout} />

        <Container sx={{ marginTop: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route
              path="/tasks"
              element={accessToken ? <TasksPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks/new"
              element={accessToken ? <AddTaskPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks/:id/edit"
              element={
                accessToken ? <EditTaskPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/register"
              element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/login"
              element={
                accessToken ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
          </Routes>
        </Container>
      </CssBaseline>
    </>
  );
}

export default App;
