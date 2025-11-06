import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LossAdjustmentPanelProps {
  erfNumber: string;
  originalQuantityLoss: number;
  originalValueLoss: number;
  commodity: string;
  unit: string;
}

const LossAdjustmentPanel: React.FC<LossAdjustmentPanelProps> = ({
  erfNumber,
  originalQuantityLoss,
  originalValueLoss,
  commodity,
  unit,
}) => {
  const [verifiedQuantityLoss, setVerifiedQuantityLoss] =
    useState(originalQuantityLoss);
  const [verifiedValueLoss, setVerifiedValueLoss] = useState(originalValueLoss);
  const [assessmentComments, setAssessmentComments] = useState("");
  const [adjustmentStatus, setAdjustmentStatus] = useState("Pending");
  const [damageConsistent, setDamageConsistent] = useState(true);
  const [adjusterName, setAdjusterName] = useState("");

  const handleSubmitReview = () => {
    if (!adjusterName.trim()) {
      toast.error("Please enter adjuster name");
      return;
    }

    if (!assessmentComments.trim()) {
      toast.error("Please add assessment comments");
      return;
    }

    toast.success("Loss adjustment review submitted successfully!");
    // In real app, this would save to database and notify insurers
  };

  const handleGenerateReport = () => {
    toast.success("Adjustment Report PDF generated successfully!");
    // In real app, this would generate actual PDF
  };

  const statusColor = {
    Pending: "bg-orange-600",
    Approved: "bg-green-600",
    Rejected: "bg-red-600",
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-emerald-400 flex items-center space-x-2">
            <span>🔍</span>
            <span>Loss Adjustment Panel</span>
          </CardTitle>
          <Badge
            className={
              statusColor[adjustmentStatus as keyof typeof statusColor]
            }
          >
            {adjustmentStatus}
          </Badge>
        </div>
        <div className="text-sm text-slate-400">
          ERF: {erfNumber} | Commodity: {commodity}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comparison Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-700 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">
              Original EO Data
            </h4>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-slate-400">Quantity Loss:</span>
                <span className="text-orange-400 ml-2">
                  {originalQuantityLoss.toLocaleString()} {unit}
                </span>
              </p>
              <p className="text-sm">
                <span className="text-slate-400">Value Loss:</span>
                <span className="text-red-400 ml-2">
                  R {originalValueLoss.toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-700 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">
              Verified by Adjuster
            </h4>
            <div className="space-y-3">
              <div>
                <Label
                  htmlFor="verified-quantity"
                  className="text-xs text-slate-400"
                >
                  Verified Quantity Loss
                </Label>
                <Input
                  id="verified-quantity"
                  type="number"
                  value={verifiedQuantityLoss}
                  onChange={(e) =>
                    setVerifiedQuantityLoss(Number(e.target.value))
                  }
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>
              <div>
                <Label
                  htmlFor="verified-value"
                  className="text-xs text-slate-400"
                >
                  Verified Value Loss (ZAR)
                </Label>
                <Input
                  id="verified-value"
                  type="number"
                  value={verifiedValueLoss}
                  onChange={(e) => setVerifiedValueLoss(Number(e.target.value))}
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Damage Consistency Check */}
        <div className="p-4 bg-slate-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <Switch
              id="damage-consistent"
              checked={damageConsistent}
              onCheckedChange={setDamageConsistent}
            />
            <Label
              htmlFor="damage-consistent"
              className="text-sm text-slate-300"
            >
              Damage Consistent with EO Data?
            </Label>
            <Badge variant={damageConsistent ? "default" : "destructive"}>
              {damageConsistent ? "Yes" : "No"}
            </Badge>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="adjuster-name" className="text-sm text-slate-300">
              Loss Adjuster Name
            </Label>
            <Input
              id="adjuster-name"
              value={adjusterName}
              onChange={(e) => setAdjusterName(e.target.value)}
              placeholder="Enter your full name"
              className="bg-slate-600 border-slate-500 text-white"
            />
          </div>

          <div>
            <Label
              htmlFor="assessment-comments"
              className="text-sm text-slate-300"
            >
              Assessment Comments
            </Label>
            <Textarea
              id="assessment-comments"
              value={assessmentComments}
              onChange={(e) => setAssessmentComments(e.target.value)}
              placeholder="Enter detailed assessment notes, methodology, and observations..."
              rows={4}
              className="bg-slate-600 border-slate-500 text-white"
            />
          </div>

          <div>
            <Label
              htmlFor="adjustment-status"
              className="text-sm text-slate-300"
            >
              Adjustment Status
            </Label>
            <Select
              value={adjustmentStatus}
              onValueChange={setAdjustmentStatus}
            >
              <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSubmitReview}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            Submit Review
          </Button>
          <Button
            onClick={handleGenerateReport}
            variant="outline"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Generate Report PDF
          </Button>
        </div>

        {/* Compliance Statement */}
        <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
          <p className="text-xs text-blue-400">
            💼 Loss validated and adjusted under the oversight of AEGLai AI and
            Tsoga Afrika Insurance Brokers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LossAdjustmentPanel;
