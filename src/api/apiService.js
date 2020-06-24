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

  let maxId = -1;
  grades.forEach(({ id }) => {
    if (id > maxId) maxId = id;
  });
  let nextId = grades.length + 1;

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
      return (
        grade.subject === subject &&
        grade.student === student &&
        grade.type === type
      );
    });

    //Popula as combinações que não estão na api:
    if (!hasItem) {
      //Chegam aqui as combinações excluídas. Cada uma deve ser
      //exibida na tela posteriormente, mas com o traço ao invés
      //da nota e o símbolo de '+' para possibilitar a inserção.
      grades.push({
        id: nextId + 1,
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

  //Ordenar por: (obs: os últimos [a ordenar] serão os primeiros [mostrados])
  //  1) type
  //  2) subject
  //  3) student
  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  return grades;
}

async function insertGrade(grade) {
  const response = await axios.post(API_URL, grade);
  return response.data.id;
}

//recebe uma nota, grava na API e retorna os dados recebidos da API
async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);
  return response.data;
}

async function deleteGrade(grade) {
  const response = await axios.delete(`${API_URL}/${grade.id}`);
  return response.data;
}

//recebe um tipo de nota, busca em GRADE_VALIDATION e retorna min e max Value
async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find(
    (item) => item.gradeType === gradeType
  );
  const { minValue, maxValue } = gradeValidation;
  return { minValue: minValue, maxValue: maxValue };
}

export {
  getAllGrades,
  insertGrade,
  updateGrade,
  deleteGrade,
  getValidationFromGradeType,
};
