import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";
import { useGetResultQuery, useGetUserQuery } from "../../store/quizApi.js";
import { supabase } from "../../supabaseClient";

import styles from "./Profile.module.scss";

export default function Profile() {
    const { user, loading } = useAuth();
    const { userData, userIsLoading } = useGetUserQuery(user?.id, {
        skip: !user?.id,
      });
    const navigate = useNavigate();
    const id = user?.id;
    const { data, isLoading } = useGetResultQuery(id, {
        skip: !id,
      });

    if (loading) return <h2>Loading user...</h2>;
    if (isLoading) return <h2>Loading results...</h2>;
    if (userIsLoading) return <h2>Loading user...</h2>;
    if (!user) {
        return <Navigate to="/sign-in" />
    }

    const onSubmit = async() =>{
        try{
            await supabase.auth.signOut();
            navigate("/sign-in");
        }
        catch (err){
            console.log(err);
        }
    }

    if (isLoading){
        return <h2>Loading...</h2>
    }

    const listResults = data.map(results => {
        return (
          <p key={results.id}>{results.quizzes.name}:{results.result} </p>
        );
      });

    if (data){

    return (
        <div className={styles["container"]}>
            <div className={styles["container__card"]}>
                <p> <span style={{ color: "#9F50B1" }}>Name:</span> {user.name}</p>
                <p> <span style={{ color: "#9F50B1" }}>Email:</span> {user.email}</p>
                <div> <span style={{ color: "#9F50B1" }}>Results:</span> {listResults}</div>
                <button className={styles["container__card-button"]} onClick={onSubmit}>
                    Sign Out
                </button>
            </div>

        </div>
    )
}
}
