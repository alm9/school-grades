import axios from 'axios';

// obs: no backend foi escolhida a porta 3001
const API_URL = 'http://localhost:3001/grade/';

const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafio',
    minValue: 0,
    maxValue: 50,
  },
];

//pegar dados da API e formatar
async function getAllGrades() {
  //vantagem do axios invés de fetch: formato já vem em json
  const res = await axios.get(API_URL);
  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade;
    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    };
  });
  //uma característica de conjunto (Set) é que não há repetição
  let allStudents = new Set();
  //TODO: look after homonyms (tratar homônimos)
  grades.forEach((grade) => allStudents.add(grade.student));
  allStudents = Array.from(allStudents);

  let allSubjects = new Set();
  grades.forEach((grade) => allSubjects.add(grade.subject));
  allSubjects = Array.from(allSubjects);

  let allGradeTypes = new Set();
  grades.forEach((grade) => allGradeTypes.add(grade.type));
  allGradeTypes = Array.from(allGradeTypes);

  const allCombinations = [];
  allStudents.forEach((student) => {
    allSubjects.forEach((subject) => {
      allGradeTypes.forEach((type) => {
        allCombinations.push({
          student,
          subject,
          type,
        });
      });
    });
  });

  //Pega todas combinações de aluno, disciplina e notas:
  allCombinations.forEach(({ student, subject, type }) => {
    const hasItem = grades.find((grade) => {
      grade.subject === subject &&
        grade.student === student &&
        grade.type === type;
    });

    //Verifica se as combinações anteriores não estão na api:
    if (!hasItem) {
      //Chegam aqui as combinações excluídas. Cada uma deve ser
      //exibida na tela posteriormente, mas com o traço ao invés
      //da nota e o símbolo de '+' para possibilitar a inserção.
      grades.push({
        id: grades.length + 1,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      });
    }
  });

  return allCombinations;
}

export { getAllGrades };
