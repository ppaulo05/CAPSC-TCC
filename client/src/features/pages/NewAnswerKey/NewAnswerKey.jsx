import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewAnswerKey.css';
import { Header } from "../../../components/Header/Header";
import React, { useState } from "react";
import AnswerKeyTemplate from "../../../components/AnswerKeyTemplate/AnswerKeyTemplate.jsx";

const NewAnswerKey = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/error');
        }
    }, []);

    const [questionsTemplate1, setQuestionsTemplate1] = useState([
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
    ]);

    const [questionsTemplate2, setQuestionsTemplate2] = useState([
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: false },
    ]);

    const [errorMessage, setErrorMessage] = useState("");

    const handleCellClickTemplate1 = (rowIndex, answerKey) => {
        setQuestionsTemplate1((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[rowIndex] = { ...updatedQuestions[rowIndex] };
            updatedQuestions[rowIndex][answerKey] = !updatedQuestions[rowIndex][answerKey];
            return updatedQuestions;
        });
    };

    const handleCellClickTemplate2 = (rowIndex, answerKey) => {
        setQuestionsTemplate2((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[rowIndex] = { ...updatedQuestions[rowIndex] };
            updatedQuestions[rowIndex][answerKey] = !updatedQuestions[rowIndex][answerKey];
            return updatedQuestions;
        });
    };

    const addQuestion = () => {
        if (questionsTemplate1.length < 15) {
            setQuestionsTemplate1([...questionsTemplate1, { A: false, B: false, C: false, D: false, E: false }]);
            setQuestionsTemplate2([...questionsTemplate2, { A: false, B: false, C: false, D: false, E: false }]);
        } else {
            setErrorMessage("Máximo de 15 questões por gabarito!");
        }
    };

    const generateAnswerKey = (event) => {
        event.preventDefault();
        try {
            const answerKeyData = {
                template1: questionsTemplate1,
                template2: questionsTemplate2,
            };

            localStorage.setItem('answerKeyData', JSON.stringify(answerKeyData));
            console.log('Attempting to navigate to /generated-answerKey');
            console.log(JSON.stringify(answerKeyData));
            navigate('/generated-answer-key');
        } catch (error) {
            console.error('An error occurred during navigation:', error);
        }
    };


    return (
        <div className="NewAnswerKey">
            <Header />

            <div className="answer-key-box">
                <div className="answer-key">
                    <h3>GABARITO 1</h3>
                    <AnswerKeyTemplate questions={questionsTemplate1} handleCellClick={handleCellClickTemplate1} />
                </div>
                <div className="answer-key">
                    <h3>GABARITO 2</h3>
                    <AnswerKeyTemplate questions={questionsTemplate2} handleCellClick={handleCellClickTemplate2} />
                </div>
            </div>
            <div className="button-container">
                <button type="button" onClick={addQuestion}>ADICIONAR NOVA QUESTÃO</button>
                <button type="button" onClick={generateAnswerKey}>GERAR GABARITO</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default NewAnswerKey;
