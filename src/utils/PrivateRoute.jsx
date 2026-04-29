import React from "react";
import { Navigate } from "react-router-dom";

import { useGetCurrentUserQuery } from "../store/quizApi";

const PrivateRoute = ({ children }) => {
    const { error, isLoading } = useGetCurrentUserQuery();

    if (isLoading) return <div>Loading...</div>;

    if (error) return <Navigate to="/sign-in" />;

    return children;
};

export default PrivateRoute
