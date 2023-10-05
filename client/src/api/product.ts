import useSWR from 'swr';
import { useEffect, useMemo } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// types
import { IProductItem } from 'src/types/product';
import { ITypeRoom, IService, IRoom } from 'src/types/room';

// ----------------------------------------------------------------------

export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: (data?.products as IProductItem[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetTypeRooms() {
  const URL = 'http://localhost:6969/api/typerooms'
  const fetCher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, isValidating } = useSWR(URL, fetCher);

  const memoizedValue = useMemo(
    () => ({
      typerooms: (data as ITypeRoom[]) || [],
      typeroomsLoading: isLoading,
      typeroomsError: error,
      typeroomsValidating: isValidating,
      typeroomsEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetTypeServices() {
  const URL = 'http://localhost:6969/api/typeservices'
  const fetCher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, isValidating } = useSWR(URL, fetCher);

  const memoizedValue = useMemo(
    () => ({
      typeservices: (data as ITypeRoom[]) || [],
      typeservicesLoading: isLoading,
      typeservicesError: error,
      typeservicesValidating: isValidating,
      typeservicesEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetTypeRoom(id: string) {
  const URL = id ? [`http://localhost:6969/api/typerooms/${id}` ] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: data as ITypeRoom,
      dataLoading: isLoading,
      dataError: error,
      dataValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetTypeService(id: string) {
  const URL = id ? [`http://localhost:6969/api/typeservices/${id}` ] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      data: data as ITypeRoom,
      dataLoading: isLoading,
      dataError: error,
      dataValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetServices() {
  const URL = 'http://localhost:6969/api/services'
  const fetCher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, isValidating } = useSWR(URL, fetCher);

  const memoizedValue = useMemo(
    () => ({
      services: (data as IService[]) || [],
      servicesLoading: isLoading,
      servicesError: error,
      servicesValidating: isValidating,
      servicesEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetService(id: string) {
  const URL = id ? [`http://localhost:6969/api/services/${id}` ] : null;
  const fetCher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, isValidating } = useSWR(URL, fetCher);

  const memoizedValue = useMemo(
    () => ({
      service: (data as IService) || [],
      serviceLoading: isLoading,
      serviceError: error,
      serviceValidating: isValidating,
      serviceEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useGetRooms() {
  const URL = 'http://localhost:6969/api/rooms'
  const fetCher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, isValidating } = useSWR(URL, fetCher);

  const memoizedValue = useMemo(
    () => ({
      rooms: (data as IRoom[]) || [],
      roomsLoading: isLoading,
      roomsError: error,
      roomsValidating: isValidating,
      roomsEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetRoom(id: string) {
  const URL = id ? [`http://localhost:6969/api/rooms/${id}` ] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      room: data as IRoom,
      roomLoading: isLoading,
      roomError: error,
      roomValidating: isValidating,
      roomEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );


  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product as IProductItem,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IProductItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}