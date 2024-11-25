

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import AddUserModal from './AddUserModal';  // Assume this is your modal component for adding users

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // To check if the user is admin
  const [userEmail, setUserEmail] = useState(""); // Define userEmail state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({ username: "", email: "", role: "user" }); // User form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]); // Define users state

  const lineData = [
    { month: 'Jan', registrations: 30, logins: 20 },
    { month: 'Feb', registrations: 20, logins: 25 },
    { month: 'Mar', registrations: 50, logins: 30 },
  ];

  const stats = [
    { name: "Jan", value: 17 },
    { name: "Feb", value: 25 },
    { name: "Mar", value: 58 },
    { name: "Apr", value: 58 },
    { name: "May", value: 58 },
    { name: "Jun", value: 58 },
    { name: "July", value: 58 },
    { name: "Aug", value: 58 },
    { name: "Sept", value: 58 },
    { name: "Oct", value: 58 },
    { name: "Nov", value: 58 },
    { name: "Dec", value: 58 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const storedUserEmail = localStorage.getItem("userEmail"); // Ensure email is stored in localStorage
    setRole(userRole || "user");
    setUserEmail(storedUserEmail || "user@example.com"); // Default email if not found

    // Load users from local storage or API if needed
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleSaveUser = (userData) => {
    const updatedUsers = [...users, userData];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsAddUserModalOpen(false);
    setNewUserData({ username: "", email: "", role: "user" });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddUser}>
        Add User
      </Button>
      <Dialog open={isAddUserModalOpen} onClose={() => setIsAddUserModalOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newUserData.username}
            onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newUserData.email}
            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
          />
          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={newUserData.role}
            onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => handleSaveUser(newUserData)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Overall User's: 11,121.22
        </Typography>

        {/* Conditional rendering for admin */}
        {role === "admin" && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4caf50", mr: 2 }}
              onClick={handleAddUser}
            >
              Add User
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1976d2" }}
              onClick={() => navigate("/u")}
            >
              See All Users
            </Button>
          </Box>
        )}

        {/* Line Chart */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            User Registrations and Logins
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
              <Line type="monotone" dataKey="logins" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Asset Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
