import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetCurrentUserQuery } from "../../store/quizApi";

import styles from "./Header.module.scss"

export default function Header() {
    const { error } = useGetCurrentUserQuery();
    const [isOpen, setIsOpen] = useState(false)

    let userStatus = error ? "unauth" : "auth";

    return <nav className={styles.container}>
        <div className={styles["container__left"]}>
            <Link to="/ListQuizzes">
                <img className={styles["container__left-img"]} alt="Go to homepage" src="/public/favicon.svg" />
            </Link>
            <div className={`${styles["container__left-links"]} ${isOpen ? styles.show : ""}`}>
                <Link to="/ListQuizzes" >Quizzes</Link>
                <Link to="/ListQuizzes" >Raiting</Link>
            </div>
            <button className={styles["container__left-burger"]} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                ☰
            </button>
        </div>

        <div className={styles["container__right"]}>
            <div className={styles["container__right-menu"]} >
                <Link to="/Profile" >Profile</Link>
                <img className={styles["container__right-img"]} src={`/public/avatar_${userStatus}.png`} />
            </div>
        </div>
    </nav>
}
