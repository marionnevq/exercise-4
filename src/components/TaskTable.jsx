import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const TaskTable = ({ tasks, onDeleteTask }) => {
  return (
    <List dense={false}>
      {tasks.map((task) => (
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                onDeleteTask(task.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <IconButton edge="end" aria-label="mark">
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          </ListItemAvatar>
          <ListItemText primary={task.title} secondary={task.userId} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskTable;
