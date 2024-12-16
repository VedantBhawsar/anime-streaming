import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { PersonalInfoSection } from "@/components/account/PersonalInfoSection";
import { ResetPasswordSection } from "@/components/account/ResetPasswordSection";

export default function AccountPage() {
  return (
    <section>
      <h1 className="text-3xl text-purple-700 font-semibold ">Account</h1>
      <div className="grid grid-cols-4 gap-4 mt-5 items-start">
        <div className="col-span-1 p-10 bg-white rounded-lg shadow-sm ">
          <div className="relative w-40 aspect-square bg-gray-100 rounded-full flex justify-center items-center">
            <div>
              comming
              <ImageIcon className="text-black" />
            </div>
          </div>
        </div>
        <div className="col-span-3 p-5 bg-white flex gap-4 flex-col rounded-lg shadow-sm">
          <div>
            <h1 className="text-purple-600 font-bold text-xl">
              Personal Information
            </h1>
            <p className="text-sm text-gray-700">
              This is my personal information.
            </p>
          </div>
          <PersonalInfoSection />
        </div>

        <span className="col-span-1"></span>

        <div className="col-span-3 p-5 bg-white flex gap-4 flex-col rounded-lg shadow-sm">
          <div>
            <h1 className="text-purple-600 font-bold text-xl">
              Reset password
            </h1>
            <p className="text-sm text-gray-700">Reset your password</p>
          </div>
          <ResetPasswordSection />
        </div>
      </div>
    </section>
  );
}
