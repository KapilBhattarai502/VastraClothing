import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';



interface FilterSidebarProps {
  uniqueTypes: string[]|any;
  uniqueSubTypes: string[]|any;
  selectedType: string;
  selectedSubType: string;
  onTypeChange: (type: string) => void;
  onSubTypeChange: (subType: string) => void;
}

const FilterSidebar = ({
  uniqueTypes,
  uniqueSubTypes,
  selectedType,
  selectedSubType,
  onTypeChange,
  onSubTypeChange,
}: FilterSidebarProps) => {
  return (
    <Card className="sticky top-24 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">Filters</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Product Type Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Product Type</h3>
          <div className="space-y-2">
            <Button
              variant={selectedType ? 'ghost' : 'default'}
              className="w-full justify-start text-sm"
              onClick={() => onTypeChange('')}
            >
              All Types
            </Button>
            {uniqueTypes?.map((type:any) => (
              <Button
                key={type?.value}
                variant={selectedType === type?.value ? 'default' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => onTypeChange(type?.value)}
              >
                {type?.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Product SubType Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Sub Category</h3>
          <div className="space-y-2">
            <Button
              variant={selectedSubType ? 'ghost' : 'default'}
              className="w-full justify-start text-sm"
              onClick={() => onSubTypeChange('')}
            >
              All Categories
            </Button>
            {uniqueSubTypes?.map((subType) => (
              <Button
                key={subType?.value}
                variant={selectedSubType === subType?.value ? 'default' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => onSubTypeChange(subType?.value)}
              >
                {subType?.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Clear Filters */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            onTypeChange('all');
            onSubTypeChange('all');
          }}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;