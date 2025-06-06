export interface LoginType{
    email:string,
    password:string,
}

export interface LoginResUser{
    name:string,
    role:string,
}



export interface JWT{
    token:string
}


export interface ResUser extends JWT {
    user:LoginResUser

}

export interface Size {
    name: string;
    quantity: number;
  }

export interface OPTION {
    label:string,
    value:string
}
  
 export  interface FormValues {
    brand: string;
    title: string;
    imageUrl: string;
    color: string;
    price: number;
    discountedPercent: number;
    discountedPrice: number;
    quantity: number;
    description: string;
    sizes: Size[];
    pujaName:OPTION[];
    puja_quantity:Number,
    unit:String
  }

  export interface NEWUSER{
    firstName:string,
    lastName:string,
    role:string,
    email:string,
    password:string
  }

  export interface PAYMENTINFO{
    product_code:string,
    transaction_uuid:string,
    total_amount:number,
    status:string,
    ref_id:string
  }