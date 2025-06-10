import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Subject, SUBJECTS } from "@/types/student";

interface SubjectSelectorProps {
  currentSubject: Subject;
  onSubjectChange: (subject: Subject) => void;
}

const SubjectSelector = ({
  currentSubject,
  onSubjectChange,
}: SubjectSelectorProps) => {
  const handleValueChange = (subjectId: string) => {
    const subject = SUBJECTS.find((s) => s.id === subjectId);
    if (subject) {
      onSubjectChange(subject);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">
        Выберите дисциплину
      </label>
      <Select value={currentSubject.id} onValueChange={handleValueChange}>
        <SelectTrigger className="w-64 border-slate-300 focus:border-blue-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SUBJECTS.map((subject) => (
            <SelectItem key={subject.id} value={subject.id}>
              <div className="flex flex-col">
                <span className="font-medium">{subject.name}</span>
                <span className="text-xs text-slate-500">{subject.group}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectSelector;
