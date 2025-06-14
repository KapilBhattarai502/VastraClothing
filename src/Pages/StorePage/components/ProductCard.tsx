import React, { useEffect, useState } from "react";
import { CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAddCart } from "../../../hooks/Post/useAddCart";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  type: any;
  sub_type: any;
  inStock: boolean;
  availableSizes:[]|any;
  availableColors:[]|any;
  include_size:boolean;
  include_color:boolean;
  imageUrlColors:[];
  imageUrl:string;
  unit:any;
  size_based_pricing:boolean;
  size_price:[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
 
  const [selectedColor, setSelectedColor] = useState<any>("");
  const [selectedSize, setSelectedSize] = useState<any>("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { mutate: addCart } = useAddCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (product && !selectedColor && !selectedSize) {
      setSelectedColor(product?.availableColors[0]);
      setSelectedSize(product?.availableSizes[0]);

    }
    if (selectedColor) {
      const currentSelectedUrl = product?.imageUrlColors.filter(
        (colorInfo: any) => colorInfo?.color === selectedColor
      );
      currentSelectedUrl?.map((colorInfo: any) => {
        setSelectedImageUrl(colorInfo?.imageUrl);
      });
    } else {
      setSelectedImageUrl(product?.imageUrl);
    }

  }, [selectedColor, product]);
 

  
  const incrementQuantity = () => {
    if (selectedQuantity < product.quantity) {
      setSelectedQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = (productId: string) => {
    if(product?.include_size && !selectedSize){
      message.warning("Please select size ")
      return

    }
    else if(product?.include_color && !selectedColor){
      message.warning("Please select a color")
      return 

    }
    try {
      addCart({ quantity: selectedQuantity, productId,size:selectedSize,color:selectedColor });
      message.success("Added to Cart");
    } catch (error) {}
  };
  return (
    <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border border-gray-200 hover:border-gray-300 rounded-lg cursor-pointer">
      <div
        className="aspect-square overflow-hidden bg-gray-100"
        onClick={() => navigate(`/vaidik/productpage/${product._id}`)}
      >
        <img
          src={selectedImageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-4">
        <div
          className="flex items-start justify-between mb-2 "
          onClick={() => navigate(`/vaidik/productpage/${product._id}`)}
        >
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
            {product.type?.label}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {product?.sub_type?.label}
          </Badge>
        </div>
        {product?.include_color && product?.availableColors?.length > 0 && (
          <div className="flex">
            <p className="text-sm text-gray-600 font-bold">Color :</p>
            <div className="flex  items-center">
            {product?.availableColors?.map((color:any,colorIndex:any)=><button
                key={colorIndex}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border-2 transition-all ml-2 ${
                  selectedColor === color
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                style={{ backgroundColor: color }}
                title={color.name}
              />)}
            </div>
          </div>
        )}
        {product?.include_size && product?.availableSizes?.length > 0 && (
          <div className="flex items-center overflow-scroll over mt-2" style={{
            height: "40px"
          }}>
            <p className="text-sm text-gray-600 font-bold">Size :</p>
            <div className="flex  items-center" style={{maxWidth:"0.6rem"}}>
            {product?.availableSizes?.map((size:any,sizeIndex:any)=><button
                key={sizeIndex}
                onClick={() => setSelectedSize(size)}
                className={`border transition-all ml-2 px-2 ${
                  selectedSize === size
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                title={size}
              >{size}</button>)}  
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
            ₹{product?.size_based_pricing
              ? product?.size_price?.find(s => s.size === selectedSize)?.price
               : product?.price?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">/ {product?.unit?.label}</span>
          </div>
          <div className="text-right">
            <div
              className={`text-xs ${
                product.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
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
          onClick={() => {
            handleAddToCart(product._id);
          }}
        >
          <ShoppingCartIcon className="h-4 w-4 mr-2" />
          {product.quantity > 0
            ? `Add ${selectedQuantity} ${product.unit?.label}${
                selectedQuantity > 1 ? "s" : ""
              } to Cart`
            : "Out of Stock"}
        </Button>
      </CardContent>
    </div>
  );
};

export default ProductCard;
