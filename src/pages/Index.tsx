import { useState } from "react";
import { Student } from "@/types/student";
import StatsPanel from "@/components/StatsPanel";
import StudentTable from "@/components/StudentTable";
import AddStudentDialog from "@/components/AddStudentDialog";

const Index = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Иванов Алексей",
      group: "ИВТ-21",
      grades: { Математика: 4, Физика: 5, Программирование: 4 },
    },
    {
      id: "2",
      name: "Петрова Мария",
      group: "ИВТ-21",
      grades: { Математика: 5, Программирование: 5, История: 4 },
    },
    {
      id: "3",
      name: "Сидоров Дмитрий",
      group: "ИВТ-22",
      grades: { Физика: 3, История: 4 },
    },
  ]);

  const handleAddStudent = (studentData: Omit<Student, "id">) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
    };
    setStudents([...students, newStudent]);
  };

  const handleUpdateGrade = (
    studentId: string,
    subject: string,
    grade: number,
  ) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, grades: { ...student.grades, [subject]: grade } }
          : student,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              📊 Ведомость студентов
            </h1>
            <p className="text-slate-600">
              Управление оценками и успеваемостью студентов
            </p>
          </div>
          <AddStudentDialog onAddStudent={handleAddStudent} />
        </div>

        <StatsPanel students={students} />
        <StudentTable students={students} onUpdateGrade={handleUpdateGrade} />
      </div>
    </div>
  );
};

export default Index;
