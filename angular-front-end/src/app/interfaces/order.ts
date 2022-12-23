import { User } from "./user";

export interface Order {
  name: string,
  phoneNumber: string,
  user: User;
}