import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Student,
  calculateTotalPoints,
  calculateFinalGrade,
} from "@/types/student";

interface StatsPanelProps {
  students: Student[];
}

const StatsPanel = ({ students }: StatsPanelProps) => {
  const totalStudents = students.length;

  const getAveragePoints = () => {
    if (students.length === 0) return 0;
    const totalPoints = students.reduce(
      (sum, student) => sum + calculateTotalPoints(student.grades),
      0,
    );
    return Math.round((totalPoints / students.length) * 10) / 10;
  };

  const getAverageFinalGrade = () => {
    if (students.length === 0) return 0;
    const totalGrades = students.reduce(
      (sum, student) =>
        sum + calculateFinalGrade(calculateTotalPoints(student.grades)),
      0,
    );
    return Math.round((totalGrades / students.length) * 10) / 10;
  };

  const getPassingRate = () => {
    if (students.length === 0) return 0;
    const passingStudents = students.filter(
      (student) =>
        calculateFinalGrade(calculateTotalPoints(student.grades)) >= 3,
    ).length;
    return Math.round((passingStudents / students.length) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-700">
            Всего студентов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {totalStudents}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-slate-700">
            Средний балл
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">
            {getAveragePoints()}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-green-700">
            Средняя оценка
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {getAverageFinalGrade()}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-emerald-700">
            Успеваемость
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">
            {getPassingRate()}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
