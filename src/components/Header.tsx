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
  console.log("userCart is",userCart)
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
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600" onClick={()=>navigate("/vaidik/kurtha")}>
                    Kurtha
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600" onClick={()=>navigate("/vaidik/store")}>
                    Our Store
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 bg-transparent hover:bg-gray-100">
                    Puja
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



// import React, { useState } from "react";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import { DownOutlined } from '@ant-design/icons';
// import Autocomplete from "@mui/material/Autocomplete";

// import type { MenuProps } from 'antd';
// import { Dropdown, Space } from 'antd';

// import { Typography } from "antd";
// import {
//   Avatar,
//   Box,
//   Divider,
//   IconButton,
//   ListItemIcon,
//   Menu,
//   MenuItem,
//   Tooltip,
// } from "@mui/material";
// import { Logout, PersonAdd, Settings } from "@mui/icons-material";
// import { useGetUserCart } from "../hooks/Get/useGetUserCart";


// const Header = () => {
//   const navigate = useNavigate();
//   const {data:userCart}= useGetUserCart()
//   console.log("userCart",userCart)


//   const [isuser, setisUser] = useState<string | null>(() => {
//     return localStorage.getItem("currentUser");
//   });
//   const [data, setData] = useState([]);

//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("role");
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//     setisUser(null);
//     navigate("/");
//   };
//   const items: MenuProps['items'] = [
//     {
//       key: '1',
//       label: (
//       <span onClick={()=>{navigate(`/vaidik/functions?category=bratabandha`)}}>Bratabanda</span>
        
        
    
//       ),
//     },   {
//       key: '2',
//       label: (
//       <span onClick={()=>{navigate(`/vaidik/functions?category=bihe`)}}>Bihe</span>
        
        
    
//       ),
//     },
//     {
//       key: '3',
//       label: (
//       <span onClick={()=>{navigate(`/vaidik/functions?category=chaurashi`)}}>Chaurashi</span>
        
        
    
//       ),
//     },   {
//       key: '4',
//       label: (
//       <span onClick={()=>{navigate(`/vaidik/functions?category=saptaha`)}}>Saptaha</span>
        
        
    
//       ),
//     },
//     {
//       key: '5',
//       label: (
//       <span>Nwaran</span>
        
        
    
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="flex justify-between py-3 items-center px-5 fixed top-0 left-0 w-full bg-white z-50">
//         <div className="flex gap-5 cursor-pointer items-center">
//           <h4 onClick={() => navigate("/vaidik/kurtha")}>Kurtha</h4>
//           <h4 onClick={()=>navigate("/vaidik/store")}>Our Store</h4>
//           <Dropdown menu={{ items }}>
//           <a onClick={(e) => e.preventDefault()}>
//         <Space className="w-80">
//            Puja
//         <DownOutlined />
//       </Space>
//     </a>
//   </Dropdown>
         
//         </div>
//         <div>
//           <h1
//             className="text-2xl font-bold cursor-pointer "
//             onClick={() => navigate("/vaidik/landingpage")}

//           >
//             <span style={{color:"#FE5D26"}}>Vaidik</span> Suppliers
//           </h1>
//         </div>
//         <div className="flex gap-3 cursor-pointer items-center">
//           <div className="">
//             <Stack spacing={2} sx={{ width: 300 }}>
//               <Autocomplete
//                 freeSolo
//                 id="product-search"
//                 disableClearable
//                 options={data}
//                 getOptionLabel={(option) => option.title || ""}
//                 // onChange={handleProductSelect} // Trigger navigation on selection
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Search"
//                     variant="standard"
//                     slotProps={{
//                       input: {
//                         ...params.InputProps,
//                         type: "search",
//                       },
//                     }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         padding: 0, // Remove internal padding
//                         backgroundColor: "#f1f1f1",
//                       },
//                       "& .MuiInputBase-input": {
//                         padding: "0", // Adjust inner padding to your preference
//                       },
//                       "& .MuiAutocomplete-inputRoot": {
//                         padding: 0, // Ensures no extra padding in the root
//                       },
//                     }}
//                   />
//                 )}
//               />
//             </Stack>
//           </div>

//           <FavoriteIcon sx={{ fontSize: "2rem", color: "#333" }} />
//           <div className="cursor-pointer flex">
            
//             <ShoppingCartIcon
//               sx={{ fontSize: "2rem", color: "#333" }}
//               onClick={() => navigate("/vaidik/cart")}
//               className=""
//             />

//           <p className=" bg-orange-400 text-center rounded-full h-5 w-5 text-sm text-white relative right-3 bottom-3 ">{userCart?.data?.cartItems?.length}</p>
//           </div>
//           {isuser ? (
//             <>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   textAlign: "center",
//                 }}
//               >
//                 <Tooltip title="Account settings">
//                   <IconButton
//                     onClick={handleClick}
//                     size="small"
//                     aria-controls={open ? "account-menu" : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? "true" : undefined}
//                   >
//                     <Avatar
//                       sx={{ width: 32, height: 32, backgroundColor: "#333" }}
//                     >
//                       {isuser?.split("")[0]}
//                     </Avatar>
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//               <Menu
//                 anchorEl={anchorEl}
//                 id="account-menu"
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 slotProps={{
//                   paper: {
//                     elevation: 0,
//                     sx: {
//                       overflow: "visible",
//                       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                       mt: 1.5,
//                       "& .MuiAvatar-root": {
//                         width: 32,
//                         height: 32,
//                         ml: -0.5,
//                         mr: 1,
//                       },
//                       "&::before": {
//                         content: '""',
//                         display: "block",
//                         position: "absolute",
//                         top: 0,
//                         right: 14,
//                         width: 10,
//                         height: 10,
//                         bgcolor: "background.paper",
//                         transform: "translateY(-50%) rotate(45deg)",
//                         zIndex: 0,
//                       },
//                     },
//                   },
//                 }}
//                 transformOrigin={{ horizontal: "right", vertical: "top" }}
//                 anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//               >
//                 <MenuItem onClick={handleClose}>
//                   <Avatar /> Profile
//                 </MenuItem>
//                 <MenuItem onClick={()=>navigate("/vaidik/user/orders")}>
//                   <Avatar /> My Orders
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem onClick={handleClose}>
//                   <ListItemIcon>
//                     <PersonAdd fontSize="small" />
//                   </ListItemIcon>
//                   Add another account
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   <ListItemIcon>
//                     <Settings fontSize="small" />
//                   </ListItemIcon>
//                   Settings
//                 </MenuItem>
//                 <MenuItem onClick={handleClose}>
//                   <ListItemIcon>
//                     <Logout fontSize="small" />
//                   </ListItemIcon>
//                   <div onClick={handleLogout}>Logout</div>
//                 </MenuItem>
//               </Menu>
//             </>
//           ) : (
//             // <LoginIcon
//             //   sx={{ fontSize: "2rem", color: "#333" }}
//             //   onClick={() => navigate("/login")}
//             // />
//             <Typography
//               onClick={() => navigate("/login")}
//               className="py-2 text-lg font-semibold"
//             >
//               LogIn
//             </Typography>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;
