import React from 'react';
import './AnswerKey.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';

const AnswerKey = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/error');
        }
    }, []);

    const [questions] = useState([
        { A: true, B: false, C: false, D: false, E: false },
        { A: false, B: true, C: false, D: false, E: false },
        { A: true, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: true },
        { A: false, B: false, C: true, D: false, E: false },
        { A: false, B: false, C: false, D: true, E: false },
        { A: false, B: true, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: true, E: false },
        { A: true, B: false, C: false, D: false, E: false },
        { A: false, B: false, C: false, D: false, E: true },
    ]);

    return (
        <div className="AnswerKey">
            <Header />
            <h3>MODELO DE GABARITO</h3>

            <div className="answer-key-container">
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
                <div className="add-model">
                    <h2>ADICIONAR MODELO NOVO DE GABARITO</h2>
                    <div class="add-model-circle">
                        <Link to="/new-answer-key" className="link">
                            <span class="plus">+</span>
                        </Link>
                    </div>
                </div>            </div>
        </div>
    );
}

export default AnswerKey;