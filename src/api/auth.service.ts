import axiosInstance from './axios.config';

export const AuthService = {
  login: async (username: string, password: string) => {
    let res = await axiosInstance.post('/auth/login/', {
      username,
      password,
    });
    return res.data;
  },
  register: async (username: string, email: string, password: string, is_author: boolean) => {
    let res = await axiosInstance.post('/users/', {
      username,
      email,
      password,
      is_author: false,
    });

    return res.data;
  },
  logout: async () => {
    localStorage.removeItem('token');
  },
};
