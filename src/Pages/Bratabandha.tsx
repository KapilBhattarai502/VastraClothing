import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
type SearchProps = GetProps<typeof Input.Search>;
import type { GetProps } from 'antd';
import { Pagination, message } from "antd";
import { useAddCart } from "../hooks/Post/useAddCart";
import Card from "../components/Cards/Bratabandha";
import CircleProgress from "../components/CircularProgress";
import { Input } from 'antd';


const Bratabandha = () => {
  // State for page number
  const [currentPage, setCurrentPage] = useState(1);
  const { Search } = Input;
  const [currentUserPujaItems,setCurrentUserPujaItems]=useState(null)

  // Call useGetMenFashion with the current page number
  const {isLoading,data,refetch}=useGetBratabandhaItems()

  const [sortBy, setSortBy] = React.useState("bestMatch");
  const [searchParams, setSearchParams] = useSearchParams();
  const colorValue = searchParams.get("colors");
  const priceValue = searchParams.get("Price");
      const { mutate: addToCart } = useAddCart();

      const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


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


  useEffect(()=>{
    window.scrollTo(0,0);
  },[currentPage])

  const handleChange = (event: any) => {
    setSortBy(event.target.value);
  };


  // Handle page change for Pagination component
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-18">
      <div className="h-[40rem]">
        <img
          src="https://image.cdn2.seaart.me/2025-06-01/d0u260de878c73d287gg/345825a64cb53b6cc66b471934690640eaed1916_high.webp"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="px-10 py-12">
        <div className=" grid grid-cols-4 gap-4">
          {/* Filter Component */}
          <div>
            <div className="flex justify-between items-center">
              <h4 className="mb-2">Filters</h4>
              <FilterListIcon />
            </div>

            <hr />
            <Search
            className="mt-4"
          placeholder="Search Here..."
         allowClear
         enterButton
         size="large"
         onSearch={onSearch}
    />
           
          </div>

          {/* Products and Pagination */}
          <div className="col-span-3">
            <div className="flex flex-row-reverse">
              <div className="w-[12rem]">
                <FormControl fullWidth>
                  <InputLabel id="sort-by-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sort-by-select"
                    value={sortBy}
                    label="SortBy"
                    onChange={handleChange}
                  >
                    <MenuItem value="bestMatch">Best Match</MenuItem>
                    <MenuItem value="asc">Price (low to high)</MenuItem>
                    <MenuItem value="desc">Price (high to low)</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="grid grid-cols-12 mt-2 gap-1">
              {!isLoading ? (
                currentUserPujaItems?.map((item:any)=>
      
                     <Card key={item?.itemName} product={item} setCurrentUserPujaItems={setCurrentUserPujaItems} currentUserPujaItems={currentUserPujaItems}/>)
              ) : (
                <div className="flex justify-center">
                  <CircleProgress />
                </div>
              )}
            </div>
            <div className="mt-20">
              <Pagination
                align="center"
                current={currentPage}
                total={data?.totalPages * 10}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bratabandha;



// import { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'
// import { useGetBratabandhaItems } from '../hooks/useGetBratabandhaItems'
// import Card from '../components/Cards/Bratabandha'
// import { Button, message } from 'antd'
// import { useAddCart } from '../hooks/useAddCart'


// const Bratabandha = () => {
   
//     const {isLoading,data,refetch}=useGetBratabandhaItems()
//     const [currentUserPujaItems,setCurrentUserPujaItems]=useState(null)
//     const { mutate: addToCart } = useAddCart();


//     useEffect(()=>{
//         if(data){
//             setCurrentUserPujaItems(data)
//         }



//     },[data])
//     const handleReset = async () => {
//       const response = await refetch()
//       if (response?.data) {
//         setCurrentUserPujaItems(response.data)
//       }
//     }
//     const addBratabandhaPujaItems=()=>{
//       try {
//         currentUserPujaItems?.map((pujaItem:any)=>{
//           addToCart({productId:pujaItem._id,quantity:Number(pujaItem.puja_quantity)})
          
         
//         })
//         message.success("Added to Cart")
        
//       } catch (error:any) {
//         console.log("Error adding to cart",error.message)

        
//       }
     

//     }

  
//   return (
//     <>
//     <Header/>
//     <span>Bratabandha</span>
//     <div className="mt-18">
//       <div className="h-[40rem]">
//         <img
         
//           src="https://graphicssellnepal.com/wp-content/uploads/2022/11/4188.png"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className='text-center mt-4'>
//       <h1>Puja Items</h1>
//       <div className='grid gap-2 grid-cols-3 cursor-pointer'>
//       {currentUserPujaItems?.map((item:any)=>
      
//       <Card key={item?.itemName} product={item} setCurrentUserPujaItems={setCurrentUserPujaItems} currentUserPujaItems={currentUserPujaItems}/>)}
//       </div>
//       </div>

//       <div className='text-center mt-4 flex gap-2 justify-center items-center'>
//       <Button onClick={()=>{addBratabandhaPujaItems()}}> Add To Cart</Button>
        
//         <Button type='primary' onClick={handleReset}>Reset</Button></div>

      
     
//     </div>
//     <Footer/>

//     </>
//   )
// }

// export default Bratabandha