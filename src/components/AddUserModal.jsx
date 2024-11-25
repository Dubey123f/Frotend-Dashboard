import React,{useEffect,useState} from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const AddUserModal = ({ open, onClose, onSave, editUser }) => {
  const [userData, setUserData] = useState({ name: "", email: "", role: "User" });

  useEffect(() => {
    if (editUser) {
      setUserData(editUser);
    }
  }, [editUser]);

  const handleSave = () => {
    onSave(userData);
    setUserData({ name: "", email: "", role: "User" });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          mx: "auto",
          mt: "10%",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editUser ? "Edit User" : "Add User"}
        </Typography>
        <TextField
          label="Name"
          fullWidth
          sx={{ mb: 2 }}
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <TextField
          label="Role"
          fullWidth
          sx={{ mb: 2 }}
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal; // Ensure the export is default
