import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DisasterSelectorProps {
  selectedDisaster: string;
  onDisasterChange: (disaster: string) => void;
}

const DisasterSelector: React.FC<DisasterSelectorProps> = ({
  selectedDisaster,
  onDisasterChange,
}) => {
  const disasters = [
    { id: "wildfire", name: "Wildfire", icon: "🔥", color: "bg-red-600" },
    { id: "flood", name: "Flood", icon: "🌊", color: "bg-blue-600" },
    { id: "drought", name: "Drought", icon: "🌵", color: "bg-yellow-600" },
    {
      id: "windstorm",
      name: "Wind/Sandstorm",
      icon: "💨",
      color: "bg-gray-600",
    },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>⚠️</span>
          <span>Disaster Type</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {disasters.map((disaster) => (
          <Button
            key={disaster.id}
            variant={selectedDisaster === disaster.id ? "default" : "outline"}
            className={`w-full justify-start space-x-3 ${
              selectedDisaster === disaster.id
                ? `${disaster.color} hover:${disaster.color}/80`
                : "border-slate-600 hover:bg-slate-700"
            }`}
            onClick={() => onDisasterChange(disaster.id)}
          >
            <span className="text-lg">{disaster.icon}</span>
            <span>{disaster.name}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default DisasterSelector;
