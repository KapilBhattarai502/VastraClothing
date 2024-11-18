
import { useGetProduct } from '../hooks/useGetProduct'
import FashionCard from '../components/Fashioncard'
import { FormValues } from '../types/types';


interface Iproduct extends FormValues{
    _id:string
}

const Viewproductpage = () => {
    const { isLoading, isError, data } = useGetProduct();

    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    if (isError) {
        return <h2>Error...</h2>;
    }
  

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {data?.content.map((product:Iproduct ) => (
                <FashionCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default Viewproductpage;
