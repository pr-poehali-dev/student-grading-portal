import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Student } from "@/types/student";
import GradeSelect from "./GradeSelect";

interface StudentTableProps {
  students: Student[];
  onUpdateGrade: (studentId: string, subject: string, grade: number) => void;
}

const StudentTable = ({ students, onUpdateGrade }: StudentTableProps) => {
  const subjects = ["Математика", "Физика", "Программирование", "История"];

  const getAverageGrade = (student: Student) => {
    const grades = Object.values(student.grades);
    if (grades.length === 0) return "—";
    const avg = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    return Math.round(avg * 10) / 10;
  };

  const getAverageColor = (avg: number | string) => {
    if (avg === "—") return "text-gray-500";
    const numAvg = typeof avg === "string" ? 0 : avg;
    if (numAvg >= 4) return "text-green-600 font-semibold";
    if (numAvg >= 3) return "text-yellow-600 font-medium";
    return "text-red-600 font-medium";
  };

  return (
    <Card className="overflow-hidden border-slate-200 shadow-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-purple-50 border-purple-100">
              <TableHead className="font-semibold text-purple-900 w-48">
                Студент
              </TableHead>
              <TableHead className="font-semibold text-purple-900 w-24">
                Группа
              </TableHead>
              {subjects.map((subject) => (
                <TableHead
                  key={subject}
                  className="font-semibold text-purple-900 text-center w-24"
                >
                  {subject}
                </TableHead>
              ))}
              <TableHead className="font-semibold text-purple-900 text-center w-24">
                Средняя
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={subjects.length + 3}
                  className="text-center text-gray-500 py-8"
                >
                  📚 Пока нет студентов. Добавьте первого!
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => {
                const avgGrade = getAverageGrade(student);
                return (
                  <TableRow
                    key={student.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {student.group}
                    </TableCell>
                    {subjects.map((subject) => (
                      <TableCell key={subject} className="text-center">
                        <GradeSelect
                          value={student.grades[subject]}
                          onValueChange={(grade) =>
                            onUpdateGrade(student.id, subject, grade)
                          }
                        />
                      </TableCell>
                    ))}
                    <TableCell
                      className={`text-center ${getAverageColor(avgGrade)}`}
                    >
                      {avgGrade}
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
