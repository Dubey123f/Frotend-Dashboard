import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserManagement from "../components/UserManagement";
import RoleManagement from "../components/RoleManagement";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: { backgroundColor: "#333", color: "#fff", width: "240px" },
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                variant: "h6",
                className: "font-bold",
              }}
            />
          </ListItem>
          <ListItem button component={Link} to="/u">
            <ListItemText primary="User Management" />
          </ListItem>
          <ListItem button component={Link} to="/admin-dashboard/roles">
            <ListItemText primary="Role Management" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6 overflow-auto">
        <Routes>
          <Route path="/u" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
