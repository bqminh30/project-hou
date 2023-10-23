export type IRoomFilterValue = string | string[]  | null;

export type IRoomFilters = {
  labels: string;
  services: string[];
};

export type ITypeRoom = {
  id: string;
  name: string;
  createdAt: Date;
};

export type IService = {
  id: string;
  name: string;
  unit: string;
  price: number;
  type_service_id: number | null;
  type_service: string;
};

export type IRoomService = {
  id: string;
  name: string;
};
export type IRoomImage = {
  id: string;
  type: string;
  name: string;
  data: string | null;
  // type: string;
};

export type IRoomReview = {
  id: string;
  fullname: string;
  phonenumber: string;
  email:string;
  content: string;
  image: string;
  rating: number;
  status: number;
  room_id: string;
  customer_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IRoom = {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  priceSale: number;
  rating: number;
  totalRating: number;
  totalReview: number;
  numberBed: number;
  numberPeople: number;
  status: number;
  label: number;
  isLiked: number;
  image: string |any;
  voucher_id: number | null;
  type_room_id: number;
  createdAt: Date;
  updatedAt: Date;
  service: IRoomService[];
  roomImages: IRoomImage[] ;
};


export type IBookingOrder = {
  id: string;
  createdDate: Date;
  count: number;
  status: number;
  total: number;
  note: string;
  customer_id: number;
  employee_id: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  customer: string;
}


export type IOrderBookingTableFilterValue = string | string[] | Date | null;

export type IOrderBookingTableFilters = {
  customer: string;
  service: string[];
  status: number | string;
  createdDate: Date | null;
  endDate: Date | null;
};
