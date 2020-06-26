import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import * as api from '../api/apiService';

//vamos inserir na div com id root (em index.html)
Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;

  //selectedGrade.value = valor da nota
  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const valide = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };
    // valide();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if ((gradeValue, minValue || gradeValue > maxValue)) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }
    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {};

  const handleClose = () => {
    onClose(null);
  };

  const handleGradeChange = (event) => {
    // console.log(event.target.value);
    console.log(gradeValidation);
    setGradeValue(+event.target.value); //+ ou Number
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}></form>

        <div className="input-field">
          <input id="inputName" type="text" value={student} readOnly />
          <label className="active" htmlFor="inputName">
            Nome do aluno:
          </label>
        </div>

        <div className="input-field">
          <input id="inputSubject" type="text" value={subject} readOnly />
          <label className="active" htmlFor="inputName">
            Disciplina
          </label>
        </div>

        <div className="input-field">
          <input id="inputType" type="text" value={type} readOnly />
          <label className="active" htmlFor="inputName">
            Tipo de Avaliação
          </label>
        </div>

        <div className="input-field">
          <input
            id="inputGrade"
            type="number"
            min={gradeValidation.minValue}
            max={gradeValidation.maxValue}
            step="1"
            autoFocus
            value={gradeValue}
            onChange={handleGradeChange}
          />
          <label className="active" htmlFor="inputGrade">
            Nota:
          </label>
        </div>

        <div style={styles.flexRow}>
          <button
            className="waves-effect waves-light btn"
            disabled={errorMessage.trim() !== ''}
          >
            Salvar
          </button>
          <span style={styles.errorMessage}>{errorMessage}</span>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContents: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rm',
    fontWeight: 'bold',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
};
