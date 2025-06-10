import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Student } from "@/types/student";

interface AddStudentDialogProps {
  onAddStudent: (student: Omit<Student, "id">) => void;
}

const AddStudentDialog = ({ onAddStudent }: AddStudentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddStudent({
        name: name.trim(),
        grades: { attendance: 0, activity: 0, assignments: 0, exam: 0 },
      });
      setName("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          style={{ backgroundColor: "#004D85" }}
          className="hover:bg-blue-800 text-white"
        >
          ➕ Добавить студента
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ color: "#004D85" }}>Новый студент</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Имя студента
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя..."
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex-1 hover:bg-blue-800"
              style={{ backgroundColor: "#004D85" }}
              disabled={!name.trim()}
            >
              Добавить
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
