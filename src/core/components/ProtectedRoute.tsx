import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouteLogin = ({ Component }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.authData;
    if (authData) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component />;
};

const ProtectedRoute = ({ Component }: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authData = localStorage.authData;
    if (!authData) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Component />;
};

export { ProtectedRoute, ProtectedRouteLogin };
