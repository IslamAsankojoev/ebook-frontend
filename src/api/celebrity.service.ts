import axiosInstance from './axios.config';

export const CelebrityService = {
  findAll: async () => {
    let res = await axiosInstance.get('/celebrities/');
    return res.data;
  },
  findOne: async (id: number) => {
    let res = await axiosInstance.get(`/celebrities/${id}/`);
    return res.data;
  },
  create: async (data: ICelebrity) => {
    let res = await axiosInstance.post('/celebrities/', data);
    return res.data;
  },
  update: async (id: number, data: ICelebrity) => {
    let res = await axiosInstance.put(`/celebrities/${id}/`, data);
    return res.data;
  },
  delete: async (id: number) => {
    let res = await axiosInstance.delete(`/celebrities/${id}/`);
    return res.data;
  },
};
