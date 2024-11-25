import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:3001/api", // Update with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to requests if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Store JWT token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Methods
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// export const loginUser = async (loginData) => {
//   try {
//     const response = await API.post("/login", loginData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Login failed" };
//   }
// };
export const loginUser = async (loginData) => {
    try {
      const response = await API.post("/login", loginData);
      console.log("Login API Response:", response.data); // Log the response
      return response.data;
    } catch (error) {
      console.error("Login API Error:", error.response?.data || error.message);
      throw error.response?.data || { message: "Login failed" };
    }
  };
  

export const fetchUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await API.post("/users", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create user" };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await API.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update user" };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete user" };
  }
};

export const fetchDashboardData = async () => {
  try {
    const response = await API.get("/dashboard");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch dashboard data" };
  }
};

export default API;
