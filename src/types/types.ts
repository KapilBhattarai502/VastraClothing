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
    quantity: number|null|string;
    description: string;
    sizes: Size[];
    images:string[];
    pujaName:OPTION[];
    puja_quantity:Number;
    unit:String|null;
    pujaQuantities:{};
    type:String|null;
    sub_type:String|null;
    availableSizes: [];
    imageUrlColors: [];
    Variants:[];
    quantitySizeAndColors: []|any;
    quantitySizes:[];
    quantityColors:[];
    availableColors: [];
    hex:String;
    size_price:[];
    size_based_pricing:boolean;
    include_size:boolean;
    include_color:boolean;
    
    


  }

  export interface NEWUSER{
    firstName:string,
    lastName:string,
    role:string,
    email:string,
    password:string
    mobile:string
  }

  export interface PAYMENTINFO{
    product_code:string,
    transaction_uuid:string,
    total_amount:number,
    status:string,
    ref_id:string
  }