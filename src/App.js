import React, { useState, useEffect } from 'react';
import './App.css';

import * as api from './api/apiService';
import Spinner from './components/Spinner';

import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
import GradesControl from './components/GradesControl';
import ModalGrade from './components/ModalGrade';

// export default function App() {
function App() {
  // teste da api removido
  //usando hooks:
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   api.getAllGrades().then((grades) => setAllGrades(grades));
  // }, []);
  //FORÇANDO ATRASO PARA VER CARREGANDO: (usando async await)
  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 200);
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

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);
    console.log(isDeleted);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      const newGrades = [...allGrades]; //cópia do objeto
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };

  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handlePersistData = () => {};
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      {/* <div className="container"> */}
      <header className="App-header">
        <h1 className="center">Controle de notas</h1>
        {allGrades.length === 0 && <Spinner />}
        {allGrades.length > 0 && (
          <GradesControl
            grades={allGrades}
            onDelete={handleDelete}
            onPersist={handlePersist}
          />
        )}

        {isModalOpen && (
          <ModalGrade
            onSave={handlePersistData}
            onClose={handleClose}
            selectedGrade={selectedGrade}
          />
        )}
      </header>
    </div>
  );
}

export default App; //pode dar o export antes de function
