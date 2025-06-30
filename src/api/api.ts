import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

export const login = async (payload: { email: string; password: string }) => {
  try {
    const response = await API.post("/login", payload);
    if (response.data?.access_token) {
      console.log(response)
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("refresh_token", response.data.refresh_token)

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

export const getExpenses = async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await API.get("/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export const addExpense = async(payload : any) => {
  const token = localStorage.getItem("access_token")

  try{
    const response = await API.post("/expenses", payload, {
      headers:{
          Authorization: `Bearer ${token}`,
      }
    })
    return response
  }
  catch (err: any) {
    throw err.response?.data || {message : "Something went wrong"}
  }
}

export default API;
