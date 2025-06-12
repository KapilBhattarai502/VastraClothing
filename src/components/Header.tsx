import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Button } from './ui/button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useGetUserCart } from '../hooks/Get/useGetUserCart';




const Header = () => {
  const [isUser, setisUser] = useState<string | null>(() => {
    return localStorage.getItem("currentUser");
  });
  const {data:userCart}=useGetUserCart()
 
  const pujaCategories = [
    { name: 'Bratabandha', href: `/vaidik/functions?category=bratabandha` },
    { name: 'Bihe', href: '/vaidik/functions?category=bihe' },
    { name: 'Saptaha', href: '/vaidik/functions?category=saptaha' },
  ];
const navigate=useNavigate()
const handleLogOut = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  // setisUser(null);
  navigate("/");
};
  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Navigation */}
          <div className="flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>    
             <NavigationMenuItem>
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600" onClick={()=>navigate("/vaidik/store")}>
                    Our Store
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 bg-transparent hover:bg-gray-100">
                  Packages
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border shadow-lg">
                    <div className="w-48 p-2">
                      {pujaCategories.map((category) => (
                        <div key={category.name} className="p-2">
                          <a 
                            href={category.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                          >
                            {category.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Center Brand Name */}
          <div className="flex-1 flex justify-center cursor-pointer" onClick={()=>navigate("/vaidik/landingpage")}>
            <h1 className="text-2xl font-bold text-gray-900">Vaidik Suppliers</h1>
          </div>

          {/* Right User Options */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={()=>navigate("/vaidik/cart")}>
              <ShoppingCartIcon className="h-6 w-6 text-gray-700"  />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
               {userCart?.data?.cartItems?.length}
              </span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <FavoriteIcon className="h-6 w-6 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
              </span>
            </Button>

            {/* User Dropdown */}
            { isUser ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-blue-600">
                  <PersonIcon className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
                  <PersonIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100" onClick={()=>navigate("/vaidik/user/orders")} >
                  <ShoppingCartIcon className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-red-600" onClick={handleLogOut}>
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>:<span>LogIn</span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
