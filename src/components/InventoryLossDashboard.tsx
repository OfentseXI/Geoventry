import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InventoryLossDashboardProps {
  selectedDisaster: string;
  accountingMode: boolean;
}

const InventoryLossDashboard: React.FC<InventoryLossDashboardProps> = ({
  selectedDisaster,
  accountingMode,
}) => {
  // Mock data for the inventory loss table
  const inventoryData = [
    {
      erfNumber: "ERF-12345",
      disasterType: "Wildfire",
      eventDate: "2024-03-15",
      commodityType: "Maize",
      quantityBefore: 1250,
      currentQuantity: 550,
      valueBefore: 5625000,
      currentValue: 2475000,
      unit: "tons",
    },
    {
      erfNumber: "ERF-67890",
      disasterType: "Flood",
      eventDate: "2024-01-22",
      commodityType: "Cattle",
      quantityBefore: 150,
      currentQuantity: 82,
      valueBefore: 2700000,
      currentValue: 1476000,
      unit: "head",
    },
    {
      erfNumber: "ERF-54321",
      disasterType: "Drought",
      eventDate: "2024-02-10",
      commodityType: "Wheat",
      quantityBefore: 800,
      currentQuantity: 320,
      valueBefore: 4960000,
      currentValue: 1984000,
      unit: "tons",
    },
    {
      erfNumber: "ERF-98765",
      disasterType: "Windstorm",
      eventDate: "2024-04-05",
      commodityType: "Excavators",
      quantityBefore: 8,
      currentQuantity: 5,
      valueBefore: 24000000,
      currentValue: 15000000,
      unit: "units",
    },
  ];

  const calculateLossPercentage = (before: number, current: number) => {
    return Math.round(((before - current) / before) * 100);
  };

  const getSeverityBadge = (lossPercentage: number) => {
    if (lossPercentage >= 70)
      return <Badge variant="destructive">Critical</Badge>;
    if (lossPercentage >= 40)
      return <Badge className="bg-orange-600">Moderate</Badge>;
    return <Badge className="bg-green-600">Minor</Badge>;
  };

  const formatCurrency = (amount: number) => {
    if (accountingMode) {
      return `R ${amount.toLocaleString()}.00`;
    }
    return `R ${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>📊</span>
          <span>Inventory Loss Dashboard</span>
        </CardTitle>
        <div className="mt-2 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-sm text-blue-400 flex items-center space-x-2">
            <span>🛡️</span>
            <span>
              Financial Compliance of Geoventory data is audited by AEGLai
              (Auditive Engine Generative Ledger Artificial Intelligence).
            </span>
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Erf Number</TableHead>
                <TableHead className="text-slate-300">Disaster Type</TableHead>
                <TableHead className="text-slate-300">Event Date</TableHead>
                <TableHead className="text-slate-300">Commodity</TableHead>
                <TableHead className="text-slate-300">Before</TableHead>
                <TableHead className="text-slate-300">Current</TableHead>
                <TableHead className="text-slate-300">Loss %</TableHead>
                <TableHead className="text-slate-300">Value Before</TableHead>
                <TableHead className="text-slate-300">Current Value</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item, index) => {
                const lossPercentage = calculateLossPercentage(
                  item.quantityBefore,
                  item.currentQuantity
                );
                return (
                  <TableRow
                    key={index}
                    className="border-slate-700 hover:bg-slate-700/50"
                  >
                    <TableCell className="font-mono text-emerald-400">
                      {item.erfNumber}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>
                          {item.disasterType === "Wildfire" && "🔥"}
                          {item.disasterType === "Flood" && "🌊"}
                          {item.disasterType === "Drought" && "🌵"}
                          {item.disasterType === "Windstorm" && "💨"}
                        </span>
                        <span>{item.disasterType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400">
                      {item.eventDate}
                    </TableCell>
                    <TableCell>{item.commodityType}</TableCell>
                    <TableCell className="text-green-400">
                      {item.quantityBefore.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell className="text-orange-400">
                      {item.currentQuantity.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400 font-bold">
                          -{lossPercentage}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-green-400">
                      {formatCurrency(item.valueBefore)}
                    </TableCell>
                    <TableCell className="text-orange-400">
                      {formatCurrency(item.currentValue)}
                    </TableCell>
                    <TableCell>{getSeverityBadge(lossPercentage)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Total Events
            </p>
            <p className="text-2xl font-bold text-emerald-400">
              {inventoryData.length}
            </p>
          </div>
          <div className="p-4 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Avg Loss %
            </p>
            <p className="text-2xl font-bold text-red-400">
              {Math.round(
                inventoryData.reduce(
                  (acc, item) =>
                    acc +
                    calculateLossPercentage(
                      item.quantityBefore,
                      item.currentQuantity
                    ),
                  0
                ) / inventoryData.length
              )}
              %
            </p>
          </div>
          <div className="p-4 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Total Value Loss
            </p>
            <p className="text-2xl font-bold text-red-400">
              {formatCurrency(
                inventoryData.reduce(
                  (acc, item) => acc + (item.valueBefore - item.currentValue),
                  0
                )
              )}
            </p>
          </div>
          <div className="p-4 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Insurance Claims
            </p>
            <p className="text-2xl font-bold text-blue-400">
              {
                inventoryData.filter(
                  (item) =>
                    calculateLossPercentage(
                      item.quantityBefore,
                      item.currentQuantity
                    ) >= 40
                ).length
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryLossDashboard;
