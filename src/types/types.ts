export type Product= {
    id: number;
    name: string;
    price: number;
    rating: number;
    category: string;
    brand: string;
    slug: string;
    especs: string[];
    imgs: string[];
    stock: number;
    description: string;
    status: number;
  }

  export type Customer= {
    id: number;
    name: string;
    lastName: string;
    email:string;
    status: number;
  }

  export type User= {
    id: number;
    dni:number;
    name: string;
    lastName: string;
    number:number;
    email:string;
    role:number;
    status: number;
  }

  export type Provider= {
    id: number;
    ruc:number;
    name: string;
    number:number;
    email:string;
    web:string;
    status: number;
  }

  export type Category = {
    id:number,
    name: string,
    slug: string,
    img:string,
    description: string,
    status: number,
  }

  export type Brand = {
    id:number;
    banner:string;
    banner_mobile:string;
    name: string;
    slug: string;
    description: string;
    status: number;
  }
