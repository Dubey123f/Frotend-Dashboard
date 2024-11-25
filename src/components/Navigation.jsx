// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AppBar, Toolbar, Button, Typography } from "@mui/material";
// import UserManagement from "./UserManagement";
// const Navigation = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token from localStorage
//     alert("You have been logged out");
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
//       <Toolbar className="flex justify-between">
//         <Typography variant="h6" className="font-bold">
//           My App
//         </Typography>
//         <div className="space-x-4">
//           {isLoggedIn ? (
//             // Show Logout option if user is logged in
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           ) : (
//             // Show Login and Register options if user is not logged in
//             <>
//               <Button color="inherit" component={Link} to="/login">
//                 Login
//               </Button>
//               <Button color="inherit" component={Link} to="/register">
//                 Register
//               </Button>
//               <Button color="inherit" component={Link} to="/u">
//                 User
//               </Button>
//             </>
//           )}
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navigation;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in
  const userRole = localStorage.getItem("role"); // Get the role of the logged-in user

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Remove role from localStorage
    alert("You have been logged out");
    navigate("/login"); // Redirect to login page
  };

  const handleUserRedirect = () => {
    if (userRole === "admin") {
      // Redirect to admin dashboard if user is an admin
      navigate("/admin-dashboard");
    } else {
      // Redirect to login page if user is a regular user
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="font-bold">
          My App
        </Typography>
        <div className="space-x-4">
          {isLoggedIn ? (
            // Show Logout option if user is logged in
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            // Show Login and Register options if user is not logged in
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {/* User Button */}
          <Button color="inherit"  component={Link} to="/u">
            User
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
