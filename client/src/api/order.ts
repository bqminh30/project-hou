import { IBookingOrder } from 'src/types/room';
import axios, { AxiosRequestConfig } from 'axios';
// utils
import { endpoints, fetcher } from 'src/utils/axios';
import { useEffect, useMemo } from 'react';

// types
import { IProductItem } from 'src/types/product';
import useSWR from 'swr';

// ----------------------------------------------------------------------

export function useGetOrderBookings() {
  const URL = 'http://localhost:6969/api/orders'
  const fetCher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, isValidating } = useSWR(URL, fetCher);

  const memoizedValue = useMemo(
    () => ({
      orders: data as IBookingOrder[] || [],
      ordersLoading: isLoading,
      ordersError: error,
      ordersValidating: isValidating,
      ordersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
