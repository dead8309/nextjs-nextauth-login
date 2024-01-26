import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="container flex flex-col gap-4">
     <Avatar className="h-20 w-20">
        <AvatarImage
          src={session.user.image as string}
          alt={session.user.name as string}
        />
        <AvatarFallback>{session.user.username}</AvatarFallback>
      </Avatar>
      <h1 className="text-5xl font-bold">{session.user.username}</h1>
      <h1 className="text-lg text-muted-foreground">{session.user.email}</h1>
      <Button className="w-fit">
        <LogoutButton />
      </Button>
    </div>
  );
};

/*


      */
export default DashboardPage;
