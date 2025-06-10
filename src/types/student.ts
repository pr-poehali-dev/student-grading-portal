export interface Student {
  id: string;
  name: string;
  group: string;
  grades: {
    [subject: string]: number;
  };
}

export interface Subject {
  id: string;
  name: string;
  maxGrade: number;
}
