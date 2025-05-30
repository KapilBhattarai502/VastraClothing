import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useGetBratabandhaItems } from '../hooks/useGetBratabandhaItems'
import Card from '../components/Cards/Bratabandha'
import { Button, message } from 'antd'
import { useAddCart } from '../hooks/useAddCart'


const Bratabandha = () => {
   
    const {isLoading,data,refetch}=useGetBratabandhaItems()
    const [currentUserPujaItems,setCurrentUserPujaItems]=useState(null)
    const { mutate: addToCart } = useAddCart();


    useEffect(()=>{
        if(data){
            setCurrentUserPujaItems(data)
        }



    },[data])
    const handleReset = async () => {
      const response = await refetch()
      if (response?.data) {
        setCurrentUserPujaItems(response.data)
      }
    }
    const addBratabandhaPujaItems=()=>{
      try {
        currentUserPujaItems?.map((pujaItem:any)=>{
          addToCart({productId:pujaItem._id,quantity:Number(pujaItem.puja_quantity)})
          
         
        })
        message.success("Added to Cart")
        
      } catch (error:any) {
        console.log("Error adding to cart",error.message)

        
      }
     

    }

  
  return (
    <>
    <Header/>
    <span>Bratabandha</span>
    <div className="mt-18">
      <div className="h-[40rem]">
        <img
         
          src="https://graphicssellnepal.com/wp-content/uploads/2022/11/4188.png"
          className="w-full h-full object-cover"
        />
      </div>
      <div className='text-center mt-4'>
      <h1>Puja Items</h1>
      <div className='grid gap-2 grid-cols-3 cursor-pointer'>
      {currentUserPujaItems?.map((item:any)=>
      
      <Card key={item?.itemName} product={item} setCurrentUserPujaItems={setCurrentUserPujaItems} currentUserPujaItems={currentUserPujaItems}/>)}
      </div>
      </div>

      <div className='text-center mt-4 flex gap-2 justify-center items-center'>
      <Button onClick={()=>{addBratabandhaPujaItems()}}> Add To Cart</Button>
        
        <Button type='primary' onClick={handleReset}>Reset</Button></div>

      
     
    </div>
    <Footer/>

    </>
  )
}

export default Bratabandha