import React from 'react';

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
                <th>Aluno</th>
                <th>Disciplina</th>
                <th>Avaliação</th>
                <th>Nota</th>
                {/*&nbsp; = char especial do html para algo ficar vazio (non break space) */}
                <th>&nbsp;</th>
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
                      <td>{value}</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
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
