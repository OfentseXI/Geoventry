import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommoditySelectorProps {
  selectedCommodity: string;
  onCommodityChange: (commodity: string) => void;
}

const CommoditySelector: React.FC<CommoditySelectorProps> = ({
  selectedCommodity,
  onCommodityChange,
}) => {
  const commodityCategories = {
    agriculture: [
      { id: "maize", name: "Maize", icon: "🌽", unit: "tons" },
      { id: "wheat", name: "Wheat", icon: "🌾", unit: "tons" },
      { id: "cattle", name: "Cattle", icon: "🐄", unit: "head" },
      { id: "soybeans", name: "Soybeans", icon: "🫘", unit: "tons" },
      { id: "sunflower", name: "Sunflower", icon: "🌻", unit: "tons" },
    ],
    plant: [
      { id: "trucks", name: "Trucks", icon: "🚛", unit: "units" },
      { id: "excavators", name: "Excavators", icon: "🚜", unit: "units" },
      { id: "bulldozers", name: "Bulldozers", icon: "🚧", unit: "units" },
      { id: "cranes", name: "Cranes", icon: "🏗️", unit: "units" },
      {
        id: "concrete_mixers",
        name: "Concrete Mixers",
        icon: "🚚",
        unit: "units",
      },
      { id: "forklifts", name: "Forklifts", icon: "🚲", unit: "units" },
      {
        id: "backhoe_loaders",
        name: "Backhoe Loaders",
        icon: "🚜",
        unit: "units",
      },
      { id: "tractors", name: "Tractors", icon: "🚜", unit: "units" },
      { id: "compactors", name: "Compactors", icon: "🚧", unit: "units" },
      { id: "generators", name: "Generators", icon: "⚡", unit: "units" },
      { id: "tower_lights", name: "Tower Lights", icon: "💡", unit: "units" },
    ],
    property: [
      {
        id: "entire_building",
        name: "Entire Building",
        icon: "🏢",
        unit: "units",
      },
      { id: "roof", name: "Roof", icon: "🏠", unit: "units" },
      { id: "structure", name: "Structure", icon: "🏗️", unit: "units" },
      { id: "wet_works", name: "Wet Works", icon: "🚿", unit: "units" },
      { id: "windows", name: "Windows", icon: "🪟", unit: "units" },
    ],
    vehicle: [
      { id: "car_indoor", name: "Car (Indoor)", icon: "🚗", unit: "units" },
      {
        id: "motorcycle_indoor",
        name: "Motorcycle (Indoor)",
        icon: "🏍️",
        unit: "units",
      },
      { id: "van_indoor", name: "Van (Indoor)", icon: "🚐", unit: "units" },
      { id: "truck_indoor", name: "Truck (Indoor)", icon: "🚛", unit: "units" },
    ],
  };

  const allCommodities = [
    ...commodityCategories.agriculture,
    ...commodityCategories.plant,
    ...commodityCategories.property,
    ...commodityCategories.vehicle,
  ];

  const selectedCommodityData = allCommodities.find(
    (c) => c.id === selectedCommodity
  );

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>🏪</span>
          <span>Commodity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={selectedCommodity} onValueChange={onCommodityChange}>
          <SelectTrigger className="w-full bg-slate-700 border-slate-600">
            <SelectValue placeholder="Select commodity" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600 max-h-80 overflow-auto">
            {/* Agriculture */}
            <div className="px-2 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Agriculture
            </div>
            {commodityCategories.agriculture.map((commodity) => (
              <SelectItem
                key={commodity.id}
                value={commodity.id}
                className="hover:bg-slate-600"
              >
                <div className="flex items-center space-x-2">
                  <span>{commodity.icon}</span>
                  <span>{commodity.name}</span>
                  <span className="text-xs text-slate-400">
                    ({commodity.unit})
                  </span>
                </div>
              </SelectItem>
            ))}

            {/* Plant/Construction Equipment */}
            <div className="px-2 py-1 text-xs font-semibold text-blue-400 uppercase tracking-wide mt-2">
              Plant (Construction Equipment)
            </div>
            {commodityCategories.plant.map((commodity) => (
              <SelectItem
                key={commodity.id}
                value={commodity.id}
                className="hover:bg-slate-600"
              >
                <div className="flex items-center space-x-2">
                  <span>{commodity.icon}</span>
                  <span>{commodity.name}</span>
                  <span className="text-xs text-slate-400">
                    ({commodity.unit})
                  </span>
                </div>
              </SelectItem>
            ))}

            {/* Property */}
            <div className="px-2 py-1 text-xs font-semibold text-orange-400 uppercase tracking-wide mt-2">
              Property
            </div>
            {commodityCategories.property.map((commodity) => (
              <SelectItem
                key={commodity.id}
                value={commodity.id}
                className="hover:bg-slate-600"
              >
                <div className="flex items-center space-x-2">
                  <span>{commodity.icon}</span>
                  <span>{commodity.name}</span>
                  <span className="text-xs text-slate-400">
                    ({commodity.unit})
                  </span>
                </div>
              </SelectItem>
            ))}

            {/* Vehicle (Indoor) */}
            <div className="px-2 py-1 text-xs font-semibold text-purple-400 uppercase tracking-wide mt-2">
              Vehicle (Indoors Only)
            </div>
            {commodityCategories.vehicle.map((commodity) => (
              <SelectItem
                key={commodity.id}
                value={commodity.id}
                className="hover:bg-slate-600"
              >
                <div className="flex items-center space-x-2">
                  <span>{commodity.icon}</span>
                  <span>{commodity.name}</span>
                  <span className="text-xs text-slate-400">
                    ({commodity.unit})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCommodityData && (
          <div className="mt-3 p-3 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Unit Type:</span>
              <span className="font-semibold capitalize">
                {selectedCommodityData.unit}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommoditySelector;
