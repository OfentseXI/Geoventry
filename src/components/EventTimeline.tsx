import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventTimelineProps {
  disaster: string;
}

const EventTimeline: React.FC<EventTimelineProps> = ({ disaster }) => {
  const timelineEvents = [
    {
      id: 1,
      title: "Disaster Occurrence",
      description: `${
        disaster.charAt(0).toUpperCase() + disaster.slice(1)
      } detected in the region`,
      timestamp: "2024-03-15 08:30",
      status: "completed",
      icon: "⚡",
    },
    {
      id: 2,
      title: "Satellite Scan Initiated",
      description: "Sentinel-2 imagery acquisition started",
      timestamp: "2024-03-15 12:15",
      status: "completed",
      icon: "🛰️",
    },
    {
      id: 3,
      title: "NDVI Analysis Complete",
      description: "Change detection algorithm processed imagery",
      timestamp: "2024-03-15 14:45",
      status: "completed",
      icon: "📊",
    },
    {
      id: 4,
      title: "Quantity Loss Calculated",
      description: "Stock loss assessment completed",
      timestamp: "2024-03-15 15:20",
      status: "completed",
      icon: "📉",
    },
    {
      id: 5,
      title: "Value Loss Assessment",
      description: "Insurance valuation calculated",
      timestamp: "2024-03-15 15:45",
      status: "completed",
      icon: "💰",
    },
    {
      id: 6,
      title: "Payout Processing",
      description: "Insurance claim under review",
      timestamp: "2024-03-15 16:00",
      status: "in-progress",
      icon: "⏳",
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

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>⏰</span>
          <span>Event Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full ${getStatusColor(
                    event.status
                  )} flex items-center justify-center text-sm`}
                >
                  {event.icon}
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 h-8 bg-slate-600 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-white">{event.title}</h4>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      event.status === "completed"
                        ? "border-green-600 text-green-400"
                        : event.status === "in-progress"
                        ? "border-orange-600 text-orange-400"
                        : "border-slate-600 text-slate-400"
                    }`}
                  >
                    {event.status.replace("-", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-slate-400 mb-1">
                  {event.description}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {event.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTimeline;
