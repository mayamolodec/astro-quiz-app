import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import regiFormImg from "../../assets/Frame5_2.svg";
import { useSignUpMutation } from "../../store/quizApi";

import styles from "./RegisterForm.module.scss"

export default function RegisterForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors }, watch } = useForm({ defaultValues: { name: "", email: "", password: "", passwordCheck: "" } });
    const [shake, setShake] = useState(false);
    const [signUp] = useSignUpMutation();

    const onSubmit = async (e) => {
        delete e["passwordCheck"];

        try {
            await signUp(e).unwrap();
            navigate("/quiz");
        }
        catch (error) {
            if (error?.status === 400) {
                console.log("User already exists");
                setError("email", {
                    type: "manual",
                    message: "User already exists",
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
            <div className={styles.container}>
                <form className={`${styles["container__form"]} ${shake ? styles["shake"] : ""}`} onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <div className={styles["container__form-headline"]}>Sign Up</div>
                    <input {...register("name", { required: errMessage })}
                        className={`${styles["container__form-input"]} ${errors.name ? styles.error : ""}`} type="text" placeholder="Name" />
                    {errors.name && <p className={styles["container__form-error"]}>{errors.name.message}</p>}

                    <input {...register("email", { required: errMessage, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })} type="text"
                        className={`${styles["container__form-input"]} ${errors.email ? styles.error : ""}`} placeholder="E-mail" />
                    {errors.email && <p className={styles["container__form-error"]}>{errors.email.message}</p>}

                    <input {...register("password", { required: errMessage, minLength: { value: 6, message: "Password must have at least 6 characters" } })}
                        className={`${styles["container__form-input"]} ${errors.password ? styles.error : ""}`} type="password" placeholder="Password" />
                    {errors.password && <p className={styles["container__form-error"]}>{errors.password.message}</p>}

                    <input {...register("passwordCheck", { required: errMessage, validate: value => value === watch("password") || "Passwords do not match" })}
                        className={`${styles["container__form-input"]} ${errors.passwordCheck ? styles.error : ""}`} type="password" placeholder="Password check" />
                    {errors.passwordCheck && <p className={styles["container__form-error"]}>{errors.passwordCheck.message}</p>}

                    <button className={styles["container__form-button"]} type="submit">
                        Send
                    </button>
                    <p className={styles["container__form-nav"]} onClick={() => navigate("/sign-in")}>Already have an account? Sign In</p>
                </form>
                <img className={styles.container__img} src={regiFormImg} alt="Registration illustration" />
            </div>
        </>
    )
}
