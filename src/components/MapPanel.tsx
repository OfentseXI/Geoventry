import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MapPanelProps {
  disaster: string;
  viewMode: "before" | "current";
  lowDataMode: boolean;
}

const MapPanel: React.FC<MapPanelProps> = ({
  disaster,
  viewMode,
  lowDataMode,
}) => {
  const [selectedErf, setSelectedErf] = useState("ERF-12345");
  const [ndviValue, setNdviValue] = useState(
    viewMode === "before" ? 0.78 : 0.34
  );

  const getSeverityColor = (loss: number) => {
    if (loss >= 70) return "bg-red-500";
    if (loss >= 40) return "bg-orange-500";
    return "bg-green-500";
  };

  const getDisasterIcon = () => {
    switch (disaster) {
      case "wildfire":
        return "🔥";
      case "flood":
        return "🌊";
      case "drought":
        return "🌵";
      case "windstorm":
        return "💨";
      default:
        return "⚠️";
    }
  };

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getDisasterIcon()}</span>
          <Badge
            variant="outline"
            className="text-emerald-400 border-emerald-400"
          >
            {disaster.toUpperCase()} MONITORING
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">NDVI:</span>
          <span className="font-mono text-lg">{ndviValue.toFixed(2)}</span>
        </div>
      </div>

      {/* Satellite Map Simulation */}
      <div className="relative w-full h-96 bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-700">
        {/* Simulated Satellite Imagery */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-yellow-800 to-red-900 opacity-60">
          {/* Damage Overlay */}
          {viewMode === "current" && (
            <div className="absolute inset-0">
              {/* Severe Damage Zone */}
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500 opacity-70 rounded-full blur-md animate-pulse" />
              {/* Moderate Damage Zone */}
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-500 opacity-60 rounded-full blur-sm" />
              {/* Light Damage Zone */}
              <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-yellow-500 opacity-50 rounded-full blur-sm" />
            </div>
          )}
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* ERF Markers */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button
            variant="outline"
            size="sm"
            className="bg-emerald-600 border-emerald-400 text-white hover:bg-emerald-700"
            onClick={() => setSelectedErf("ERF-12345")}
          >
            📍 ERF-12345
          </Button>
        </div>

        <div className="absolute bottom-1/4 right-1/3">
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-600 border-blue-400 text-white hover:bg-blue-700"
            onClick={() => setSelectedErf("ERF-67890")}
          >
            📍 ERF-67890
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-800 bg-opacity-90 p-3 rounded-lg">
          <p className="text-xs font-semibold mb-2">Damage Severity</p>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">Severe (70%+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs">Moderate (40-70%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Minimal (&lt;40%)</span>
            </div>
          </div>
        </div>

        {/* Coordinates Display */}
        <div className="absolute top-4 right-4 bg-slate-800 bg-opacity-90 p-2 rounded text-xs font-mono">
          <div>Lat: -26.2041° S</div>
          <div>Lng: 28.0473° E</div>
          <div className="text-emerald-400 mt-1">Sentinel-2 L2A</div>
        </div>
      </div>

      {/* Selected ERF Info */}
      <Card className="bg-slate-700 border-slate-600">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-emerald-400">
                Selected: {selectedErf}
              </h4>
              <p className="text-sm text-slate-400">
                Last Updated: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Change Detection</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-bold text-red-400">
                  -{viewMode === "current" ? "56" : "0"}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapPanel;
