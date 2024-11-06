import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
} from './ActionTypes';
import { API_BASE_URL } from '@/config/api';

// Register Action
export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          dispatch({ type: REGISTER_SUCCESS, payload: data });
        }
        console.log("Register success:", data);
    } catch (error) {
        console.error("Register failed:", error);
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
};

// Login Action
export const login = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        // Fetch user profile immediately after login
        await dispatch(getUser());
        }
        console.log("Login success:", data);
    } catch (error) {
        console.error("Login failed:", error);
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

// Get User Profile Action
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
      // Verify jwt Token in localStorage
      const token = localStorage.getItem("jwt");
      console.log("Token used for getUser:", token);

      if (!token) {
          throw new Error("JWT token is missing in localStorage.");
      }

      // Proceed with the API call if the token is present
      const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: {
              Authorization: `Bearer ${token}`, 
          },
      });
      
      dispatch({ type: GET_USER_SUCCESS, payload: data });
      console.log("User profile fetched:", data);
  } catch (error) {
      console.error("Fetching user profile failed:", error);
      dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};


// Logout Action
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
};
