import { Input } from "@/components/ui/input";

interface GradeInputProps {
  value: number;
  onValueChange: (value: number) => void;
  maxPoints: number;
}

const GradeInput = ({ value, onValueChange, maxPoints }: GradeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    const clampedValue = Math.min(Math.max(0, newValue), maxPoints);
    onValueChange(clampedValue);
  };

  const getInputColor = () => {
    const percentage = (value / maxPoints) * 100;
    if (percentage >= 80)
      return "border-green-300 focus:border-green-500 text-green-700";
    if (percentage >= 60)
      return "border-yellow-300 focus:border-yellow-500 text-yellow-700";
    if (percentage >= 40)
      return "border-orange-300 focus:border-orange-500 text-orange-700";
    return "border-red-300 focus:border-red-500 text-red-700";
  };

  return (
    <div className="flex flex-col items-center">
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        min={0}
        max={maxPoints}
        className={`w-16 h-8 text-center text-sm ${getInputColor()}`}
      />
      <span className="text-xs text-gray-500 mt-1">/{maxPoints}</span>
    </div>
  );
};

export default GradeInput;
