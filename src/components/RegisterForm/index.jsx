import React from "react";

import regiFormImg from "../../assets/Frame5_2.svg";

import styles from "./RegisterForm.module.scss"

export default function RegisterForm() {

    return (
        <>
            <div className={styles["container"]}>
                <form className={styles["container__form"]}>
                    <div className={styles["container__form-headline"]}>Sign Up</div>
                    <input className={styles["container__form-input"]} type="text" name="login" placeholder="Login" />

                    <input className={styles["container__form-input"]} type="email" name="email" placeholder="E-mail" />

                    <input className={styles["container__form-input"]} type="password" name="password" placeholder="Password" />

                    <input className={styles["container__form-input"]} type="password" name="passwordOK" placeholder="Password check" />
                    <button className={styles["container__form-button"]} >
                        Send
                    </button>
                </form>
                <img className={styles["container__img"]} src={regiFormImg} alt="Registration illustration" />
            </div>
        </>
    )
}
