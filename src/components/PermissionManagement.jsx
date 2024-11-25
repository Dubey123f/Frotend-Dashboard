import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

const Permissions = () => {
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleToggle = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Permissions Saved:", permissions);
    alert("Permissions updated successfully!");
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Permissions</h2>
      <div className="space-y-4">
        {Object.keys(permissions).map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={permissions[key]}
                onChange={() => handleToggle(key)}
                color="primary"
              />
            }
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
      </div>
      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#115293" },
        }}
        onClick={handleSave}
      >
        Save Permissions
      </Button>
    </div>
  );
};

export default Permissions;
