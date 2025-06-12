import React, { useEffect, useState } from "react";
import { Download, ShoppingCart } from "lucide-react";
import ProductCard from "./components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { Input, message } from "antd";
import type { GetProps } from "antd";
import { useGetFashionItems } from "../../hooks/Get/useGetFashionItems";
import { useAddCart } from "../../hooks/Post/useAddCart";
import { checkLogin } from "../../Config/checkLogin";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

interface Product {
  _id: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  description: string;
  pujaName: string[];
  puja_quantity: string;
  unit: any;
  pujaQuantities: any;
}

interface ProductQuantity {
  [productId: string | number]: number;
}

const FunctionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [params] = useSearchParams();
  const category: any = params.get("category");
  const [selectedProducts, setSelectedProducts] = useState<
    Set<string | unknown>
  >(new Set());
  const [quantities, setQuantities] = useState<any>({});
  const [sizes, setSizes] = useState<any>({});
  const [colors, setColors] = useState<any>({});

  const { data: Products } = useGetFashionItems(category);
  const { mutate: addToCart } = useAddCart();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  // Initialize selected products with default package items and default quantities

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);
  React.useEffect(() => {
    // Only run this effect if we have a valid category
    if (category) {
      const defaultSelected = new Set(
        Products?.filter((product: any) => product?.pujaQuantities)?.map(
          (product: any) => product._id
        )
      );
      setSelectedProducts(defaultSelected);

      // Initialize quantities for default selected items
      const defaultQuantities: any = {};
      const defaultSizes:any = {};
      const defaultColors:any={};

      Products?.forEach((product: any) => {
        if (product && product.pujaQuantities) {
          // Access the quantity for the current category
          defaultQuantities[product._id] = product.pujaQuantities[category];
        }
        if (product?.include_size && product?.include_color){
          defaultSizes[product._id] = product?.availableSizes[0];
          defaultColors[product._id]= product?.availableColors[0];

        }
        else if(product?.include_size){
          defaultSizes[product._id] = product?.availableSizes[0];
          

        }
        else if(product?.include_color){
          defaultColors[product._id] = product?.availableColors[0];

        }
      });
      setQuantities(defaultQuantities);
      setSizes(defaultSizes)
      setColors(defaultColors)
      

      

     
    }
  }, [Products, category]); // Make sure category is in the dependency array

  const filteredProducts = Products?.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.pujaName[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleProduct = (product: Product) => {
    const newSelected = new Set(selectedProducts);
    const newQuantities = { ...quantities };

    if (newSelected.has(product?._id)) {
      newSelected.delete(product?._id);
      delete newQuantities[product?._id];
    } else {
      newSelected.add(product?._id);
      newQuantities[product?._id] = product?.pujaQuantities[category];
    }

    setSelectedProducts(newSelected);
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [productId]: quantity,
    }));
  };
  const handleSizeChange = (productId: string, size: string) => {
    setSizes((prev: any) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleColorChange = (productId: string, color: string) => {
    setColors((prev: any) => ({
      ...prev,
      [productId]: color,
    }));
  };


  const selectedProductsList = Products?.filter((product: any) =>
    selectedProducts.has(product._id)
  );

  const totalPrice = selectedProductsList?.reduce((sum:any, product:any) => {
    const quantity = quantities[product._id] || 1;
    const price = Number(product?.size_based_pricing
    ? product?.size_price?.find((s:any) => s.size === sizes[product?._id])?.price
     : product?.price)
    return sum +price * quantity;
  }, 0);

  const totalItems = Object.values(quantities).reduce(
    (sum:any, quantity) => sum + Number(quantity),
    0
  );

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here");
  };

  const handleAddToCart = () => {
    const packageProducts = Object.entries(quantities).map(
      ([productId, quantity]) => ({
        productId,
        quantity: Number(quantity),
      
      })
      
    );

    try {
      packageProducts?.map((product) =>
        addToCart({
          productId: product?.productId,
          quantity: product?.quantity,
          size:sizes[product?.productId],
          color:colors[product?.productId]
          
        })
      );
      message.success(`Added your ${category} items to cart `);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 capitalize">
              {params?.get("category")} Package
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 capitalize">
              Everything you need for your perfect {params?.get("category")} day
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 bg-white text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span className="capitalize">
                  Download {params?.get("category")} Guide
                </span>
              </button>

              <div className="text-lg">
                <span className="opacity-75">Package Total: </span>
                <span className="font-bold text-2xl">Rs {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Summary Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 ">
          <Search
            className="max-w-sm"
            placeholder={`Search ${params.get("category")} product`}
            allowClear
            size="large"
            onSearch={onSearch}
          />

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-sm text-gray-600 ">
              Selected Items: {totalItems}
            </div>
            <div className="font-bold text-rose-600">
              Total: Rs {totalPrice}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        {selectedProducts.size > 0 && (
          <div className="mb-8 text-center">
            <button
              onClick={handleAddToCart}
              className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add All to Cart ({totalItems} items)</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
              onToggleProduct={handleToggleProduct}
              onSizeChange={handleSizeChange}
              onColorChange={handleColorChange}
              onQuantityChange={handleQuantityChange}
              isInPackage={selectedProducts.has(product._id)}
              quantity={quantities[product._id] || 1}
              size={sizes[product?._id]}
              color={colors[product?._id]}
              category={category}
            />
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">
              No products found matching your search.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionPage;
