import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import * as taskService from "../services/task";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.fetchTasks().then((response) => {
      setTasks(response.data);
    });
  }, []);

  const handleDeleteTask = async (id) => {
    const tasksClone = [...tasks];

    try {
      setTasks(tasks.filter((task) => task.id !== id));
      await taskService.deleteTask(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Data might have already been deleted");
      }
      setTasks(tasksClone);
    }
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={6} marginTop={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">User ABC</Typography>
              <TaskTable tasks={tasks} onDeleteTask={handleDeleteTask} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TasksPage;
