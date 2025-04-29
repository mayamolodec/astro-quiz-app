import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import regiFormImg from "../../assets/Frame5_2.svg";

import styles from "./RegisterForm.module.scss"

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: { login: "", email: "", password: "", passwordCheck: "" } });
    const [shake, setShake] = useState(false);
    const password = useRef({});

    password.current = watch("password");

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    }
    const onInvalid = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const errMessage = "Field is required";

    return (
        <>
            <div className={styles.container}>
                <form className={`${styles["container__form"]} ${shake ? styles["shake"] : ""}`} onSubmit={handleSubmit(onSubmit, onInvalid)}>
                    <div className={styles["container__form-headline"]}>Sign Up</div>
                    <input {...register("login", { required: errMessage })}
                        className={`${styles["container__form-input"]} ${errors.login ? styles.error : ""}`} type="text" placeholder="Login" />
                    <p className={styles["container__form-error"]}>{errors.login?.message}</p>

                    <input {...register("email", { required: errMessage, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Not an email" } })} type="text"
                        className={`${styles["container__form-input"]} ${errors.email ? styles.error : ""}`} placeholder="E-mail" />
                    <p className={styles["container__form-error"]}>{errors.email?.message}</p>

                    <input {...register("password", { required: errMessage })}
                        className={`${styles["container__form-input"]} ${errors.password ? styles.error : ""}`} type="password" placeholder="Password" />
                    <p className={styles["container__form-error"]}>{errors.password?.message}</p>

                    <input {...register("passwordCheck", { required: errMessage, validate: value => value === password.current || "The passwords do not match" })}
                        className={`${styles["container__form-input"]} ${errors.passwordCheck ? styles.error : ""}`} type="password" placeholder="Password check" />
                    <p className={styles["container__form-error"]}>{errors.passwordCheck?.message}</p>

                    <button className={styles["container__form-button"]} type="submit">
                        Send
                    </button>
                </form>
                <img className={styles.container__img} src={regiFormImg} alt="Registration illustration" />
            </div>
        </>
    )
}
