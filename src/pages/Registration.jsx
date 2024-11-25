// import React, { useState } from "react";
// import { registerUser } from "../api/api"; // Import API function
// import { useNavigate } from "react-router-dom";

// const Registration = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser(formData);
//       alert("Registration successful");
//       navigate("/login"); // Redirect to login after successful registration
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;
import React, { useState } from "react";
import { registerUser } from "../api/api"; // Import API function
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Alert, Box, Card, CardContent } from "@mui/material";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      const response = await registerUser(formData);
      alert("Registration successful");
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      className="flex justify-center items-center"
      sx={{
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "400px",
          padding: "20px",
          boxShadow: 4,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" align="center" mb={2}>
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{
                  style: { color: "#6a11cb" }, // Styled label
                }}
              />
            </Box>
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
                InputLabelProps={{
                  style: { color: "#2575fc" },
                }}
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
                InputLabelProps={{
                  style: { color: "#6a11cb" },
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              sx={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px",
                "&:hover": {
                  background: "#5a0db8",
                },
              }}
            >
              Register
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            mt={3}
            sx={{ color: "#666" }}
          >
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#6a11cb",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Registration;
