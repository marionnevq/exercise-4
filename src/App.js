import { Container, CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import TasksPage from "./pages/TasksPage";

function App() {
  return (
    <>
      <CssBaseline>
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/new" element={<AddTaskPage />} />
            <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
          </Routes>
        </Container>
      </CssBaseline>
    </>
  );
}

export default App;
