import React from 'react';
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {
  //Array tableGrades compõe diversos arrays agrupados por nome e disciplina
  const tableGrades = [];

  let currentStudent = grades[0].student,
    currentSubject = grades[0].subject,
    currentGrades = [],
    id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });
      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) currentStudent = grade.student;

    currentGrades.push(grade);
  });
  //Após o loop, inserir o último elemento
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });
  console.log(tableGrades);

  //O materialize fornece a classe 'striped', que distingue uma linha da outra:
  return (
    <div className="container">
      {tableGrades.map(({ id, grades }) => {
        return (
          <table className="striped" key={id}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action id-id type={isDeleted ? 'add' : 'edit'} />
                          {!isDeleted && <Action type="delete" />}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot></tfoot>
          </table>
        );
      })}
    </div>
  );
}
