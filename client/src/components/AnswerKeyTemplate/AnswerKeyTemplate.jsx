import React from 'react';

const AnswerKeyTemplate = ({ questions, handleCellClick }) => {
    return (
        <div className="answer-key">
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
                                <td key={answerKey} onClick={() => handleCellClick(index, answerKey)}>
                                    {question[answerKey] ? <div className="circle"></div> : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnswerKeyTemplate;