/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Numeric = ColumnType<string, number | string>;

export type Timestamp = ColumnType<Date, Date | string>;

export interface Deals {
  createdAt: Generated<Timestamp>;
  dayOfWeek: string;
  dealId: Generated<number>;
  description: string;
  endTime: string;
  restaurantId: number | null;
  startTime: string;
  updatedAt: Generated<Timestamp>;
}

export interface Requests {
  createdAt: Generated<Timestamp>;
  dealId: number | null;
  details: string | null;
  requestId: Generated<number>;
  requestType: string;
  restaurantId: number | null;
  status: Generated<string>;
  updatedAt: Generated<Timestamp>;
  userId: number | null;
}

export interface Restaurants {
  address: string | null;
  createdAt: Generated<Timestamp>;
  cuisineType: string | null;
  latitude: Numeric | null;
  longitude: Numeric | null;
  name: string;
  openingHours: string | null;
  phone: string | null;
  photo: string | null;
  restaurantId: Generated<number>;
  updatedAt: Generated<Timestamp>;
  website: string | null;
}

export interface UserFavoriteDeals {
  createdAt: Generated<Timestamp>;
  dealId: number;
  updatedAt: Generated<Timestamp>;
  userId: number;
}

export interface UserFavoriteRestaurants {
  createdAt: Generated<Timestamp>;
  restaurantId: number;
  updatedAt: Generated<Timestamp>;
  userId: number;
}

export interface Users {
  createdAt: Generated<Timestamp>;
  email: string;
  passwordHash: string;
  registrationDate: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
  userId: Generated<number>;
  username: string;
}

export interface DB {
  deals: Deals;
  requests: Requests;
  restaurants: Restaurants;
  userFavoriteDeals: UserFavoriteDeals;
  userFavoriteRestaurants: UserFavoriteRestaurants;
  users: Users;
}
