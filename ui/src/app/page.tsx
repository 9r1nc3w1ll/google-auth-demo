'use client';

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const data = searchParams.get('data');
  const login = useAuthStore(({login}) => login);

  useEffect(
    () => {
      if (data) {
        const userData = JSON.parse(atob(data)) as {
          user: User;
          token: string;
        };
    
        login(userData.user, userData.token)
        router.replace("/generate-otp")
      }
    },
    [data, router, login]
  );


  return (
    <div className="flex flex-col mt-10 w-full p-3 md:max-w-sm  mx-auto">
      <div className="mb-5 text-sm">
        Welcome! <br />
        To generate OTPs you need to first login <span className="whitespace-nowrap">(with google)</span>.
      </div>

      
      <a href="http://localhost:8000/api/auth/redirect">
        <Button size={"sm"} className="px-6 rounded-full">Login</Button>
      </a>
    </div>
  );
}
