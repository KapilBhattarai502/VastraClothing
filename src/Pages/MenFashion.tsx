import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FashionCard from "../components/Fashioncard";
import CircleProgress from "../components/CircularProgress";
import { useSearchParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Pagination } from "antd";
import { useGetMenFashion } from "../hooks/Get/useGetMenFashion";

const MenFashion = () => {
  // State for page number
  const [currentPage, setCurrentPage] = useState(1);

  // Call useGetMenFashion with the current page number
  const { isLoading, data } = useGetMenFashion({ pageNumber: currentPage });

  const [sortBy, setSortBy] = React.useState("bestMatch");
  const [searchParams, setSearchParams] = useSearchParams();
  const colorValue = searchParams.get("colors");
  const priceValue = searchParams.get("Price");

  const filterColors = ["blue", "green", "beige", "black"];
  useEffect(()=>{
    window.scrollTo(0,0);
  },[currentPage])

  const handleChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (e: any) => {
    if (e.target.checked) {
      searchParams.set("colors", e.target.value);
    } else {
      searchParams.delete("colors");
    }
    setSearchParams(searchParams);
  };

  const handleFilterPriceChange = (e) => {
    if (e.target.checked) {
      searchParams.set("Price", e.target.value);
    } else {
      searchParams.delete("Price");
    }
    setSearchParams(searchParams);
  };

  const getSortedData = (data: any) => {
    if (sortBy === "asc") {
      return [...data].sort((a, b) => a.price - b.price); // Ascending
    } else if (sortBy === "desc") {
      return [...data].sort((a, b) => b.price - a.price); // Descending
    }
    return data; // No sorting for "Best Match"
  };

  const sortedData = getSortedData(data?.content);

  // Handle page change for Pagination component
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-18">
      <div className="h-[40rem]">
        <img
          src="https://images.unsplash.com/photo-1676145643391-82c6ba5a4ed3?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="px-10 py-12">
        <div className=" grid grid-cols-4 gap-4">
          {/* Filter Component */}
          <div>
            <div className="flex justify-between items-center">
              <h4 className="mb-2">Filter by</h4>
              <FilterListIcon />
            </div>

            <hr />
            {/* Color Filter */}
            <Disclosure as="div" className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Color</span>
                  <span className="ml-6 flex items-center">
                    <AddIcon
                      aria-hidden="true"
                      className="h-5 w-5 group-data-[open]:hidden"
                    />
                    <RemoveIcon
                      aria-hidden="true"
                      className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                    />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {filterColors?.map((color, index) => (
                    <div key={index}>
                      <input
                        id={color}
                        type="checkbox"
                        className="mr-2"
                        value={color}
                        onChange={handleFilterChange}
                      />
                      <label htmlFor={color}>{color}</label>
                      <br />
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </Disclosure>

            {/* Price Filter */}
            <Disclosure as="div" className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Price</span>
                  <span className="ml-6 flex items-center">
                    <AddIcon
                      aria-hidden="true"
                      className="h-5 w-5 group-data-[open]:hidden"
                    />
                    <RemoveIcon
                      aria-hidden="true"
                      className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                    />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {/* Price Options */}
                  {/* Add checkboxes here */}
                </div>
              </DisclosurePanel>
            </Disclosure>
          </div>

          {/* Products and Pagination */}
          <div className="col-span-3">
            <div className="flex flex-row-reverse">
              <div className="w-[12rem]">
                <FormControl fullWidth>
                  <InputLabel id="sort-by-label">Sort by</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sort-by-select"
                    value={sortBy}
                    label="SortBy"
                    onChange={handleChange}
                  >
                    <MenuItem value="bestMatch">Best Match</MenuItem>
                    <MenuItem value="asc">Price (low to high)</MenuItem>
                    <MenuItem value="desc">Price (high to low)</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-2 gap-1">
              {!isLoading ? (
                sortedData?.map((product: any) => (
                  <FashionCard key={product._id} product={product} />
                ))
              ) : (
                <div className="flex justify-center">
                  <CircleProgress />
                </div>
              )}
            </div>
            <div className="mt-20">
              <Pagination
                align="center"
                current={currentPage}
                total={data?.totalPages * 10}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenFashion;


