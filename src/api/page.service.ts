import axiosInstance from './axios.config';

export const PageService = {
  findAll: async () => {
    let res = await axiosInstance.get('/pages/');
    return res.data;
  },
  findOne: async (id: number) => {
    let res = await axiosInstance.get(`/pages/${id}/`);
    return res.data;
  },
  create: async (data: IPage) => {
    let res = await axiosInstance.post('/pages/', data);
    return res.data;
  },
  update: async (id: string, data: IPage) => {
    let res = await axiosInstance.put(`/pages/${id}/`, data);
    return res.data;
  },
  delete: async (id: number) => {
    let res = await axiosInstance.delete(`/pages/${id}/`);
    return res.data;
  },
};
