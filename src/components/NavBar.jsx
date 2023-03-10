import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../services/auth";

const NavBar = ({ onLogout }) => {
  const currentUser = authService.getCurrentUser();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Task Management App
          </Typography>
          <div>
            {currentUser ? (
              <>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ marginRight: 2 }}
                >
                  Welcome {currentUser.username}
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button LinkComponent={Link} to="/register" color="inherit">
                  Register
                </Button>
                <Button LinkComponent={Link} to="/login" color="inherit">
                  Login
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
