import React from 'react';

export default function GradesControl({ grades, onDelete, onPersist }) {
  //TODO: array tableGrades compondo diversos arrays agrupados por nome e disciplina,
  //para não deixar tudo jogado em uma tabela só, como está no momento

  //O materialize fornece a classe 'striped', que distingue uma linha da outra:
  return (
    <div className="container">
      <table className="striped">
        <thead>
          <th>Aluno</th>
          <th>Disciplina</th>
          <th>Avaliação</th>
          <th>Nota</th>
          {/*&nbsp; = char especial do html para algo ficar vazio (non break space) */}
          <th>&nbsp;</th>
        </thead>
        <tbody>
          {grades.map(({ id, subject, student, type, value, isDeleted }) => {
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
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
