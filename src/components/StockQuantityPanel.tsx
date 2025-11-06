import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StockQuantityPanelProps {
  disaster: string;
  commodity: string;
  accountingMode: boolean;
}

const StockQuantityPanel: React.FC<StockQuantityPanelProps> = ({
  disaster,
  commodity,
  accountingMode,
}) => {
  // Mock data - in real app would come from satellite analysis
  const stockData = {
    beforeDisaster: 1250,
    currentQuantity: 550,
    unit: commodity === "cattle" ? "head" : "tons",
  };

  const lossPercentage = Math.round(
    ((stockData.beforeDisaster - stockData.currentQuantity) /
      stockData.beforeDisaster) *
      100
  );
  const lossQuantity = stockData.beforeDisaster - stockData.currentQuantity;

  const getSeverityBadge = (loss: number) => {
    if (loss >= 70) return <Badge variant="destructive">Critical Loss</Badge>;
    if (loss >= 40)
      return <Badge className="bg-orange-600">Moderate Loss</Badge>;
    return <Badge className="bg-green-600">Minimal Loss</Badge>;
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span>📊</span>
            <span>Stock Quantity</span>
          </span>
          {getSeverityBadge(lossPercentage)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-3 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Before Disaster
            </p>
            <p className="text-2xl font-bold text-green-400">
              {stockData.beforeDisaster.toLocaleString()} {stockData.unit}
            </p>
            <p className="text-xs text-slate-400">Baseline measurement</p>
          </div>

          <div className="p-3 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Current Quantity
            </p>
            <p className="text-2xl font-bold text-orange-400">
              {stockData.currentQuantity.toLocaleString()} {stockData.unit}
            </p>
            <p className="text-xs text-slate-400">From satellite scan</p>
          </div>

          <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-xs text-red-400 uppercase tracking-wide">
              Total Loss
            </p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-red-400">
                {lossQuantity.toLocaleString()} {stockData.unit}
              </p>
              <p className="text-xl font-bold text-red-400">
                -{lossPercentage}%
              </p>
            </div>
            <p className="text-xs text-red-400">
              Calculated loss due to {disaster}
            </p>
          </div>
        </div>

        {accountingMode && (
          <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
            <p className="text-xs text-blue-400 uppercase tracking-wide">
              Accounting Classification
            </p>
            <p className="text-sm text-blue-400">
              Extraordinary Loss - Natural Disaster
            </p>
            <p className="text-xs text-slate-400">
              IFRS compliant classification
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockQuantityPanel;
