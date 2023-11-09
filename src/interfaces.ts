import { Palette, Theme } from "@mui/material";

export interface ICustomShadows {
  [key: string]: string;
}

export interface ITheme extends Theme {
  customShadows: ICustomShadows;
  palette: Palette;
}

export type TMethods = "UPDATE" | "CREATE" | "DELETE";

export type TStatus = "SUCCESS" | "ERROR";

export type IStatusTexts = {
  [key in TMethods]: {
    [key in TStatus]: string;
  };
};

export type IUser = {
  error: boolean;
  data: {
    token: string;
    user: {
      id: 3;
      name: string;
      email: string;
      email_verified_at: null;
      created_at: string;
      updated_at: string;
    };
  };
} | null;

export interface ICompany {
  id: number;
  name: string;
  address: string;
  mail_address: null;
  bank_name: string;
  mfo_name: number;
  oked_name: number;
  stir: number;
  account_number: number;
  tax_number: number;
  director: string;
  director_jshir: number;
  phone_number: string;
  status: boolean;
  image: null;
  created_at: string;
  currency: number;
  time_zone: number;
  region: number;
  district: number;
  created_by: number;
}

export interface ICity {
  id?: number;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ICities {
  data: ICity[];
  total: number;
}

export interface ICitiesData {
  data: ICities;
}

export interface IHotel {
  id?: number;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  logo: string;
  data: any;
}

export interface IHotels {
  data: IHotel[];
  total: number;
}

export interface IHotelsData {
  data: IHotels;
}

export interface ITourPack {
  id?: number;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  price: number;
  logo: string;
  data: {
    price_uzs: number;
    count?: number | null;
    date?: string | null;
    additional: {
      uz: string;
      ru: string;
      en: string;
    };
    dates?: {
      [key: string]: {
        people_count: number;
        duration: number;
      }
    }
  };
  city_id: number;
}

export interface IDate {
  date: string;
  people_count: number;
  duration: number;
}

export interface ITourPacks {
  data: ITourPack[];
  total: number;
}

export interface ITourPacksData {
  data: ITourPacks;
}

export interface IPerson {
  fname: string;
  lname: string;
  citizenship: string;
  sex: "male" | "fmale";
  date_of_birth: string;
  seria: string;
  seria_number: string;
  validity_period: string;
}

export interface IChild {
  fname: string;
  lname: string;
  citizenship: string;
  sex: "male" | "fmale";
  date_of_birth: string;
  birth_certificate: string;
}

export interface IOrder {
  id: number;
  tour_id: string;
  people_count: string;
  places: number;
  data: {
    people: IPerson[];
    childs: IChild[];
    description: string;
    name: string;
    email: string;
    phone_number: string;
  };
  created_at: string;
  updated_at: string;
  status: "0" | "1";
}

export interface IOrders {
  data: IOrder[];
  total: number;
}

export interface IOrdersData {
  data: IOrders;
}
