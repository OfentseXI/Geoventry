import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoleSelectorProps {
  currentRole: "admin" | "loss-adjuster" | "viewer";
  onRoleChange: (role: "admin" | "loss-adjuster" | "viewer") => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const roles = [
    {
      id: "admin" as const,
      name: "Administrator",
      description: "Full access to all dashboard features",
      icon: "👑",
      color: "bg-purple-600",
    },
    {
      id: "loss-adjuster" as const,
      name: "Loss Adjuster",
      description:
        "Verify, assess, and value damage before insurance payout approval",
      icon: "🔍",
      color: "bg-emerald-600",
    },
    {
      id: "viewer" as const,
      name: "Viewer",
      description: "Read-only access to reports and data",
      icon: "👁️",
      color: "bg-blue-600",
    },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center space-x-2">
          <span>👤</span>
          <span>User Role Selection</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                currentRole === role.id
                  ? "border-emerald-500 bg-emerald-900/20"
                  : "border-slate-600 bg-slate-700 hover:border-slate-500"
              }`}
              onClick={() => onRoleChange(role.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full ${role.color} flex items-center justify-center text-sm`}
                  >
                    {role.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{role.name}</h4>
                    <p className="text-xs text-slate-400">{role.description}</p>
                  </div>
                </div>
                {currentRole === role.id && (
                  <Badge className="bg-emerald-600">Active</Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loss Adjuster Definition */}
        {currentRole === "loss-adjuster" && (
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
            <p className="text-xs text-blue-400">
              💡 <strong>Loss Adjustment Definition:</strong> The expert process
              of verifying and valuing insured losses after a disaster, before
              payout.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleSelector;
