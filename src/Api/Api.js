import axios from 'axios';

// Отримання даних з API
export const requestData = async (id) => {
  try {
    const { data } = await axios.get(`https://api.punkapi.com/v2/beers?page=${id}`)
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


