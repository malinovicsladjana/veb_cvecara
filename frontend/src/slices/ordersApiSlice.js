import { apiSlice } from './apiSlice';
import { ORDER_URL, PAYPAL_URL } from '../constants';

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
    getPaypalClientId: builder.query({
      query: () => PAYPAL_URL,
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
      transformResponse: (response) =>
        response.map((order) => ({
          ...order,
          id: order._id,
          status: order.isDelivered ? 'Završeno' : 'Novo',
          total: order.totalPrice,
          userEmail: order.user?.email || order.shippingAddress?.email || 'Nepoznato',
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('sr-RS') : '',
        })),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Order', id })), { type: 'Order', id: 'LIST' }]
          : [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useGetOrdersQuery,
} = ordersApiSlice;
