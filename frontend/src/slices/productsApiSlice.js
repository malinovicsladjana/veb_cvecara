import { apiSlice } from './apiSlice';
import { PRODUCT_URL } from '../constants';

const transformProduct = (product) => ({
  ...product,
  id: product._id,
  title: product.name,
  price: `${Number(product.price).toLocaleString('sr-RS')} RSD`,
  inStock: product.countInStock > 0,
});

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCT_URL,
      transformResponse: (response) => response.map(transformProduct),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Product', id })), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    getProductDetails: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      transformResponse: transformProduct,
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCT_URL,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.productId }, { type: 'Product', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
