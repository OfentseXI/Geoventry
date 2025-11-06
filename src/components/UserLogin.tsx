import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface UserLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-emerald-400 mb-2">
            Geoventory
          </h1>
          <Badge
            variant="outline"
            className="text-emerald-400 border-emerald-400 mb-6"
          >
            Earth Observation Dashboard
          </Badge>
          <p className="text-slate-400">
            Satellite-powered inventory valuation and disaster monitoring
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-emerald-400">
              Sign In to Your Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-700 rounded-lg">
              <p className="text-xs text-slate-400 text-center mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-slate-300 text-center">
                Username: <span className="font-mono">demo</span> | Password:{" "}
                <span className="font-mono">demo123</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-2xl mb-2">🛰️</div>
            <p className="text-xs text-slate-400">Sentinel-2 Integration</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-xs text-slate-400">Real-time Analytics</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-2xl mb-2">💰</div>
            <p className="text-xs text-slate-400">Insurance Valuation</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="text-2xl mb-2">🌍</div>
            <p className="text-xs text-slate-400">Global Coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
