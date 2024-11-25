// import React, { useState } from "react";
// import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// import AddUserModal from "./AddUserModal"; // Ensure this is a default import

// const UserManagement = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "Florence Shaw", email: "florence@untitledui.com", role: "Admin", dateAdded: "July 4, 2022" },
//     { id: 2, name: "Amélie Laurent", email: "amelie@untitledui.com", role: "Admin", dateAdded: "July 4, 2022" },
//   ]);

//   const [editUser, setEditUser] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const handleEditUser = (user) => {
//     setEditUser(user);
//     setIsEditModalOpen(true);
//   };

//   const handleDeleteUser = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   const handleSaveEdit = (updatedUser) => {
//     setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
//     setIsEditModalOpen(false);
//   };

//   const handleAddUser = (newUser) => {
//     setUsers([...users, { ...newUser, id: users.length + 1 }]);
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
//         User Management
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mb: 2 }}
//         onClick={() => setIsEditModalOpen(true)}
//       >
//         + Add User
//       </Button>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Date Added</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.dateAdded}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEditUser(user)}>
//                     {/* <EditIcon /> */}
//                   </IconButton>
//                   <IconButton onClick={() => handleDeleteUser(user.id)}>
//                     {/* <DeleteIcon /> */}
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit User Modal */}
//       <AddUserModal
//         open={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={editUser ? handleSaveEdit : handleAddUser}
//         editUser={editUser}
//       />
//     </Box>
//   );
// };

// export default UserManagement;


import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Florence Shaw",
      email: "florence@untitledui.com",
      role: "Admin",
      status: "Active",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Amélie Laurent",
      email: "amelie@untitledui.com",
      role: "User",
      status: "Inactive",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    status: "Active",
    avatar: "",
  });

  // Open modal for adding or editing a user
  const handleOpenModal = (user = null) => {
    if (user) {
      setUserForm(user); // Populate form with user details for editing
    } else {
      setUserForm({
        id: null,
        name: "",
        email: "",
        role: "",
        status: "Active",
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70 + 1)}`, // Generate a random avatar
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserForm({
      id: null,
      name: "",
      email: "",
      role: "",
      status: "Active",
      avatar: "",
    });
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    handleMenuClose();
  };

  const handleSaveUser = () => {
    if (userForm.id) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === userForm.id ? { ...user, ...userForm } : user
        )
      );
    } else {
      // Add new user
      setUsers([
        ...users,
        { ...userForm, id: users.length + 1 },
      ]);
    }
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => handleOpenModal()}
      >
        + Add User
      </Button>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ position: "relative" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={user.avatar} alt={user.name} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={user.status}
                  color={user.status === "Active" ? "success" : "default"}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2">Role: {user.role}</Typography>
                <IconButton
                  sx={{ position: "absolute", top: 10, right: 10 }}
                  onClick={(event) => handleMenuClick(event, user)}
                >
                  <MoreVertIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenModal(selectedUser)}>Edit</MenuItem>
        <MenuItem onClick={() => handleDeleteUser(selectedUser?.id)}>
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit User Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{userForm.id ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={userForm.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={userForm.email}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Role"
            name="role"
            value={userForm.role}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
