import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import './GeneratedAnswerKey.css';

const GeneratedAnswerKey = () => {
    const navigate = useNavigate();
    const [questionsTemplate1, setQuestionsTemplate1] = useState([]);
    const [questionsTemplate2, setQuestionsTemplate2] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/error');
        }

        const storedData = localStorage.getItem('answerKeyData');
        if (storedData) {
            const { template1, template2 } = JSON.parse(storedData);
            setQuestionsTemplate1(template1);
            setQuestionsTemplate2(template2);
        } else {
            navigate('/new-answer-key');
        }
    }, []);

    const renderAnswerKey = (questions) => (
        <table>
            <thead>
                <tr>
                    <th>QUESTÃO</th>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                </tr>
            </thead>
            <tbody>
                {questions.map((question, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {['A', 'B', 'C', 'D', 'E'].map((answerKey) => (
                            <td key={answerKey}>
                                {question[answerKey] ? <div className="circle"></div> : ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="GeneratedAnswerKey">
            <Header />

            <div className="answer-key-box">
                <div className="answer-key">
                    <h3>GABARITO 1</h3>
                    {renderAnswerKey(questionsTemplate1)}
                </div>
                <div className="answer-key">
                    <h3>GABARITO 2</h3>
                    {renderAnswerKey(questionsTemplate2)}
                </div>
            </div>
            <div className="button-container">
                <Link to="/qr-scanner?template=1">
                    <button type="button">REALIZAR CORREÇÕES PELO GABARITO 1</button>
                </Link>
                <Link to="/qr-scanner?template=2">
                    <button type="button">REALIZAR CORREÇÕES PELO GABARITO 2</button>
                </Link>
            </div>
            <div className="link-container">
                <Link to="/new-answer-key">VOLTAR</Link>
            </div>
        </div >
    );
};

export default GeneratedAnswerKey;
