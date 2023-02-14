import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import * as authService from "../services/auth";
import * as taskService from "../services/task";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
  const currentUser = authService.getCurrentUser();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.isAdmin) {
      taskService.fetchAllTasks().then((response) => {
        setTasks(response.data);
      });
    } else {
      taskService.fetchTasks().then((response) => {
        setTasks(response.data);
      });
    }
  }, []);

  const handleDeleteTask = async (id) => {
    const tasksClone = [...tasks];

    try {
      setTasks(tasks.filter((task) => task.id !== id));
      const response = await taskService.deleteTask(id);
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        alert("Data might have already been deleted");
      }
      setTasks(tasksClone);
    }
  };

  const handleToggleTask = async (id) => {
    let taskClone = tasks.find((t) => t.id === id);
    taskClone = { ...taskClone, completed: !taskClone.completed };

    try {
      await taskService.updateTask(id, taskClone);
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              completed: !task.completed,
            };
          }
          return task;
        })
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message[0]);
      }
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={8} marginTop={2}>
          <Card variant="outlined">
            <CardHeader
              title={
                currentUser.isAdmin
                  ? `${currentUser.username}'s Administrator View`
                  : `${currentUser.username}'s Tasks`
              }
              action={
                <IconButton
                  onClick={() => {
                    navigate("/tasks/new");
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              }
            />
            <CardContent>
              <TaskTable
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onToggleTask={handleToggleTask}
                userId={currentUser.sub}
                isAdmin={currentUser.isAdmin}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TasksPage;
