import React, { useState, useEffect } from 'react';
import './App.css';

import * as api from './api/apiService';

// export default function App() {
function App() {
  // teste da api removido
  //usando hooks:
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModelOpen, setIsModelOpen] = useState(false);

  // useEffect(() => {
  //   api.getAllGrades().then((grades) => setAllGrades(grades));
  // }, []);
  //FORÇANDO ATRASO PARA VER CARREGANDO: (usando async await)
  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    getGrades();
  }, []);
  //faz a mesma coisa que acima, mas usando fetch
  // useEffect(() => {
  //   api.getAllGrades().then((grades) => {
  //     setTimeout(() => {
  //       setAllGrades(grades);
  //     }, 1000);
  //   });
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="container">Controle de notas</h1>
        {allGrades.length > 0 && <p>Notas disponíveis</p>}
        {allGrades.length == 0 && <p>Carregando notas...</p>}
      </header>
    </div>
  );
}

export default App; //pode dar o export antes de function
