import React from "react";
import { Navigate } from "react-router-dom";

import { useGetCurrentUserQuery } from "../store/quizApi";

const PrivateRoute = ({ children }) => {
    const { data, error, isLoading } = useGetCurrentUserQuery();

    console.log(data);
    if (isLoading) return <div>Loading...</div>;

    if (error) return <Navigate to="/sign-in" />;

    return children;
};

export default PrivateRoute
