import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { supabase } from "../supabaseClient";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    checkUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/sign-in" />;

  return children;
};

export default PrivateRoute;
