import React, { useState } from 'react';
import { CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAddCart } from '../../../hooks/Post/useAddCart';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  type: string;
  subType: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const {mutate:addCart} = useAddCart()
    const navigate=useNavigate()
    const incrementQuantity = () => {
        if (selectedQuantity < product.quantity) {
          setSelectedQuantity(prev => prev + 1);
        }
      };
    
      const decrementQuantity = () => {
        if (selectedQuantity > 1) {
          setSelectedQuantity(prev => prev - 1);
        }
      };
      const handleAddToCart=(productId:string)=>{
        try {
            addCart({quantity:selectedQuantity,productId})
            message.success("Added to Cart")
            
        } catch (error) {
            
        }
        
        
      }
  return (
    <CardContent className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border border-gray-200 hover:border-gray-300 rounded-lg cursor-pointer">
      <div className="aspect-square overflow-hidden bg-gray-100" onClick={()=>navigate(`/vaidik/productpage/${product._id}`)}>
        <img
          src={product?.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2 " onClick={()=>navigate(`/vaidik/productpage/${product._id}`)}>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {product.type}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {product?.sub_type}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">/ {product?.unit}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Available: {product.quantity} {product?.unit}{product.quantity > 1 ? 's' : ''}
            </div>
            <div className={`text-xs ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        {product.quantity > 0 && (
          <div className="flex items-center justify-center gap-3 mb-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={decrementQuantity}
              disabled={selectedQuantity <= 1}
            >
              <RemoveIcon className="h-4 w-4" />
            </Button>
            <span className="font-medium text-lg min-w-[2rem] text-center">
              {selectedQuantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={incrementQuantity}
              disabled={selectedQuantity >= product.quantity}
            >
              <AddIcon className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          disabled={product.quantity < 1}
          onClick={()=>{handleAddToCart(product._id)}}
        >
          <ShoppingCartIcon className="h-4 w-4 mr-2" />
          {product.quantity > 0 ? `Add ${selectedQuantity} ${product.unit}${selectedQuantity > 1 ? 's' : ''} to Cart` : 'Out of Stock'}
        </Button>
      </CardContent>
    </CardContent>
  );
};

export default ProductCard;