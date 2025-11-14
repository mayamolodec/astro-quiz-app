import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

import styles from "./Header.module.scss"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth();
    let userStatus = user? "auth": "unauth";

    return <nav className={styles.container}>
        <div className={styles["container__left"]}>
            <Link to="/ListQuizzes">
                <img className={styles["container__left-img"]} alt="Go to homepage" src="/favicon.svg" />
            </Link>
            <div className={`${styles["container__left-links"]}  ${isOpen ? styles.show : ""}` } onClick={() => setIsOpen(false)}>
                <Link to="/ListQuizzes" >Quizzes</Link>
                {/* <Link to="/ListQuizzes" >Raiting</Link> */}
            </div>
            <button className={styles["container__left-burger"]} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                <img className={styles["container__left-img"]} src="/burger.svg" alt="Menu" />
            </button>
        </div>

        <div className={styles["container__right"]}>
            <div className={styles["container__right-menu"]} >
                <Link to="/profile" >Profile</Link>
                <img className={styles["container__right-img"]} src={`/avatar_${userStatus}.png`} />
            </div>
        </div>
    </nav>
}
