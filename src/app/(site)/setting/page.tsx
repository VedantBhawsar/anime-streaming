"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCircle2, Bell, Palette, Lock, Save } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="h-full p-4">
      <h1 className="text-3xl font-semibold text-purple-600 mb-5">Settings</h1>
      <div className=" shadow-sm bg-white p-5">
        <div>This is setting page</div>
      </div>
    </div>
  );
};

export default Settings;
