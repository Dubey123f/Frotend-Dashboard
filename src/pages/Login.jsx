


import React, { useState } from "react";
import { loginUser } from "../api/api"; // Import API function
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // New field for role
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData); // Send role along with email and password
      const { token, role } = response;

      // Save token to localStorage for authorization
      localStorage.setItem("token", token);
      alert("Login successful");

      // Redirect based on user role
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/d");
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      className="flex justify-center items-center"
      sx={{
        height: "100vh",
        background: "linear-gradient(to right, #2193b0, #6dd5ed)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "400px",
          padding: "20px",
          boxShadow: 6,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" align="center" mb={2}>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                variant="outlined"
              />
            </Box>
            <Box mb={3}>
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                type="password"
                variant="outlined"
              />
            </Box>
            <Box mb={3}>
              <TextField
                select
                label="Select Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                helperText="Please select your role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </Box>
            <Button
              type="submit"
              fullWidth
              sx={{
                background: "linear-gradient(to right, #6dd5ed, #2193b0)",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                "&:hover": {
                  background: "#186a8a",
                },
              }}
            >
              Login
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            mt={3}
            sx={{ color: "#666" }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#2193b0",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Register
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
