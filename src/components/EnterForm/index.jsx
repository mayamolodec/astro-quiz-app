import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import regiFormImg from "../../assets/Frame5_2.svg";
import { supabase } from "../../supabaseClient";
import styles from "../RegisterForm/RegisterForm.module.scss";

export default function EnterForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });
    const [shake, setShake] = useState(false);
    // const [signIn] = useSignInMutation();

    const onSubmit = async (e) => {

        try {
            const { data: signInData, error } = await supabase.auth.signInWithPassword(e);

              if (error) {
                setError("password", {
                  type: "manual",
                  message: "Wrong email or password",
                });
                setShake(true);
                setTimeout(() => setShake(false), 500);
                console.error("Supabase sign-in error:", error.message);

                return;
              }

              console.log("User signed in:", signInData.user);
              navigate("/quiz");
        }
        catch (err) {
      console.error("Unexpected error:", err);
            }

    }

    const onInvalid = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const errMessage = "This field is required";

    return (
        <>
            <div className={`${styles.container} ${styles["container__signInVariation"]}`}>
                <form className={`${styles["container__form"]} ${shake ? styles["shake"] : ""}`} onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <div className={styles["container__form-headline"]}>Sign In</div>

                    <input {...register("email", { required: errMessage, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })} type="text"
                        className={`${styles["container__form-input"]} ${errors.email ? styles.error : ""}`} placeholder="E-mail" />
                    {errors.email && <p className={styles["container__form-error"]}>{errors.email.message}</p>}

                    <input {...register("password", { required: errMessage, minLength: { value: 6, message: "Password must have at least 6 characters" } })}
                        className={`${styles["container__form-input"]} ${errors.password ? styles.error : ""}`} type="password" placeholder="Password" />
                    {errors.password && <p className={styles["container__form-error"]}>{errors.password.message}</p>}
                    <button className={styles["container__form-button"]} type="submit">
                        OK
                    </button>
                    <p className={styles["container__form-nav"]} onClick={() => navigate("/sign-up")}>
                        Don’t have an account? Sign Up
                    </p>
                </form>
                <img className={styles.container__img} src={regiFormImg} alt="Registration illustration" />
            </div>
        </>
    )
}
