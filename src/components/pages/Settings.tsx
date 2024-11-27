import React from "react";
import ManageLimits from "../shared/organisms/ManageLimits";
import SystemPreferences from "../shared/organisms/SystemPreferences";

const Settings = () => (
  <div className="p-6">
  <div className="py-4 lg:ps-12 lg:pe-3 px-0">
    <div className="flex md:justify-between md:items-center flex-col gap-4 md:flex-row mb-2 px-2">
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>

    <div className="max-w-full py-4 px-2 w-full h-full flex scrollbar-hide overflow-x-scroll gap-8">
      <ManageLimits />
      <SystemPreferences />
    </div>
  </div>
  </div>

);

export default Settings;
