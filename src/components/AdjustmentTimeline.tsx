import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdjustmentTimelineProps {
  erfNumber: string;
  disaster: string;
}

const AdjustmentTimeline: React.FC<AdjustmentTimelineProps> = ({
  erfNumber,
  disaster,
}) => {
  const timelineSteps = [
    {
      id: 1,
      title: "Disaster Detected",
      description: `${
        disaster.charAt(0).toUpperCase() + disaster.slice(1)
      } event identified`,
      timestamp: "2024-03-15 08:30",
      status: "completed",
      icon: "⚡",
    },
    {
      id: 2,
      title: "Auto Analysis Complete",
      description: "Satellite imagery processed and loss calculated",
      timestamp: "2024-03-15 15:45",
      status: "completed",
      icon: "🛰️",
    },
    {
      id: 3,
      title: "Loss Adjuster Review",
      description: "Professional verification in progress",
      timestamp: "2024-03-16 09:00",
      status: "in-progress",
      icon: "🔍",
    },
    {
      id: 4,
      title: "Final Payout Recommendation",
      description: "Insurance claim recommendation pending",
      timestamp: "Pending",
      status: "pending",
      icon: "💰",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "in-progress":
        return "bg-orange-600";
      case "pending":
        return "bg-slate-600";
      default:
        return "bg-slate-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-orange-600">In Progress</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="border-slate-600 text-slate-400">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>📋</span>
          <span>Adjustment Timeline</span>
        </CardTitle>
        <div className="text-sm text-slate-400">ERF: {erfNumber}</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full ${getStatusColor(
                    step.status
                  )} flex items-center justify-center text-sm font-semibold`}
                >
                  {step.icon}
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className="w-0.5 h-12 bg-slate-600 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{step.title}</h4>
                  {getStatusBadge(step.status)}
                </div>
                <p className="text-sm text-slate-400 mb-2">
                  {step.description}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {step.timestamp}
                </p>

                {step.status === "in-progress" && step.id === 3 && (
                  <div className="mt-2 p-2 bg-orange-900/20 border border-orange-800 rounded">
                    <p className="text-xs text-orange-400">
                      ⏰ Review deadline: 5 days from disaster detection
                      (2024-03-20)
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Notification Section */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-400 mb-2">
            📢 Notification Settings
          </h4>
          <div className="space-y-2 text-xs text-blue-300">
            <p>
              • Tsoga Afrika Insurance Brokers will be notified upon Loss
              Adjuster review completion
            </p>
            <p>
              • Automatic reminder sent if review not completed within 5 days
            </p>
            <p>• Final recommendation triggers payout processing workflow</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdjustmentTimeline;
