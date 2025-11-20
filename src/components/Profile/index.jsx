import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";
import { useGetResultQuery, useGetUserQuery } from "../../store/quizApi.js";
import { supabase } from "../../supabaseClient";

import styles from "./Profile.module.scss";

export default function Profile() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const id = user?.id;

    const { data, isLoading } = useGetResultQuery(id, {
        skip: !id,
      });
    const { data: userData, isLoading: isLoadingUser} = useGetUserQuery(id, {
        skip: !id,
      });

    if  (loading || isLoading || isLoadingUser) {
        return <h2>Loading profile...</h2>;
    }

    if (!user) {
        return <Navigate to="/sign-in" />
    }

    if (!userData || userData.length === 0) {
        return <h2>No profile data found</h2>;
      }

    const userProfile = userData[0];
    const onSubmit = async() =>{
        try{
            await supabase.auth.signOut();
            navigate("/sign-in");
        }
        catch (err){
            console.log(err);
        }
    }

    let stats = Object.values(data.reduce((acc, quiz) => {
        const { quizzes, result } = quiz;
        const name = quizzes.name;

        if (!acc[name]) acc[name] = { name:name, tries: 0, lastResult: 0 };

        acc[name].tries += 1;
        acc[name].lastResult = result;

        return acc;
    }, {}));

    console.log
    const listResults = stats.map((stat) => {
        return (
            <div  key = {stat.name}>
                <span style={{ color: "#9F50B1" }}>{stat.name}:</span><br></br>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>{stat.tries} tr{stat.tries == 1?"y": "ies"}</span><span> {stat.lastResult}/4 points</span>
                </div>
            </div>

        );
      });

    return (
        <div className={styles["container"]}>
            <div className={styles["container__card"]}>
                <p> <span style={{ color: "#9F50B1" }}>Name:</span> {userProfile.name}</p>
                <p> <span style={{ color: "#9F50B1" }}>Email:</span> {userProfile.email}</p>
                <div>{data && data.length > 0 ? listResults : "No results yet"}</div>
                <button className={styles["container__card-button"]} onClick={onSubmit}>
                    Sign Out
                </button>
            </div>

        </div>
    )
}
