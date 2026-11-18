import axios from 'axios';

const API_URL = 'http://localhost:3000/api/siswa';

export const siswaApi = {
  getAll: () => axios.get(API_URL),
  create: (data) => axios.post(API_URL, data),
  update: (kode, data) => axios.put(`${API_URL}/${kode}`, data),
  delete: (kode) => axios.delete(`${API_URL}/${kode}`),
};