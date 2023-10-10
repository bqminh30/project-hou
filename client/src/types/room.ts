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
  type_service_id: number | null;
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
  id: string ;
  name: string | any;
  title: string | any;
  description: string ;
  price: number;
  priceSale: number ;
  rating: number | any;
  totalRating: number | any;
  totalReview: number | any;
  numberBed: number | any;
  numberPeople: number | any;
  status: number | any;
  label: number | any;
  isLiked: number | any;
  image: string | any| any;
  voucher_id: number | any | null;
  type_room_id: number | any ;
  createdAt: Date | any;
  updatedAt: Date | any;
  service: IRoomService[] | any;
  roomImages: IRoomImage[] | any ;
}
