import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";

const GOOGLE_API_KEY =
  Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY ||
  "";
export const Google = createApi({
  reducerPath: "Google",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://maps.googleapis.com/maps/api/",
  }),
  endpoints: (builder) => ({
    getAddressSuggestions: builder.query<any, { input: string }>({
      query: ({ input }) => ({
        url: "place/autocomplete/json",
        method: "GET",
        params: {
          input,
          types: "address",
          components: "country:pk",
          key: GOOGLE_API_KEY,
        },
      }),
    }),
       getCityesSuggestions: builder.query<any, { input: string }>({
      query: ({ input }) => ({
        url: "place/autocomplete/json",
        method: "GET",
        params: {
          input,
          types: "(cities)",
          components: "country:pk",
          key: GOOGLE_API_KEY,
        },
      }),
    }),
    reverseGeocode: builder.query<any, { lat: number; lng: number }>({
      query: ({ lat, lng }) => ({
        url: `https://maps.googleapis.com/maps/api/geocode/json`,
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_API_KEY,
        },
      }),
    }),

    getPlaceDetails: builder.query<any, { placeId: string }>({
      query: ({ placeId }) => ({
        url: "place/details/json",
        method: "GET",
        params: {
          place_id: placeId,
          fields: "geometry,address_components,formatted_address",
          key:GOOGLE_API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useGetAddressSuggestionsQuery,
  useGetPlaceDetailsQuery,
  useLazyGetPlaceDetailsQuery,
  useLazyReverseGeocodeQuery,
  useGetCityesSuggestionsQuery,
} = Google;
