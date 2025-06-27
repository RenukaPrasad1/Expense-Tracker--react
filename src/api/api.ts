import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

export const login = async (payload: { email: string; password: string }) => {
  try {
    const response = await API.post("/login", payload);
    if (response.data?.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));

    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const signUp = async (payload: {username:string, email: string; password: string }) => {
  try{
    const response = await API.post("/register", payload);
    if (response.data?.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }

}

export default API;
