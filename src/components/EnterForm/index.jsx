import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import regiFormImg from "../../assets/Frame5_2.svg";
import styles from "../RegisterForm/RegisterForm.module.scss";

export default function EnterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: { login: "", email: "", password: "", passwordCheck: "" } });
    const [shake, setShake] = useState(false);
    const password = useRef({});

    password.current = watch("password");

    const onSubmit = async (e) => {
        const loginData = JSON.stringify(e);

        try {
            const res = await fetch("http://localhost:3000/users/sign-up", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: loginData,
            });

            if (!res.ok) {
                const errorData = await res.json();

                throw new Error(errorData.message || "Sign in failed");
            }

            const result = await res.json();

            console.log("Success:", result);
        }
        catch (error) {
            console.error("Error:", error.message);
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
                </form>
                <img className={styles.container__img} src={regiFormImg} alt="Registration illustration" />
            </div>
        </>
    )
}
