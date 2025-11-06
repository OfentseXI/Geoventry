import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MapPanel from "@/components/MapPanel";
import DisasterSelector from "@/components/DisasterSelector";
import StockQuantityPanel from "@/components/StockQuantityPanel";
import InsuranceValuationPanel from "@/components/InsuranceValuationPanel";
import EventTimeline from "@/components/EventTimeline";
import UploadSection from "@/components/UploadSection";
import UserLogin from "@/components/UserLogin";
import CommoditySelector from "@/components/CommoditySelector";
import InventoryLossDashboard from "@/components/InventoryLossDashboard";
import LossAdjustmentPanel from "@/components/LossAdjustmentPanel";
import AdjustmentTimeline from "@/components/AdjustmentTimeline";
import RoleSelector from "@/components/RoleSelector";
import { toast } from "sonner";

type ViewMode = "before" | "current";
type UserRole = "admin" | "loss-adjuster" | "viewer";

const Index = () => {
  const [selectedDisaster, setSelectedDisaster] = useState("wildfire");
  const [selectedCommodity, setSelectedCommodity] = useState("maize");
  const [viewMode, setViewMode] = useState<ViewMode>("before");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [accountingMode, setAccountingMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("admin");

  const handleGeneratePDF = () => {
    toast.success("PDF report generated successfully!");
  };

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Mock login - in real app would authenticate with backend
    setIsLoggedIn(true);
    toast.success("Login successful!");
  };

  if (!isLoggedIn) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-emerald-400">Geoventory</h1>
            <Badge
              variant="outline"
              className="text-emerald-400 border-emerald-400"
            >
              Earth Observation Dashboard
            </Badge>
            <Badge
              className={
                userRole === "loss-adjuster"
                  ? "bg-emerald-600"
                  : userRole === "admin"
                  ? "bg-purple-600"
                  : "bg-blue-600"
              }
            >
              {userRole === "loss-adjuster"
                ? "🔍 Loss Adjuster"
                : userRole === "admin"
                ? "👑 Administrator"
                : "👁️ Viewer"}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            {/* Official Insurance Partner */}
            <div className="flex flex-col items-center space-y-1">
              <div className="text-xs text-slate-400">
                Official Insurance Partner
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                <img
                  src="/lovable-uploads/85fedc35-d4f8-43df-9570-0750167b553c.png"
                  alt="Tsoga Afrika Insurance Brokers"
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <Button
              variant={lowDataMode ? "default" : "outline"}
              size="sm"
              onClick={() => setLowDataMode(!lowDataMode)}
              className="text-xs"
            >
              Low Data Mode
            </Button>
            <Button
              variant={accountingMode ? "default" : "outline"}
              size="sm"
              onClick={() => setAccountingMode(!accountingMode)}
              className="text-xs"
            >
              Accounting Mode
            </Button>
            <Button
              onClick={handleGeneratePDF}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Generate PDF Report
            </Button>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <RoleSelector currentRole={userRole} onRoleChange={setUserRole} />
            <DisasterSelector
              selectedDisaster={selectedDisaster}
              onDisasterChange={setSelectedDisaster}
            />
            <CommoditySelector
              selectedCommodity={selectedCommodity}
              onCommodityChange={setSelectedCommodity}
            />
            <StockQuantityPanel
              disaster={selectedDisaster}
              commodity={selectedCommodity}
              accountingMode={accountingMode}
            />
            <InsuranceValuationPanel
              disaster={selectedDisaster}
              commodity={selectedCommodity}
              accountingMode={accountingMode}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Map Panel */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-emerald-400">
                    🌍 Sentinel-2 Satellite Analysis
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "before" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("before")}
                      className="text-xs"
                    >
                      Before Disaster
                    </Button>
                    <Button
                      variant={viewMode === "current" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("current")}
                      className="text-xs"
                    >
                      Current View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <MapPanel
                  disaster={selectedDisaster}
                  viewMode={viewMode}
                  lowDataMode={lowDataMode}
                />
              </CardContent>
            </Card>

            {/* Loss Adjuster Specific Components */}
            {userRole === "loss-adjuster" && (
              <>
                <LossAdjustmentPanel
                  erfNumber="ERF-12345"
                  originalQuantityLoss={700}
                  originalValueLoss={3150000}
                  commodity={selectedCommodity}
                  unit={selectedCommodity === "cattle" ? "head" : "tons"}
                />
                <AdjustmentTimeline
                  erfNumber="ERF-12345"
                  disaster={selectedDisaster}
                />
              </>
            )}

            {/* Inventory Loss Dashboard */}
            <InventoryLossDashboard
              selectedDisaster={selectedDisaster}
              accountingMode={accountingMode}
            />

            {/* Tabs for Additional Content */}
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-emerald-600"
                >
                  Event Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-emerald-600"
                >
                  Upload & Export
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-emerald-600"
                >
                  Historical Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="mt-6">
                <EventTimeline disaster={selectedDisaster} />
              </TabsContent>

              <TabsContent value="upload" className="mt-6">
                <UploadSection />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-emerald-400">
                      📁 Historical Disaster Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                        <div>
                          <p className="font-semibold">
                            Wildfire Event - ERF 12345
                          </p>
                          <p className="text-sm text-slate-400">
                            March 15, 2024
                          </p>
                        </div>
                        <Badge variant="destructive">85% Loss</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                        <div>
                          <p className="font-semibold">
                            Flood Event - ERF 67890
                          </p>
                          <p className="text-sm text-slate-400">
                            January 22, 2024
                          </p>
                        </div>
                        <Badge variant="secondary">45% Loss</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Partnership Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-6 mt-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                  <img
                    src="/lovable-uploads/85fedc35-d4f8-43df-9570-0750167b553c.png"
                    alt="Tsoga Afrika Insurance Brokers"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-emerald-400 font-semibold">
                    In Partnership with
                  </p>
                  <p className="text-white font-bold">
                    Tsoga Afrika Insurance Brokers
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-400 text-sm">
                Powered by Sentinel-2 Earth Observation Technology
              </p>
              <p className="text-slate-500 text-xs mt-1">
                © 2024 Geoventory - Professional Inventory Assessment Platform
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
