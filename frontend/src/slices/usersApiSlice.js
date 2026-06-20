import { apiSlice } from './apiSlice';
import { USER_URL } from '../constants';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USER_URL}/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: USER_URL,
        method: 'POST',
        body: user,
      }),
    }),
    getUserProfile: builder.query({
      query: () => `${USER_URL}/profile`,
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = usersApiSlice;
