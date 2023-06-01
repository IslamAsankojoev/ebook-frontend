import axiosInstance from './axios.config';

export const BookService = {
  findAll: async () => {
    let res = await axiosInstance.get('/books/');
    return res.data;
  },
  findOne: async (id: number) => {
    let res = await axiosInstance.get(`/book/${id}/`);
    return res.data;
  },
  create: async (data: IBook) => {
    let res = await axiosInstance.post('/books/', data);
    return res.data;
  },
  update: async (id: string, data: IBook) => {
    let res = await axiosInstance.put(`/books/${id}/`, data);
    return res.data;
  },
  delete: async (id: number) => {
    let res = await axiosInstance.delete(`/books/${id}/`);
    return res.data;
  },
};
