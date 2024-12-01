"use client";
import { useForm, Controller } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { signIn } from "next-auth/react";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: number;
  favoriteAnimeGenre: string;
};

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: 0,
      favoriteAnimeGenre: "",
    },
  });

  console.log(errors);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (data.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
        // callbackUrl: "http://localhost:3000/",
      });

      if (response?.error) {
        alert("Sign-in failed: " + response.error);
      } else if (response?.ok) {
        console.log("Sign-up Data:", data);
        alert("Sign-in successful!");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br p-10">
      <Card className="w-full max-w-lg border-2 border-pink-300 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-pink-600">
            Join AnimeVerse
          </CardTitle>
          <CardDescription className="text-purple-800">
            Create your account and start your anime journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div>
              <Label htmlFor="username">Username</Label>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    id="username"
                    placeholder="Choose a unique username"
                    {...field}
                    required
                    className="mt-2"
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Label htmlFor="name">Full Name</Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      {...field}
                      required
                      className="mt-2"
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="email">Email</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      required
                      className="mt-2"
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Label htmlFor="password">Password</Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      {...field}
                      required
                      minLength={8}
                      className="mt-2"
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      {...field}
                      required
                      className="mt-2"
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Controller
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      min={13}
                      max={99}
                      {...field}
                      required
                      className="mt-2"
                    />
                  )}
                />
              </div>

              <div>
                <Label>Favorite Anime Genre</Label>
                <Controller
                  control={control}
                  name="favoriteAnimeGenre"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        setValue("favoriteAnimeGenre", value)
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your favorite genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shonen">Shonen</SelectItem>
                        <SelectItem value="slice-of-life">
                          Slice of Life
                        </SelectItem>
                        <SelectItem value="mecha">Mecha</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              Create Account
            </Button>

            <div className="flex w-full overflow-hidden items-center my-4">
              <Separator className="flex-1" />
              <span className="px-4 text-gray-500">Or continue with</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon" type="button">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" type="button">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" type="button">
                <Mail className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center mt-4">
              <Link href="/signin" className="text-pink-600 hover:underline">
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
