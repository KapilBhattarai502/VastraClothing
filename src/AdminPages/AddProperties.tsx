import { Breadcrumb, Button } from 'antd'
import React, { useState } from 'react'
import { Input } from 'antd';
import { InnerOuletWrapper } from '../components/commonStyle/wrapper/OutletWrapper';
import { useAddUnit } from '../hooks/Post/useAddUnit';
import { useAddPujaName } from '../hooks/Post/useAddPujaName';
import { useAddPujaType } from '../hooks/Post/useAddPujaType';
import { useAddPujaSubType } from '../hooks/Post/useAddPujaSubType';
import { useAddProductColor } from '../hooks/Post/useAddProductColor';
import { useAddProductsSize } from '../hooks/Post/useAddProductSize';


const AddProperties = () => {
  const [unitValue,setUnitValue]=useState({})
  const [pujaName,setPujaName]=useState({})
  const [pujaType,setPujaType]=useState({})
  const [pujaSubType,setPujaSubType]=useState({})
  const [productSize,setProductSize]=useState("")
  const [productColor,setProductColor]=useState("")
  const {mutate:ADDUNIT,isLoading}=useAddUnit()
  const {mutate:ADDPUJANAME,isLoading:pujaNameLoading}=useAddPujaName()
  const {mutate:ADDPUJATYPE,isLoading:pujaTypeLoading}=useAddPujaType()
  const {mutate:ADDPUJASUBTYPE,isLoading:pujaSubTypeLoading}=useAddPujaSubType()
  const {mutate:ADDPRODUCTSIZE,isLoading:productSizeLoading}=useAddProductsSize()
  const {mutate:ADDPRODUCTCOLOR,isLoading:productColorLoading}=useAddProductColor()

  
  const handleUnitAdd=(val:any)=>{
    
    setUnitValue({label:val,value:val.toLowerCase()})


  }
  const handlePujaNameAdd=(val:any)=>{
    
    setPujaName({label:val,value:val.toLowerCase()})


  }
  const addUnit=()=>{
    ADDUNIT(unitValue)


  }
  const addPujaName=()=>{
    ADDPUJANAME(pujaName)
    
    

  }
  const handlePujaTypeAdd=(val:any)=>{
    
    setPujaType({label:val,value:val.toLowerCase()})


  }
  const addPujaType=()=>{
    ADDPUJATYPE(pujaType)
    
    

  }
  const handlePujaSubTypeAdd=(val:any)=>{
    
    setPujaSubType({label:val,value:val.toLowerCase()})


  }
  const addPujaSubType=()=>{
    ADDPUJASUBTYPE(pujaSubType)
    
    

  }
 const  handleProductSizeAdd =(val:any)=>{
  setProductSize(val?.toUpperCase())
 }
  const addProductSize=()=>{
    ADDPRODUCTSIZE(productSize)
    
    

  }
  const  handleProductColorAdd =(val:any)=>{
    setProductColor(val?.toLowerCase())
   }
    const addProductColor=()=>{
      ADDPRODUCTCOLOR(productColor)
      
      
  
    }
  
  return (
    <>
     <Breadcrumb
            style={{ marginBottom: "16px" }}
            items={[{ title: "Vaidik" }, {title:"add"},{ title: "properties" }]}
          />
      
          <div className='grid grid-cols-12 gap-2'>
          <Input placeholder="Add New Unit here..." className='md:col-span-8 sm:col-span-12' onChange={(e) => handleUnitAdd(e.target.value)}/>
          <Button type='primary' className='md:col-span-1 sm:col-span-12' onClick={addUnit} loading={isLoading}>Add Unit</Button>

          </div>
          <div className='grid grid-cols-12 gap-2 mt-4'>
          <Input placeholder="Add New Puja Name here..." className='md:col-span-8 sm:col-span-12' onChange={(e) => handlePujaNameAdd(e.target.value)}/>
          <Button type='primary' className='md:col-span-2 sm:col-span-12' onClick={addPujaName} loading={pujaNameLoading}>Add Puja Category</Button>

          </div>
          <div className='grid grid-cols-12 gap-2 mt-4'>
          <Input placeholder="Add Puja Type Here..." className='md:col-span-8 sm:col-span-12' onChange={(e) => handlePujaTypeAdd(e.target.value)}/>
          <Button type='primary' className='md:col-span-2 sm:col-span-12' onClick={addPujaType} loading={pujaTypeLoading}>Add Puja Type</Button>

          </div>
          <div className='grid grid-cols-12 gap-2 mt-4'>
          <Input placeholder="Add Puja Sub Type Here..." className='md:col-span-8 sm:col-span-12' onChange={(e) => handlePujaSubTypeAdd(e.target.value)}/>
          <Button type='primary' className='md:col-span-2 sm:col-span-12' onClick={addPujaSubType} loading={pujaSubTypeLoading}>Add Puja Sub Type</Button>

          </div>
          <div className='grid grid-cols-12 gap-2 mt-4'>
          <Input placeholder="Add Product Size Here..." className='md:col-span-8 sm:col-span-12' onChange={(e) => handleProductSizeAdd(e.target.value)}/>
          <Button type='primary' className='md:col-span-2 sm:col-span-12' onClick={addProductSize} loading={productSizeLoading}>Add Available Sizes</Button>

          </div>
          <div className='grid grid-cols-12 gap-2 mt-4'>
          <Input placeholder="Add Product Color Here..." className='md:col-span-8 sm:col-span-12' onChange={(e) => handleProductColorAdd(e.target.value)}/>
          <Button type='primary' className='md:col-span-2 sm:col-span-12' onClick={addProductColor} loading={productColorLoading}>Add Available Colors</Button>

          </div>
        

    
    
</>
  )
}

export default AddProperties