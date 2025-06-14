import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddCart } from "../hooks/Post/useAddCart";
import { CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

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
  availableSizes: [] | any;
  availableColors: [] | any;
  include_size: boolean;
  include_color: boolean;
  imageUrlColors: [] | any;
  imageUrl: string;
  unit: any;
  size_based_pricing: boolean;
  size_price: [] | any;
}

interface ProductCardProps {
  product: Product;
}

const FashionCard = ({ product }: ProductCardProps) => {

  const [selection, setSelection] = useState({
    color: product.include_color ? product.availableColors?.[0] : "",
    size: product.include_size ? product.availableSizes?.[0] : "",
  });
  const selectedImage = product.include_color
    ? product.imageUrlColors?.find((c: any) => c.color === selection.color)
        ?.imageUrl
    : product.imageUrl;
  const navigate = useNavigate();

  const currentPrice = product.size_based_pricing
    ? product.size_price?.find((s: any) => s.size === selection.size)?.price
    : product.price;

  const handleSelect = (type: "color" | "size", value: string) => {
    setSelection((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white border border-gray-200 hover:border-gray-300 rounded-lg cursor-pointer">
      <div
        className="aspect-square overflow-hidden bg-gray-100"
        onClick={() => navigate(`/admin/productpage/${product._id}`)}
      >
        {/* className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" */}
        <img
          src={selectedImage || product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          // onError={(e) => e.currentTarget.src = fallbackImage}
        />
      </div>

      <CardContent className="p-4">
        <div
          className="flex items-start justify-between mb-2 "
          onClick={() => navigate(`/admin/productpage/${product._id}`)}
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
            {product?.type?.label}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {product?.sub_type?.label}
          </Badge>
        </div>
        {product.include_color &&
          product.availableColors.map((color: any) => (
            <button
              onClick={() => handleSelect("color", color)}
              className={selection.color === color ? "selected" : ""}
            />
          ))}
        {product?.include_color && product?.availableColors?.length > 0 && (
          <div className="flex">
            <p className="text-sm text-gray-600 font-bold">Color :</p>
            <div className="flex  items-center">
              {product?.availableColors?.map((color: any, colorIndex: any) => (
                <button
                  key={colorIndex}
                  onClick={() => handleSelect("color", color)}
                  className={`w-4 h-4 rounded-full border-2 transition-all ml-2 ${
                    selection?.color === color
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        )}

        {product?.include_size && product?.availableSizes?.length > 0 && (
          <div
            className="flex items-center overflow-scroll over mt-2"
            style={{
              height: "40px",
            }}
          >
            <p className="text-sm text-gray-600 font-bold">Size :</p>
            <div className="flex  items-center" style={{ maxWidth: "0.6rem" }}>
              {product?.availableSizes?.map((size: any, sizeIndex: any) => (
                <button
                  key={sizeIndex}
                  onClick={() => handleSelect("size", size)}
                  className={`border transition-all ml-2 px-2 ${
                    selection?.size === size
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                  title={size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{currentPrice}
            </span>
            <span className="text-sm text-gray-500">
              / {product?.unit?.label}
            </span>
          </div>
          <div className="text-right">
            <div
              className={`text-xs ${
                product.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <p>{product?.quantity}</p>
              <p>{product.quantity > 0 ? "In Stock" : "Out of Stock"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default FashionCard;
