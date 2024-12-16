"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormData = {
  confirmPassword: string;
  oldpassword: string;
  newPassword: string;
};

export function ResetPasswordSection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldpassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("submit");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <Label htmlFor="oldPassword">Old Password</Label>
        <Controller
          control={control}
          name="oldpassword"
          render={({ field }) => (
            <Input
              type="password"
              id="oldpassword"
              placeholder="Enter your old password"
              {...field}
              required
              className="mt-2"
            />
          )}
        />
      </div>

      <div>
        <Label htmlFor="name">New Password</Label>
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              {...field}
              required
              className="mt-2"
            />
          )}
        />
      </div>
      <div>
        <Label htmlFor="email">Confirm New Password</Label>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              id="confirmPassword"
              placeholder="Enter confirm password"
              type="password"
              {...field}
              required
              className="mt-2"
            />
          )}
        />
      </div>
      <div className="flex justify-end pt-5">
        <Button type="submit" variant={"destructive"}>
          Change password
        </Button>
      </div>
    </form>
  );
}
