"use client";
import React from "react";
import StaggeredMenu from "./StaggeredMenu";
import { getSidebarConfig } from "@/config/navigation";

export default function StaggeredMenuIntegration() {
  const config = getSidebarConfig("student");

  const stgItems = config.navMain.map((item) => ({
    label: item.title,
    ariaLabel: item.title,
    link: item.url,
    icon: item.icon,
    subItems: item.items?.map((sub) => ({ label: sub.title, link: sub.url })),
  }));

  const systemItems = config.systemNav.map((item) => ({
    label: item.title,
    link: item.url,
    icon: item.icon,
  }));

  const userProfile = {
    name: config.user.name,
    email: config.user.email,
    avatarUrl: config.user.avatar,
  };

  return (
    <StaggeredMenu
      position="left"
      isFixed={true}
      colors={["#272727", "#38bdf8"]}
      items={stgItems}
      socialItems={systemItems}
      userProfile={userProfile}
      accentColor="#38bdf8"
      menuButtonColor="#ffffff"
      menuButtonBg="#1B4332"
      openMenuButtonBg="#ffffff"
      openMenuButtonColor="#000000"
    />
  );
}
