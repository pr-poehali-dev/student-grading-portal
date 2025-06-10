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
  const [group, setGroup] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && group.trim()) {
      onAddStudent({
        name: name.trim(),
        group: group.trim(),
        grades: {},
      });
      setName("");
      setGroup("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          ➕ Добавить студента
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-purple-900">Новый студент</DialogTitle>
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
              className="border-gray-300 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Группа
            </label>
            <Input
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Например: ИВТ-21"
              className="border-gray-300 focus:border-purple-500"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={!name.trim() || !group.trim()}
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
