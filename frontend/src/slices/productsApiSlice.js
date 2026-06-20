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
      providesTags: ['Product'],
    }),
    getProductDetails: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      transformResponse: transformProduct,
      providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
