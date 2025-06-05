










import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import FilterSidebar from './components/FilterSidebar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import ProductCard from './components/ProductCard';
import { Card } from '../../components/ui/card';
import { useGetProduct } from '../../hooks/Get/useGetProduct';
import { OutletWrapper } from '../../components/commonStyle/wrapper/OutletWrapper';
import { useGetPujaType } from '../../hooks/Get/useGetPujaType';
import { useGetPujaSubType } from '../../hooks/Get/useGetPujaSubType';
import { Pagination, Spin } from 'antd';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data:products } = useGetProduct({pageNumber:currentPage,search:searchQuery,type:selectedType,sub_type:selectedSubType});
  const {data:uniqueTypes}= useGetPujaType()
  const {data:uniqueSubTypes}=useGetPujaSubType()


    const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  

 

 

  return (
    <OutletWrapper>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar
              uniqueTypes={uniqueTypes}
              uniqueSubTypes={uniqueSubTypes}
              selectedType={selectedType}
              selectedSubType={selectedSubType}
              onTypeChange={setSelectedType}
              onSubTypeChange={setSelectedSubType}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Products ({products?.content?.length})
                </h2>
                {(selectedType !== 'all' || selectedSubType !== 'all' || searchQuery) && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Search: "{searchQuery}"
                      </Badge>
                    )}
                    {selectedType !== 'all' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Type: {selectedType}
                      </Badge>
                    )}
                    {selectedSubType !== 'all' && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Subtype: {selectedSubType}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType("");
                        setSelectedSubType("");
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ?  <div className="p-12 text-center"><Spin size="small" /></div> : products?.content?.length > 0 && !isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.content?.map((product:any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('');
                    setSelectedSubType('');
                  }}
                >
                  Clear filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
           <div className="mt-20">
             <Pagination                 align="center"
                 current={currentPage}
                 total={products?.totalPages * 10}
                 onChange={handlePageChange}
               />           
                </div>
    </OutletWrapper>
  );
};

export default Store;






















// import React, { useEffect, useState } from "react";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { useSearchParams } from "react-router-dom";
// import FilterListIcon from "@mui/icons-material/FilterList";
// type SearchProps = GetProps<typeof Input.Search>;
// import type { GetProps } from 'antd';
// import {
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
// } from "@headlessui/react";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { Pagination } from "antd";
// import FashionCard from "../../components/Fashioncard";
// import CircleProgress from "../../components/CircularProgress";
// import { useGetProduct } from "../../hooks/Get/useGetProduct";
// import { Input } from 'antd';
// import { useGetPujaType } from "../../hooks/Get/useGetPujaType";
// import { useGetPujaSubType } from "../../hooks/Get/useGetPujaSubType";


// const StorePage = () => {
//   // State for page number
//   const [currentPage, setCurrentPage] = useState(1);
//   const { Search } = Input;
//   const {data:pujaTypes}=useGetPujaType()
//   const {data:pujaSubTypes}=useGetPujaSubType()

//   console.log("puja types",pujaTypes)

//   // Call useGetMenFashion with the current page number
//   const { isLoading, data } = useGetProduct(currentPage);

//   const [sortBy, setSortBy] = React.useState("bestMatch");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const colorValue = searchParams.get("colors");
//   const priceValue = searchParams.get("Price");

//   const filterColors = ["blue", "green", "beige", "black"];
//   useEffect(()=>{
//     window.scrollTo(0,0);
//   },[currentPage])

//   const handleChange = (event: any) => {
//     setSortBy(event.target.value);
//   };
//   const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     const currentParams = new URLSearchParams(searchParams);
  
//     // Get existing selected types
//     const existingTypes = currentParams.get("type")?.split(",") || [];
  
//     let updatedTypes = [...existingTypes];
  
//     if (e.target.checked) {
//       if (!existingTypes.includes(value)) {
//         updatedTypes.push(value);
//       }
//     } else {
//       updatedTypes = existingTypes.filter((v) => v !== value);
//     }
  
//     if (updatedTypes.length > 0) {
//       currentParams.set("type", updatedTypes.join(","));
//     } else {
//       currentParams.delete("type");
//     }
  
//     setSearchParams(currentParams);
//   };
  

 
//   const handleFilterSubTypeChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
//     const value = e.target.value;
//     const currentParams = new URLSearchParams(searchParams);
  
//     // Get existing selected types
//     const existingTypes = currentParams.get("sub-type")?.split(",") || [];
  
//     let updatedSubTypes = [...existingTypes];
  
//     if (e.target.checked) {
//       if (!existingTypes.includes(value)) {
//         updatedSubTypes.push(value);
//       }
//     } else {
//       updatedSubTypes = existingTypes.filter((v) => v !== value);
//     }
  
//     if (updatedSubTypes.length > 0) {
//       currentParams.set("sub-type", updatedSubTypes.join(","));
//     } else {
//       currentParams.delete("sub-type");
//     }
  
//     setSearchParams(currentParams);

//   }
//   const getSortedData = (data: any) => {
//     if (sortBy === "asc") {
//       return [...data].sort((a, b) => a.price - b.price); // Ascending
//     } else if (sortBy === "desc") {
//       return [...data].sort((a, b) => b.price - a.price); // Descending
//     }
//     return data; // No sorting for "Best Match"
//   };

//   const sortedData = getSortedData(data?.content);

//   // Handle page change for Pagination component
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="mt-18">
//       <div className="h-[40rem]">
//         <img
//           src="https://image.cdn2.seaart.me/2025-06-01/d0u260de878c73d287gg/345825a64cb53b6cc66b471934690640eaed1916_high.webp"
//           className=" w-full h-full object-cover"
//         />
//       </div>
//       <div className="px-10 py-12">
//         <div className=" grid grid-cols-4 gap-4">
//           {/* Filter Component */}
//           <div>
//             <div className="flex justify-between items-center">
//               <h4 className="mb-2">Filter by</h4>
//               <FilterListIcon />
//             </div>

//             <hr />

//             <Search
//             className="mt-4"
//           placeholder="Search Here..."
//          allowClear
//          enterButton
//          size="large"
//          onSearch={onSearch}/>
//             {/* Color Filter */}
//             <Disclosure as="div" className="border-b border-gray-200 py-6">
//               <h3 className="-my-3 flow-root">
//                 <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                   <span className="font-medium text-gray-900">Type</span>
//                   <span className="ml-6 flex items-center">
//                     <AddIcon
//                       aria-hidden="true"
//                       className="h-5 w-5 group-data-[open]:hidden"
//                     />
//                     <RemoveIcon
//                       aria-hidden="true"
//                       className="h-5 w-5 [.group:not([data-open])_&]:hidden"
//                     />
//                   </span>
//                 </DisclosureButton>
//               </h3>
//               <DisclosurePanel className="pt-6">
//                 <div className="space-y-4">
//                   {pujaTypes?.map((pujaType:any, index:any) => (
//                     <div key={index}>
//                       <input
//                         id={pujaType?.value}
//                         type="checkbox"
//                         className="mr-2"
//                         value={pujaType?.value}
//                         onChange={handleFilterChange}
//                       />
//                       <label htmlFor={pujaType?.value}>{pujaType?.label}</label>
//                       <br />
//                     </div>
//                   ))}
//                 </div>
//               </DisclosurePanel>
//             </Disclosure>

//             {/* Price Filter */}
//             <Disclosure as="div" className="border-b border-gray-200 py-6">
//               <h3 className="-my-3 flow-root">
//                 <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                   <span className="font-medium text-gray-900">Sub Type</span>
//                   <span className="ml-6 flex items-center">
//                     <AddIcon
//                       aria-hidden="true"
//                       className="h-5 w-5 group-data-[open]:hidden"
//                     />
//                     <RemoveIcon
//                       aria-hidden="true"
//                       className="h-5 w-5 [.group:not([data-open])_&]:hidden"
//                     />
//                   </span>
//                 </DisclosureButton>
//               </h3>
//               <DisclosurePanel className="pt-6">
//                 <div className="space-y-4">
//                   {pujaSubTypes?.map((pujaSubType:any, index:any) => (
//                     <div key={index}>
//                       <input
//                         id={pujaSubType?.value}
//                         type="checkbox"
//                         className="mr-2"
//                         value={pujaSubType?.value}
//                         onChange={handleFilterSubTypeChange}
//                       />
//                       <label htmlFor={pujaSubType?.value}>{pujaSubType?.label}</label>
            
//                     </div>
//                   ))}
//                 </div>
//               </DisclosurePanel>
//             </Disclosure>
//           </div>

//           {/* Products and Pagination */}
//           <div className="col-span-3">
//             <div className="flex flex-row-reverse">
//               <div className="w-[12rem]">
//                 <FormControl fullWidth>
//                   <InputLabel id="sort-by-label">Sort by</InputLabel>
//                   <Select
//                     labelId="sort-by-label"
//                     id="sort-by-select"
//                     value={sortBy}
//                     label="SortBy"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="bestMatch">Best Match</MenuItem>
//                     <MenuItem value="asc">Price (low to high)</MenuItem>
//                     <MenuItem value="desc">Price (high to low)</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 mt-2 gap-1">
//               {!isLoading ? (
//                 sortedData?.map((product: any) => (
//                   <FashionCard key={product._id} product={product} />
//                 ))
//               ) : (
//                 <div className="flex justify-center">
//                   <CircleProgress />
//                 </div>
//               )}
//             </div>
//             <div className="mt-20">
//               <Pagination
//                 align="center"
//                 current={currentPage}
//                 total={data?.totalPages * 10}
//                 onChange={handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StorePage;


