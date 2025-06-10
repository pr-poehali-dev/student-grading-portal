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
      grades: { attendance: 16, activity: 15, assignments: 38, exam: 18 },
    },
    {
      id: "2",
      name: "Петрова Мария",
      group: "ИВТ-21",
      grades: { attendance: 18, activity: 17, assignments: 42, exam: 19 },
    },
    {
      id: "3",
      name: "Сидоров Дмитрий",
      group: "ИВТ-22",
      grades: { attendance: 12, activity: 10, assignments: 25, exam: 14 },
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
    component: keyof Student["grades"],
    points: number,
  ) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, grades: { ...student.grades, [component]: points } }
          : student,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              📊 Ведомость по дисциплине
            </h1>
            <p className="text-slate-600">
              Комплексная система оценивания с компонентами баллов
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
