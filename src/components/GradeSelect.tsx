import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GradeSelectProps {
  value: number | undefined;
  onValueChange: (value: number) => void;
  maxGrade?: number;
}

const GradeSelect = ({
  value,
  onValueChange,
  maxGrade = 5,
}: GradeSelectProps) => {
  const grades = Array.from({ length: maxGrade }, (_, i) => i + 1);

  const getGradeColor = (grade: number) => {
    if (grade >= 4) return "text-green-600";
    if (grade >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Select
      value={value?.toString() || ""}
      onValueChange={(val) => onValueChange(parseInt(val))}
    >
      <SelectTrigger className="w-20 h-8">
        <SelectValue placeholder="—" />
      </SelectTrigger>
      <SelectContent>
        {grades.map((grade) => (
          <SelectItem
            key={grade}
            value={grade.toString()}
            className={getGradeColor(grade)}
          >
            {grade}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GradeSelect;
