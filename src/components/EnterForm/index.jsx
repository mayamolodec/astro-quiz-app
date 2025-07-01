import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import regiFormImg from "../../assets/Frame5_2.svg";
import { useSignInMutation } from "../../store/quizApi";
import styles from "../RegisterForm/RegisterForm.module.scss";

export default function EnterForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ defaultValues: { email: "", password: "" } });
    const [shake, setShake] = useState(false);
    const [signIn] = useSignInMutation();

    const onSubmit = async (e) => {

        try {
            await signIn(e).unwrap();
            navigate("/quiz");
        }
        catch (error) {
            if (error?.status === 403 || error?.status === 404) {
                setError("password", {
                    type: "manual",
                    message: "Wrong password or email",
                });
                setShake(true);
                setTimeout(() => setShake(false), 500);
            } else {
                console.error("Unexpected error:", error);
            }
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
