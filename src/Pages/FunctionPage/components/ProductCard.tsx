import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

interface Product {
    
    _id: string;
    title: string;
    price: number;
    discountedPrice:number;
    imageUrl: string;
    description: string;
    pujaName: string[];
    puja_quantity:string;
    unit:string;
  
  }

interface ProductCardProps {
  product: Product;
  onToggleProduct: (product: Product) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
  isInPackage: boolean;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onToggleProduct, 
  onQuantityChange,
  isInPackage, 
  quantity 
}) => {
  const navigate=useNavigate()
  const handleQuantityIncrease = () => {
    
    onQuantityChange(product._id,Number(quantity)+1 );
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(product._id, Number(quantity) - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer ">
      <div className="relative" onClick={()=>navigate(`/vaidik/productpage/${product?._id}`)}>
        <img
          src={product?.imageUrl}
          alt={product?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs font-medium">
            {product?.pujaName[0]}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{product?.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-rose-600">
            <span>Rs {product?.discountedPrice}</span>
            <span className='text-sm text-red-500'>/{product?.unit}
            </span></span>
          
          <button
            onClick={() => onToggleProduct(product)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
              isInPackage
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
            }`}
          >
            {isInPackage ? (
              <>
                <RemoveIcon className="h-4 w-4" />
                <span>Remove</span>
              </>
            ) : (
              <>
                <AddIcon className="h-4 w-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
        {product?.puja_quantity && (
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <RemoveIcon className="h-4 w-4" />
              </button>
              <span className="font-semibold text-gray-900 min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={handleQuantityIncrease}
                className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 flex items-center justify-center"
              >
                <AddIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}  

       
      </div>
    </div>
  );
};

export default ProductCard;