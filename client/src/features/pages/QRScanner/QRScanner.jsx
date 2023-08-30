import React, { useEffect, useState } from 'react';
import { Header } from '../../../components/Header/Header';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useLocation } from 'react-router-dom';
import './QRScanner.css';

const QRScanner = () => {
  const [scanResults, setScanResults] = useState([]);
  const [questionsTemplate, setQuestionsTemplate] = useState([]);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedCPF, setScannedCPF] = useState(null); // Novo estado para armazenar o CPF escaneado
  const location = useLocation();

  useEffect(() => {
    const storedData = localStorage.getItem('answerKeyData');
    if (storedData) {
      const { template1, template2 } = JSON.parse(storedData);
      if (location.search.includes('template=1')) {
        setQuestionsTemplate(template1);
      } else if (location.search.includes('template=2')) {
        setQuestionsTemplate(template2);
      }
    } else {
      // Navegue para onde for apropriado se o answerKeyData não estiver disponível
    }

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 5,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      const scannedCPF = result;
    
      if (!scanResults.some(item => item.cpf === scannedCPF) && !isModalOpen) {
        setScore(0); // Resetar a pontuação
        setScannedCPF(scannedCPF); // Armazenar o CPF escaneado
        setIsModalOpen(true); // Abrir o modal apenas se for um CPF novo
      }
    }

    function error(err) {
      //console.warn(err);
    }

    return () => {
      isScanning = false;
    };
  }, [location.search]);

  const handleScoreSubmit = () => {
    const newResult = { cpf: scannedCPF, score }; // Usar o CPF escaneado aqui
    setScanResults(prevResults => [...prevResults, newResult]);
    setIsModalOpen(false); // Fechar o modal
    setScannedCPF(null); // Resetar o CPF escaneado após a inserção
  };

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
    <div className="QRScanner">
      <Header />
      <div className="scanner-container">
        <h1></h1>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className="scan-results" style={{ width: '33%' }}>
            <h2>Correções:</h2>
            <table className="results-table">
              <thead>
                <tr>
                  <th>CPF</th>
                  <th>Pontuação</th>
                </tr>
              </thead>
              <tbody>
                {scanResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.cpf}</td>
                    <td>{result.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="reader" style={{ width: '33%' }}></div>
          <div className="answer-key" style={{ width: '33%' }}>
            <h3>Gabarito</h3>
            {renderAnswerKey(questionsTemplate)}
          </div>
        </div>
      </div>
      {/* Modal de inserção de pontuação */}
      {isModalOpen && (
        <div className="modal">
          <h2>Insira a Pontuação</h2>
          <input
            type="number"
            value={score}
            onChange={e => setScore(e.target.value)}
          />
          <button onClick={handleScoreSubmit}>Enviar Pontuação</button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
