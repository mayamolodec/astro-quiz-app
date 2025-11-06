import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

import styles from "./Profile.module.scss";

export default function Profile() {
    const { user } = useAuth();

    console.log(user);
    // if (isLoading) {
    //     return <h1>Loading...</h1>
    // }
    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["container__card"]}>
                <p> <span style={{ color: "#9F50B1" }}>Name:</span> {user.name}</p>
                <p> <span style={{ color: "#9F50B1" }}>Email:</span> {user.email}</p>
            </div>

        </div>
    )

}
