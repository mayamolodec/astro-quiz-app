import React from "react";
import { Navigate } from "react-router-dom";

import { useGetCurrentUserQuery } from "../../store/quizApi";

import styles from "./Profile.module.scss";

export default function Profile() {
    const { data, error, isLoading } = useGetCurrentUserQuery();

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <Navigate to="/sign-in" />
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["container__card"]}>
                <p> <span style={{ color: "#9F50B1" }}>Name:</span> {data.name}</p>
                <p> <span style={{ color: "#9F50B1" }}>Email:</span> {data.email}</p>
            </div>

        </div>
    )

}
