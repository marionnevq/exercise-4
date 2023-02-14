import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useNavigate } from "react-router-dom";

const TaskTable = ({ tasks, onDeleteTask, onToggleTask, userId, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <List dense={false}>
      {tasks.map((task) => (
        <ListItem>
          {task.userId === userId && (
            <ListItemAvatar>
              <IconButton edge="end" onClick={() => onToggleTask(task.id)} h>
                {task.completed ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </IconButton>
            </ListItemAvatar>
          )}

          <ListItemText
            primary={
              isAdmin ? `User ID: ${task.userId} - ${task.title}` : task.title
            }
          />

          {task.userId === userId && (
            <ListItemAvatar>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  navigate(`/tasks/${task.id}/edit`);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDeleteTask(task.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemAvatar>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskTable;
