import React from "react";
import { Paper, List, ListItem, ListItemText, Button } from "@mui/material";

const RoleManagement = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary="Admin" />
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="User" />
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default RoleManagement;
