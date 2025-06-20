export interface Student {
  id: string;
  name: string;
  grades: {
    attendance: number; // посещение (макс 18)
    activity: number; // учебная активность (макс 18)
    assignments: number; // выполненные задания (макс 44)
    exam: number; // экзамен/зачет (макс 20)
  };
}

export interface Subject {
  id: string;
  name: string;
  group: string;
}

export interface GradeComponent {
  key: keyof Student["grades"];
  name: string;
  maxPoints: number;
}

export const GRADE_COMPONENTS: GradeComponent[] = [
  { key: "attendance", name: "Посещение", maxPoints: 18 },
  { key: "activity", name: "Активность", maxPoints: 18 },
  { key: "assignments", name: "Задания", maxPoints: 44 },
  { key: "exam", name: "Экзамен", maxPoints: 20 },
];

export const SUBJECTS: Subject[] = [
  { id: "1", name: "Программирование", group: "ИВТ-21" },
  { id: "2", name: "Базы данных", group: "ИВТ-21" },
  { id: "3", name: "Веб-технологии", group: "ИВТ-21" },
  { id: "4", name: "Математика", group: "ИВТ-22" },
  { id: "5", name: "Физика", group: "ИВТ-22" },
  { id: "6", name: "Алгоритмы", group: "ИВТ-23" },
];

export const calculateTotalPoints = (grades: Student["grades"]): number => {
  return grades.attendance + grades.activity + grades.assignments + grades.exam;
};

export const calculateFinalGrade = (totalPoints: number): number => {
  if (totalPoints >= 90) return 5;
  if (totalPoints >= 75) return 4;
  if (totalPoints >= 60) return 3;
  if (totalPoints >= 50) return 2;
  if (totalPoints >= 25) return 1;
  return 0;
};
