import React from "react";
import { Category } from "./Components/Category";
import { Feature } from "./Components/Feature";
import { SiteInfo } from "./Components/SiteInfo";
import Slides from "./Components/Slides";

export const Landingpage = () => {
  return (
    <div>
        <Slides/>
        <SiteInfo/>
        <Feature/>
        <Category/>
    </div>
  );
};
