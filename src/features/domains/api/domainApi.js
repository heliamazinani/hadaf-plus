import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const domainApi = createApi({
  reducerPath: "domainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io",
  }),
  tagTypes: ["Domain"],
  endpoints: (builder) => ({
    getDomains: builder.query({
      query: () => "/domain",
      providesTags: ["Domain"],
    }),
    getDomainById: builder.query({
      query: (id) => `/domain/${id}`,
      providesTags: (_, __, id) => [{ type: "Domain", id }],
    }),
    createDomain: builder.mutation({
      query: (body) => ({
        url: "/domain",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Domain"],
    }),
    updateDomain: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/domain/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Domain"],
    }),
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `/domain/${id}`,
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
