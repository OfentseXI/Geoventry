import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const UploadSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [liveDroneActive, setLiveDroneActive] = useState(false);
  const [liveGISActive, setLiveGISActive] = useState(false);
  const [droneView, setDroneView] = useState("zone1");
  const [gisLayer, setGisLayer] = useState("wildfire");

  const handleFileUpload = (type: string) => {
    // Mock file upload for invoices only
    const fileName = `${type}_${Date.now()}.pdf`;
    setUploadedFiles([...uploadedFiles, fileName]);
    toast.success(
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } file uploaded successfully!`
    );
  };

  const handleExport = (type: string) => {
    toast.success(`${type} exported successfully!`);
  };

  const toggleDroneFeed = () => {
    setLiveDroneActive(!liveDroneActive);
    toast.success(
      liveDroneActive ? "Drone feed stopped" : "Drone feed activated"
    );
  };

  const toggleGISView = () => {
    setLiveGISActive(!liveGISActive);
    toast.success(liveGISActive ? "GIS view stopped" : "GIS view activated");
  };

  const switchDroneView = () => {
    const views = ["zone1", "zone2", "zone3"];
    const currentIndex = views.indexOf(droneView);
    const nextView = views[(currentIndex + 1) % views.length];
    setDroneView(nextView);
    toast.success(`Switched to ${nextView.toUpperCase()}`);
  };

  const refreshGISLayer = () => {
    const layers = ["wildfire", "flood", "drought", "windstorm"];
    const currentIndex = layers.indexOf(gisLayer);
    const nextLayer = layers[(currentIndex + 1) % layers.length];
    setGisLayer(nextLayer);
    toast.success(`Refreshed to ${nextLayer} layer`);
  };

  return (
    <div className="space-y-6">
      {/* Additional EO Data Feed Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-emerald-400 mb-2">
          📁 Additional EO Data Feed
        </h2>
        <p className="text-slate-400 text-sm">
          Live monitoring and simulation data for enhanced disaster assessment
        </p>
      </div>

      {/* Live EO Data Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Drone Footage Panel */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center space-x-2">
              <span className="text-2xl">🎥</span>
              <span className="text-lg">Live Drone Feed (Simulated)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              {liveDroneActive ? (
                <div className="bg-slate-900 rounded-lg p-4 min-h-[200px] flex items-center justify-center relative overflow-hidden">
                  {/* Simulated drone footage */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-yellow-700 to-red-800 opacity-70 animate-pulse"></div>
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-2">🚁</div>
                    <div className="text-emerald-400 font-mono text-sm">
                      <div>Erf_001 - {droneView.toUpperCase()}</div>
                      <div>Lat: -25.98, Long: 27.54</div>
                      <div>Timestamp: {new Date().toLocaleString()}</div>
                    </div>
                  </div>
                  {/* Crosshair overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border-2 border-emerald-400 rounded-full opacity-50"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-700 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                  <div>
                    <div className="text-4xl mb-2">🎥</div>
                    <p className="text-slate-400">
                      Click to activate live drone feed
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={toggleDroneFeed}
                className={`flex-1 ${
                  liveDroneActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {liveDroneActive ? "Stop Feed" : "Start Feed"}
              </Button>
              {liveDroneActive && (
                <Button
                  onClick={switchDroneView}
                  variant="outline"
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-900"
                >
                  Switch View
                </Button>
              )}
            </div>

            <p className="text-xs text-slate-500 text-center">
              This is a demo feed for simulation purposes only.
            </p>
          </CardContent>
        </Card>

        {/* Live GIS Shapefiles Panel */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center space-x-2">
              <span className="text-2xl">🗺️</span>
              <span className="text-lg">Live GIS View (Simulated)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              {liveGISActive ? (
                <div className="bg-slate-900 rounded-lg p-4 min-h-[200px] relative overflow-hidden">
                  {/* Simulated GIS map */}
                  <div
                    className={`absolute inset-0 ${
                      gisLayer === "wildfire"
                        ? "bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700"
                        : gisLayer === "flood"
                        ? "bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-600"
                        : gisLayer === "drought"
                        ? "bg-gradient-to-br from-yellow-900 via-orange-700 to-red-600"
                        : "bg-gradient-to-br from-gray-800 via-slate-700 to-gray-600"
                    } opacity-60`}
                  ></div>

                  {/* Grid overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full">
                      <defs>
                        <pattern
                          id="gis-grid"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#gis-grid)" />
                    </svg>
                  </div>

                  {/* Mock shapefile points */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>

                  {/* Layer info */}
                  <div className="absolute bottom-2 left-2 bg-slate-800 bg-opacity-90 p-2 rounded text-xs">
                    <div className="text-emerald-400">
                      Layer: {gisLayer.toUpperCase()}
                    </div>
                    <div className="text-slate-400">
                      Updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-700 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                  <div>
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-slate-400">
                      Click to activate live GIS view
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={toggleGISView}
                className={`flex-1 ${
                  liveGISActive
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {liveGISActive ? "Stop View" : "Start View"}
              </Button>
              {liveGISActive && (
                <Button
                  onClick={refreshGISLayer}
                  variant="outline"
                  className="border-emerald-400 text-emerald-400 hover:bg-emerald-900"
                >
                  Refresh Layer
                </Button>
              )}
            </div>

            <p className="text-xs text-slate-500 text-center">
              This layer is based on archived GIS boundary files.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Upload Section (Unchanged) */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center space-x-2">
              <span className="text-2xl">📄</span>
              <span className="text-lg">Invoices & Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-400">
              Purchase receipts and documentation
            </p>

            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer">
              <div className="space-y-2">
                <div className="text-3xl">📄</div>
                <p className="text-sm text-slate-400">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-slate-500">PDF, DOC, DOCX</p>
              </div>
            </div>

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={() => handleFileUpload("invoice")}
            >
              Upload Documents
            </Button>

            {/* Show uploaded files */}
            <div className="space-y-2">
              {uploadedFiles
                .filter((file) => file.includes("invoice"))
                .map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-slate-700 rounded"
                  >
                    <span className="text-sm text-slate-300 truncate">
                      {file}
                    </span>
                    <Badge className="bg-green-600 text-xs">Uploaded</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Section (Unchanged) */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-emerald-400 flex items-center space-x-2">
            <span>📁</span>
            <span>Export & Reporting</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => handleExport("PDF Report")}
              className="bg-red-600 hover:bg-red-700 flex items-center space-x-2"
            >
              <span>📄</span>
              <span>Export PDF</span>
            </Button>

            <Button
              onClick={() => handleExport("CSV Data")}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
            >
              <span>📊</span>
              <span>Export CSV</span>
            </Button>

            <Button
              onClick={() => handleExport("Excel Report")}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <span>📈</span>
              <span>Export Excel</span>
            </Button>

            <Button
              onClick={() => handleExport("Archive Log")}
              className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
            >
              <span>🗄️</span>
              <span>Archive Log</span>
            </Button>
          </div>

          <div className="mt-4 p-4 bg-slate-700 rounded-lg">
            <h4 className="font-semibold text-emerald-400 mb-2">
              📋 Export Options
            </h4>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• PDF Report: Comprehensive disaster assessment report</li>
              <li>• CSV Data: Raw inventory and loss data for analysis</li>
              <li>• Excel Report: Formatted spreadsheet with charts</li>
              <li>• Archive Log: Historical events and documentation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSection;
