import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post("http://127.0.0.1:8000/refresh", {
            refresh_token: refreshToken,
          });

          const newAccessToken = res.data.access_token;
          localStorage.setItem("access_token", newAccessToken);

          // Attach new access token to the failed request and retry
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return API(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token invalid:", refreshError);
          localStorage.clear();
          window.location.href = "/"; // redirect to login
        }
      }
    }

    return Promise.reject(error);
  }
);

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

  try {
    const response = await API.get("/expenses");
    return response?.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export const addExpense = async(payload : any) => {

  try{
    const response = await API.post("/expenses", payload)
    return response?.data
  }
  catch (err: any) {
    throw err.response?.data || {message : "Something went wrong"}
  }
}

export const editExpense = async (id: string, payload: any) => {
  try {
    const response = await API.put(`/expenses/${id}`, payload);
    return response?.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export const deleteExpense = async(id:string) => {
  try{
    const response = await API.delete(`/expenses/${id}`);
    return response?.data
  }
  catch (err: any){
    throw err.response?.data || {message : "Something went wrong"}
  }
}

export default API;
