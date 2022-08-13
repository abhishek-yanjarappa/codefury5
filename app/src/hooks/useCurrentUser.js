import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { useState, useEffect } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    window.addEventListener("authStateChange", async () => {
      const u = await FirebaseAuthentication.getCurrentUser();
      setUser(u);
    });
    const set = async () => {
      const u = await FirebaseAuthentication.getCurrentUser();
      setUser(u);
    };
    set();
  }, []);
  return user;
};

export default useCurrentUser;
