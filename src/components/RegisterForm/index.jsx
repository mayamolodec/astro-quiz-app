import React from "react";
import { useState } from "react";

import regiFormImg from "../../assets/Frame5_2.svg";

import styles from "./RegisterForm.module.scss"

export default function RegisterForm() {
    const [formData, setFormData] = useState({ login: "", email: "", password: "", passwordCheck: "" });
    const [shake, setShake] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.login || !formData.email || !formData.password || !formData.passwordCheck) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            console.log("Some fields are not filled-in!");
            setTimeout(() => {
                alert("Some fields are not filled-in!");
            }, 400);

            return;
        }

        if (formData.password != formData.passwordCheck) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            console.log("The passwords are not the same!");
            setTimeout(() => {
                alert("The passwords are not the same!");
            }, 400);

            return;
        }

        console.log(formData);

    };

    return (
        <>
            <div className={styles.container}>
                <form className={`${styles.container__form} ${shake ? styles["shake"] : ""}`} onSubmit={handleSubmit}>
                    <div className={styles["container__form-headline"]}>Sign Up</div>
                    <input className={styles["container__form-input"]} type="text" name="login" placeholder="Login" value={formData.login} onChange={handleChange} />

                    <input className={styles["container__form-input"]} type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />

                    <input className={styles["container__form-input"]} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

                    <input className={styles["container__form-input"]} type="password" name="passwordCheck" placeholder="Password check" value={formData.passwordCheck} onChange={handleChange} />
                    <button className={styles["container__form-button"]} type="submit">
                        Send
                    </button>
                </form>
                <img className={styles.container__img} src={regiFormImg} alt="Registration illustration" />
            </div>
        </>
    )
}
