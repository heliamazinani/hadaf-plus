import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
  }),
  tagTypes: ["Domain"],
  endpoints: (builder) => ({
    getDomains: builder.query({
      query: () => "/",
      providesTags: ["Domain"],
    }),
    getDomainById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: "Domain", id }],
    }),
    createDomain: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Domain"],
    }),
    updateDomain: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Domain"],
    }),
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Domain"],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainByIdQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi;
