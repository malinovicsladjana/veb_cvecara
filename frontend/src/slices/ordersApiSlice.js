import { apiSlice } from './apiSlice';
import { ORDER_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: () => `${ORDER_URL}/myorders`,
      providesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (orderId) => `${ORDER_URL}/${orderId}`,
      providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: 'PUT',
        body: paymentResult,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.orderId }, 'Order'],
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.query({
      query: () => ORDER_URL,
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useGetOrdersQuery,
} = ordersApiSlice;
