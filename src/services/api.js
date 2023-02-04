import axios from 'axios';

const API_KEY = '31904814-f4bcbbfe75d97904192d1a917';
const instans = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: API_KEY,
  },
});

export const getImages = async (q, page = 1) => {
  const { data } = await instans('/', {
    params: {
      q,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data.hits;
};
