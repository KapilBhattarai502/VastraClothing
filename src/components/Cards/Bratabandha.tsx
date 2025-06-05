import {  useNavigate } from "react-router-dom";
import { message,Button } from 'antd';
import { MinusCircleOutlined,PlusCircleOutlined } from '@ant-design/icons';
import { checkLogin } from "../../Config/checkLogin";



const Card = ({ product,setCurrentUserPujaItems }: any) => {
  const { imageUrl, price, _id, discountedPrice, title , itemName,puja_quantity,unit} = product;
  const isLoggedIn=checkLogin()
  const navigate=useNavigate()
  const handleDecrease = (_id: string) => {
    if(!isLoggedIn){
      navigate("/login",{replace:true})
      message.info("Please Login First to make the changes")
    }
    setCurrentUserPujaItems((prevItems:any) => {
      if (!prevItems) return [];
  
      return prevItems.reduce((acc: typeof prevItems, item:any) => {
        if (item._id === _id) {
          if (item.quantity > 1) {
            // Decrease quantity without mutating original item
            acc.push({ ...item, puja_quantity: Number(item.puja_quantity) - 1 });
          }
          // Else, don't include the item (i.e., remove it)
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const handleRemove = (_id:any)=>{
    if(!isLoggedIn){
      navigate("/login",{replace:true})
      message.info("Please Login First to make the changes")
    }

    setCurrentUserPujaItems((prev:any)=> prev.filter((pujaItem:any)=>pujaItem._id !== _id))

  }

  const handleIncrease =(_id:any)=>{
    if(!isLoggedIn){
      navigate("/login",{replace:true})
      message.info("Please Login First to make the changes")
    }
    
    setCurrentUserPujaItems((prevItems:any)=> {
      if(!prevItems){
        return []
      }
      return prevItems?.reduce((acc :typeof prevItems,item:any)=>{
        if(item._id === _id){
          acc.push({...item, puja_quantity:Number(item.puja_quantity) + 1})
        }
        else {
          acc.push(item)
        }
        return acc
      },[])

    })
  }
  



  return (

    <div
      className="p-2 shadow-lg rounded-md col-span-6" 
    >
      <div className="h-[500px]">
        <img
          src={imageUrl}
          onClick={()=>{
            console.log("clicked")
             navigate(`/vaidik/productpage/${_id}`)
            
          }}
          alt=""
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-90"
        />
      </div>
      <div  >
        <h1 className="font-semibold mt-1">{title ? title : itemName}</h1>
        <div className="flex gap-5 items-center justify-between">
          <p className="font-light">Rs {price}</p>
          <p className="font-light">Quantity:</p>
          <div className="flex gap-2">
          <MinusCircleOutlined onClick={()=>handleDecrease(_id)} />
          <p>{puja_quantity}</p> 
          
          <PlusCircleOutlined onClick={()=>handleIncrease(_id)}/>
          </div>
          <div className="flex ">
          <p>Unit  </p>
          <p>:{unit}</p>
          </div>
          <Button danger onClick={()=>handleRemove(_id)}>Remove</Button>
         
        </div>
      </div>
    </div>

  );
};

export default Card;
