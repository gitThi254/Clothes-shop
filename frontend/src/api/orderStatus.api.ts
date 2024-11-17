import axios from "./axios";

export type Status = {
  id: string;
  status: string;
};

export const getAllStatus = (): Promise<Status[]> => {
  return axios.get("/order-status").then((res) => res.data);
};
