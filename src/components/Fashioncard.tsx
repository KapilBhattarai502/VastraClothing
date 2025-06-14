import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';


interface FlexibleProductCardProps {
  product: any;
  onAddToCart?: (productId: string, variantData: any, quantity: number) => void;
}

const FashionCard = ({ product, onAddToCart }: FlexibleProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const getAvailableColors = (product: Product) => {
    if (!product.include_color) return [];
    
    const uniqueColors = new Map();
    product.Variants.forEach(variant => {
      if (variant.color && variant.isAvailable) {
        uniqueColors.set(variant.color.name.value, variant.color);
      }
    });
    return Array.from(uniqueColors.values());
  };
  
   const getAvailableSizes = (product: any, selectedColor?: string) => {
    if (!product.include_size) return [];
    
    const uniqueSizes = new Map();
    product.Variants.forEach(variant => {
      if (variant.size && variant.isAvailable) {
        if (!selectedColor || variant.color?.name?.value === selectedColor) {
          uniqueSizes.set(variant.size.value, variant.size);
        }
      }
    });
    return Array.from(uniqueSizes.values());
  };
  
   const getVariantPrice = (product: any, color?: string, size?: string) => {
    if (!product.include_color && !product.include_size) {
      return product.basePrice || 120;
    }
    
    const variant = product.Variants.find(v => 
      (!color || v.color?.name?.value === color) &&
      (!size || v.size?.value === size)
    );
    
    return variant?.price || 0;
  };
  
   const getVariantStock = (product: any, color?: string, size?: string) => {
    const variant = product.Variants.find(v => 
      (!color || v.color?.name?.value === color) &&
      (!size || v.size?.value === size)
    );
    
    return variant?.stock || 0;
  };

  const availableColors = useMemo(() => getAvailableColors(product), [product]);
  const availableSizes = useMemo(() => getAvailableSizes(product, selectedColor), [product, selectedColor]);
  console.log("avilableSizes",availableSizes)
  
  const currentPrice = useMemo(() => 
    getVariantPrice(product, selectedColor, selectedSize), 
    [product, selectedColor, selectedSize]
  );
  
  const currentStock = useMemo(() => 
    getVariantStock(product, selectedColor, selectedSize), 
    [product, selectedColor, selectedSize]
  );

  // Initialize selections
  React.useEffect(() => {
    if (availableColors.length > 0 && !selectedColor) {
      setSelectedColor(availableColors[0].value);
    }
  }, [availableColors, selectedColor]);

  React.useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0].value);
    }
  }, [availableSizes, selectedSize]);

  const currentColorData = availableColors.find(color => color.name.value === selectedColor);
  const currentImage = currentColorData?.image || product.images[0]?.url;

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(currentStock, prev + change)));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product._id!, {
        color: selectedColor ? currentColorData : null,
        size: selectedSize ? availableSizes.find(s => s.value === selectedSize) : null,
        price: currentPrice
      }, quantity);
    }
  };
 
 console.log("product ",product)

  const isInStock = currentStock > 0;
  const canAddToCart = isInStock && 
    (!product.include_color || selectedColor) && 
    (!product.include_size || selectedSize);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={currentImage}
            alt={`${product.name} ${currentColorData?.name || ''}`}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
          <p className="text-2xl font-bold text-primary mt-2">
            ${currentPrice.toFixed(2)}
            {product.size_based_pricing && product.basePrice || 120 !== currentPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${product?.basePrice?.toFixed(2)}
              </span>
            )}
          </p>
          <p className="text-muted-foreground mt-2">{product.description}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Stock: {currentStock} available
          </p>
        </div>

        {/* Color Selection */}
        {product.include_color && availableColors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Color: {currentColorData?.name?.label}</h4>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color.name.value}
                  onClick={() => setSelectedColor(color.name.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name.value
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: color.name.value }}
                  title={color.name.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.include_size && availableSizes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Size</h4>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                    selectedSize === size.value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        {isInStock && (
          <div className="space-y-3">
            <h4 className="font-medium">Quantity</h4>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <MinusOutlined className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= currentStock}
                className="h-8 w-8"
              >
                <PlusOutlined  className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button 
          className="w-full mt-6" 
          size="lg"
          onClick={handleAddToCart}
          disabled={!canAddToCart}
        >
          {!isInStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        {/* Product Tags */}
      
      </CardContent>
    </Card>
  );
};

export default FashionCard;