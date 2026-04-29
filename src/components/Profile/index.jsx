import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetCurrentUserQuery } from "../../store/quizApi";
import { useSignOutMutation } from "../../store/quizApi";

import styles from "./Profile.module.scss"

export default function Profile() {
    const { data, error, isLoading } = useGetCurrentUserQuery();
    const [signOut] = useSignOutMutation();
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile. Try to <span style={{ color: "#9F50B1", cursor: "pointer" }} onClick={()=> navigate("/sign-in")}>Sign-In</span></div>;

    const onSubmit = async() =>{
        try{
            await signOut();
            navigate("/sign-in");
        }
        catch (err){
            console.log(err);
        }
    }

    return (
    <div className={styles["container"]}>
    <div className={styles["container__card"]}>
    <p> <span style={{ color: "#9F50B1" }}>Name:</span> {data.user.name}</p>
    <p> <span style={{ color: "#9F50B1" }}>Email:</span> {data.user.email}</p>

    <button className={styles["container__card-button"]} onClick={onSubmit}>
        Sign Out
    </button>
    </div>

    </div>
)

}
