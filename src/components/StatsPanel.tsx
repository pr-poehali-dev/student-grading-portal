import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Student } from "@/types/student";

interface StatsPanelProps {
  students: Student[];
}

const StatsPanel = ({ students }: StatsPanelProps) => {
  const totalStudents = students.length;
  const subjects = ["Математика", "Физика", "Программирование", "История"];

  const getAverageGrade = (subject: string) => {
    const grades = students
      .map((student) => student.grades[subject])
      .filter((grade) => grade !== undefined);

    if (grades.length === 0) return 0;
    return (
      Math.round(
        (grades.reduce((sum, grade) => sum + grade, 0) / grades.length) * 10,
      ) / 10
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-purple-700">
            Всего студентов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">
            {totalStudents}
          </div>
        </CardContent>
      </Card>

      {subjects.slice(0, 3).map((subject) => (
        <Card
          key={subject}
          className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-700">
              Средняя по {subject}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {getAverageGrade(subject)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsPanel;
