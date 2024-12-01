"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Twitter, Mail } from "lucide-react";

export default function SignIn() {


  
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br p-4">
      <Card className="w-full max-w-md border-2 border-pink-300 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-pink-600">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-purple-800">
            Sign in to continue your anime adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2"
              />
            </div>
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              Sign In
            </Button>

            <div className="flex w-full overflow-hidden items-center my-4">
              <Separator className="flex-1" />
              <span className="px-4 text-gray-500">Or continue with</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center mt-4">
              <Link href="/signup" className="text-pink-600 hover:underline">
                Don&apos;t have an account? Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
