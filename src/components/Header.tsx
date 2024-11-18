import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isuser,setisUser]=useState<string|null>(()=>{
    return localStorage.getItem('currentUser');
  })
  
  
 


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setisUser(null);
        navigate("/");
     
    }
  };

//   const handleProductSelect = (event, value) => {
//     if (value && value._id) {
//       navigate(`/product/page/${value._id}`);
//     }
//   };

  return (
    <>
      <div className="flex justify-between py-3 items-center px-5 fixed top-0 left-0 w-full bg-white z-50">
        <div className="flex gap-5 cursor-pointer">
          <h4 onClick={() => navigate("/clothes/men")}>Men</h4>
          <h4 onClick={() => navigate("/clothes/women")}>Women</h4>
        </div>
        <div>
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Vastra
          </h1>
        </div>
        <div className="flex gap-3 cursor-pointer">
          <div className="">
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                freeSolo
                id="product-search"
                disableClearable
                options={data}
                getOptionLabel={(option) => option.title || ""}
                // onChange={handleProductSelect} // Trigger navigation on selection
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    variant="standard"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: 0, // Remove internal padding
                        backgroundColor: "#f1f1f1",
                      },
                      "& .MuiInputBase-input": {
                        padding: "0", // Adjust inner padding to your preference
                      },
                      "& .MuiAutocomplete-inputRoot": {
                        padding: 0, // Ensures no extra padding in the root
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </div>

          <FavoriteIcon sx={{ fontSize: "2rem", color: "#333" }} />
          <div className="relative cursor-pointer">
            <ShoppingCartIcon
              sx={{ fontSize: "2rem", color: "#333" }}
              onClick={() => navigate("/clothes/cart")}
            />
            {/* {isAuthenticated && (
              <div className="h-5 w-5 rounded-full bg-orange-500 absolute -top-2 right-0 border border-white left-4">
                <p className="text-white font-bold text-sm text-center">
                  {cartItem?.length}
                </p>
              </div>
            )} */}
          </div>
          {isuser ? (
            // <LogoutIcon
            //   sx={{ fontSize: "2rem", color: "#333" }}
            //   onClick={handleLogout}
            // />
            <Button type="primary" onClick={handleLogout} danger className="py-2">LogOut</Button>

          ) : (
            // <LoginIcon
            //   sx={{ fontSize: "2rem", color: "#333" }}
            //   onClick={() => navigate("/login")}
            // />
            <Button type="primary" onClick={() => navigate("/login")} className="py-2">LogIn</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;