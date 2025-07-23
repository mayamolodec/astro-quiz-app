import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss"

export default function Header() {

    return <nav className={styles.container}>
        <ul className={styles["container__left"]}>
            <li>
                <Link to="/ListQuizzes">Logo</Link>
            </li>
            <li>
                <Link to="/ListQuizzes">Logo</Link>
            </li>
            <li>
                <Link to="/ListQuizzes">Logo</Link>
            </li>
        </ul>

        <Link to="/Profile">Profile</Link>
    </nav>
}
