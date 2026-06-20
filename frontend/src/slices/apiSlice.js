import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        const userInfo = JSON.parse(storedUser);
        if (userInfo.token) {
          headers.set('authorization', `Bearer ${userInfo.token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'User', 'Order'],
  endpoints: () => ({}),
});
