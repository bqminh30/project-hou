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
  data: string;
  // type: string;
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
