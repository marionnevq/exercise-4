import React from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import * as taskService from "../services/task";

const AddTaskPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (task) => {
    taskService
      .addTask(task)
      .then((response) => {
        if (task.completed) {
          const createdId = response.data.id;
          taskService
            .updateTask(createdId, task)
            .then((response) => {
              navigate("/");
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                alert(error.response.data.message[0]);
              }
            });
        }
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message[0]);
        }
      });
  };
  return (
    <>
      <TaskForm onSubmit={handleSubmit} />
    </>
  );
};

export default AddTaskPage;
