import axios from "./axios";

export type ShippingHttpRes = {
  id: string;
  name: string;
  price: number;
};

export const getShippping = (): Promise<ShippingHttpRes[]> => {
  return axios.get("/shipping-method").then((res) => res.data);
};
