'use client'

import React from "react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const LogoutButton = () => {
  return (
    <span onClick={()=> signOut()}>Log out</span>
  );
};

export default LogoutButton;
