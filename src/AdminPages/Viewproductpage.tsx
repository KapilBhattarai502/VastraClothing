
import { useGetProduct } from '../hooks/Get/useGetProduct'
import FashionCard from '../components/Fashioncard'
import { FormValues } from '../types/types';
import { Breadcrumb, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { manageSearchRequirement } from '../feature/Slice/adminSearchSlice';



interface Iproduct extends FormValues{
    _id:string
}



const Viewproductpage = () => {
    const [pageNumber,setPageNumber]=useState(1)
    const dispatch=useDispatch()
    const { isLoading, isError, data } = useGetProduct({pageNumber,type:"",sub_type:"",search:""});
    useEffect(()=>{
        dispatch(manageSearchRequirement(true))

        return ()=>{
            dispatch(manageSearchRequirement(false))
        }
    },[])


    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    if (isError) {
        return <h2>Error...</h2>;
    }

    const handlePageNumber: PaginationProps['onChange'] = (pageNumber) => {
        setPageNumber(pageNumber)
      };
  

    return (
        <>
         <Breadcrumb
            style={{ marginBottom: "16px" }}
            items={[{ title: "Vaidik" }, { title: "Products" }]}
          />
           
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {data?.content.map((product:Iproduct ) => (
                <FashionCard key={product._id} product={product} />
            ))}
           
        </div>
        <div className='mt-4'>
            <Pagination align="center" total={(data?.totalPages)*10} onChange={handlePageNumber} current={pageNumber} />
                
            </div>
        </>
    );
};

export default Viewproductpage;
