export type ITypeRoom = {
  id: string;
  name: string;
  createdAt: Date;
};

export type IService ={
  id: string;
  name: string;
  unit: string;
  price: number;
  type_service_id: number;
  type_service: string;
}

export type IRoomService = {
  id: string;
  name: string
}
export type IRoomImage = {
  id: string;
  name: string;
  // type: string;
}

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
  image: string;
  voucher_id: number;
  type_room_id: 1;
  createdAt: Date;
  updatedAt: Date;
  service: IRoomService[] | any;
  roomImages: IRoomImage[] | any;
}
