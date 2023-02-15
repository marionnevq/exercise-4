import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskTable = ({ tasks, onDeleteTask, onToggleTask, userId, isAdmin }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isAdmin) {
    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            aria-label="basic tabs example"
            value={value}
            onChange={handleChange}
          >
            <Tab value="one" label="Admin Tasks" />
            <Tab value="two" label="All Tasks" />
          </Tabs>
        </Box>
        {value === "one" ? (
          <>
            <List dense={false}>
              {tasks
                .filter((task) => task.userId === userId)
                .map((task) => (
                  <ListItem key={task.id}>
                    <ListItemAvatar>
                      <IconButton
                        edge="end"
                        onClick={() => onToggleTask(task.id)}
                      >
                        {task.completed ? (
                          <CheckBoxIcon />
                        ) : (
                          <CheckBoxOutlineBlankIcon />
                        )}
                      </IconButton>
                    </ListItemAvatar>

                    <ListItemText primary={task.title} />

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
          </>
        ) : (
          <>
            <List dense={true}>
              {tasks
                .filter((task) => task.userId !== userId)
                .map((task) => (
                  <ListItem key={task.id}>
                    <ListItemText
                      primary={`User ID: ${task.userId} - ${task.title}`}
                    />
                  </ListItem>
                ))}
            </List>
          </>
        )}
      </>
    );
  } else {
    return (
      <List dense={false}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemAvatar>
              <IconButton edge="end" onClick={() => onToggleTask(task.id)}>
                {task.completed ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </IconButton>
            </ListItemAvatar>

            <ListItemText primary={task.title} />

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
          </ListItem>
        ))}
      </List>
    );
  }
};

export default TaskTable;
