'use client';

import React from "react";
import { Card, CardBody, CardHeader, Switch } from "@nextui-org/react";
import useSkin from "../../../utils/hooks/common/useSkin";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function SystemPreferences(){
    const { skin, setSkin } = useSkin();

    return     <Card className="w-full ">
    <CardHeader>
      <p className="text-small ">System Preferences</p>
    </CardHeader>
    <CardBody>
      <div className="flex flex-col gap-4">
    <div className="flex w-full items-center justify-between">
        <span>Dark Mode</span>
        <Switch
      isSelected={skin === "light"} onValueChange={(val) =>{
        if(val){
            setSkin("light")
        }else{
            setSkin("dark")
        }
      }}
      size="lg"
      color="primary"
      startContent={<LightModeIcon />}
      endContent={<DarkModeIcon />}
    />
    </div>
      </div>
    </CardBody>
  </Card>
}