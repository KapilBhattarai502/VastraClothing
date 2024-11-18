import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Typography } from "antd";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,

} from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";


const Header = () => {
  const navigate = useNavigate();

  const [isuser, setisUser] = useState<string | null>(() => {
    return localStorage.getItem("currentUser");
  });
  const [data, setData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      setisUser(null);
      navigate("/");
    
  };

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
        <div className="flex gap-3 cursor-pointer items-center">
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
          </div>
          {isuser ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32,backgroundColor:"#333" }}>{isuser?.split("")[0]}</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <div onClick={handleLogout}>
                  Logout
                  </div>
                </MenuItem>
              </Menu>
            </>
          ) : (
            // <LoginIcon
            //   sx={{ fontSize: "2rem", color: "#333" }}
            //   onClick={() => navigate("/login")}
            // />
            <Typography
              
              onClick={() => navigate("/login")}
              className="py-2 text-lg font-semibold"
            >
              LogIn
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
