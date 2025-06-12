import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import FilterSidebar from './components/FilterSidebar';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import ProductCard from './components/ProductCard';
import { Card } from '../../components/ui/card';
import { useGetProduct } from '../../hooks/Get/useGetProduct';
import { OutletWrapper } from '../../components/commonStyle/wrapper/OutletWrapper';
import { useGetPujaType } from '../../hooks/Get/useGetPujaType';
import { useGetPujaSubType } from '../../hooks/Get/useGetPujaSubType';
import { Pagination, Spin } from 'antd';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data:products } = useGetProduct({pageNumber:currentPage,search:searchQuery,type:selectedType,sub_type:selectedSubType});
  const {data:uniqueTypes}= useGetPujaType()
  const {data:uniqueSubTypes}=useGetPujaSubType()


    const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });

  },[searchQuery,selectedType,selectedSubType])
  
 

  return (
    <OutletWrapper>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar
              uniqueTypes={uniqueTypes}
              uniqueSubTypes={uniqueSubTypes}
              selectedType={selectedType}
              selectedSubType={selectedSubType}
              onTypeChange={setSelectedType}
              onSubTypeChange={setSelectedSubType}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Products ({products?.content?.length})
                </h2>
                {(selectedType !== 'all' || selectedSubType !== 'all' || searchQuery) && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Search: "{searchQuery}"
                      </Badge>
                    )}
                    {selectedType !== 'all' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Type: {selectedType}
                      </Badge>
                    )}
                    {selectedSubType !== 'all' && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Subtype: {selectedSubType}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedType("");
                        setSelectedSubType("");
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ?  <div className="p-12 text-center"><Spin size="small" /></div> : products?.content?.length > 0 && !isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.content?.map((product:any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('');
                    setSelectedSubType('');
                  }}
                >
                  Clear filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
           <div className="mt-20">
             <Pagination                 align="center"
                 current={currentPage}
                 total={products?.totalPages * 10}
                 onChange={handlePageChange}
               />           
                </div>
    </OutletWrapper>
  );
};

export default Store;






















