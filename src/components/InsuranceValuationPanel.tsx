import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InsuranceValuationPanelProps {
  disaster: string;
  commodity: string;
  accountingMode: boolean;
}

const InsuranceValuationPanel: React.FC<InsuranceValuationPanelProps> = ({
  disaster,
  commodity,
  accountingMode,
}) => {
  // Mock market rates (ZAR per ton/head)
  const marketRates = {
    maize: 4500,
    wheat: 6200,
    cattle: 18000,
    soybeans: 8900,
    sunflower: 7800,
  };

  const lossQuantity = 700; // From stock calculation
  const marketRate = marketRates[commodity as keyof typeof marketRates] || 5000;
  const estimatedLoss = lossQuantity * marketRate;
  const payoutTrigger = estimatedLoss > 500000; // ZAR 500k threshold

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>💰</span>
          <span>Insurance Valuation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-3 bg-slate-700 rounded-lg">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Market Rate
            </p>
            <p className="text-lg font-bold text-blue-400">
              R {marketRate.toLocaleString()} per{" "}
              {commodity === "cattle" ? "head" : "ton"}
            </p>
            <p className="text-xs text-slate-400">Current commodity price</p>
          </div>

          <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-xs text-red-400 uppercase tracking-wide">
              Estimated Loss Value
            </p>
            <p className="text-2xl font-bold text-red-400">
              R {estimatedLoss.toLocaleString()}
            </p>
            <p className="text-xs text-red-400">
              Based on {lossQuantity} {commodity === "cattle" ? "head" : "tons"}{" "}
              lost
            </p>
          </div>

          <div className="p-3 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Payout Trigger
              </p>
              {payoutTrigger ? (
                <Badge className="bg-green-600">TRIGGERED</Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-red-600 text-red-400"
                >
                  NOT TRIGGERED
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-300">
              Threshold: R 500,000 | Current: R {estimatedLoss.toLocaleString()}
            </p>
          </div>
        </div>

        {accountingMode && (
          <div className="space-y-3">
            <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
              <p className="text-xs text-blue-400 uppercase tracking-wide">
                Financial Statement Impact
              </p>
              <div className="space-y-1 text-sm text-blue-400">
                <p>• Asset Impairment: R {estimatedLoss.toLocaleString()}</p>
                <p>
                  • Insurance Receivable: R{" "}
                  {payoutTrigger ? estimatedLoss.toLocaleString() : "0"}
                </p>
                <p>
                  • Net P&L Impact: R{" "}
                  {payoutTrigger ? "0" : estimatedLoss.toLocaleString()}
                </p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Export to AEGL.ai
            </Button>
          </div>
        )}

        {payoutTrigger && (
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Initiate Insurance Claim
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceValuationPanel;
