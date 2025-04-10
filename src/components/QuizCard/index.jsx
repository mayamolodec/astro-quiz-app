import React from "react";
import { useParams } from "react-router-dom"

export default function QuizCard() {
    const { id } = useParams();

    return <h1>Quiz Card {id}</h1>
}
