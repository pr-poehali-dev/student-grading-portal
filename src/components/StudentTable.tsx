import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Student,
  GRADE_COMPONENTS,
  calculateTotalPoints,
  calculateFinalGrade,
} from "@/types/student";
import GradeInput from "./GradeInput";

interface StudentTableProps {
  students: Student[];
  onUpdateGrade: (
    studentId: string,
    component: keyof Student["grades"],
    points: number,
  ) => void;
}

const StudentTable = ({ students, onUpdateGrade }: StudentTableProps) => {
  const getFinalGradeColor = (grade: number) => {
    if (grade >= 4) return "text-green-600 font-bold";
    if (grade >= 3) return "text-yellow-600 font-semibold";
    if (grade >= 1) return "text-orange-600 font-medium";
    return "text-red-600 font-medium";
  };

  const getTotalPointsColor = (points: number) => {
    if (points >= 90) return "text-green-600 font-bold";
    if (points >= 75) return "text-yellow-600 font-semibold";
    if (points >= 60) return "text-orange-600 font-medium";
    return "text-red-600 font-medium";
  };

  return (
    <Card className="overflow-hidden border-slate-200 shadow-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow
              style={{ backgroundColor: "#004D85" }}
              className="border-blue-700"
            >
              <TableHead className="font-semibold text-white w-48">
                Студент
              </TableHead>
              <TableHead className="font-semibold text-white w-24">
                Группа
              </TableHead>
              {GRADE_COMPONENTS.map((component) => (
                <TableHead
                  key={component.key}
                  className="font-semibold text-white text-center w-24"
                >
                  {component.name}
                </TableHead>
              ))}
              <TableHead className="font-semibold text-white text-center w-24">
                Всего
              </TableHead>
              <TableHead className="font-semibold text-white text-center w-24">
                Оценка
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={GRADE_COMPONENTS.length + 4}
                  className="text-center text-gray-500 py-8"
                >
                  📚 Пока нет студентов. Добавьте первого!
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => {
                const totalPoints = calculateTotalPoints(student.grades);
                const finalGrade = calculateFinalGrade(totalPoints);
                return (
                  <TableRow
                    key={student.id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {student.group}
                    </TableCell>
                    {GRADE_COMPONENTS.map((component) => (
                      <TableCell key={component.key} className="text-center">
                        <GradeInput
                          value={student.grades[component.key]}
                          onValueChange={(points) =>
                            onUpdateGrade(student.id, component.key, points)
                          }
                          maxPoints={component.maxPoints}
                        />
                      </TableCell>
                    ))}
                    <TableCell
                      className={`text-center ${getTotalPointsColor(totalPoints)}`}
                    >
                      {totalPoints}/100
                    </TableCell>
                    <TableCell
                      className={`text-center ${getFinalGradeColor(finalGrade)}`}
                    >
                      {finalGrade}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default StudentTable;
