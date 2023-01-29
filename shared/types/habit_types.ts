export type Habit = {
  id: number;
  title: string;
  description: string;
  streak: number;
  is_deleted: boolean;
  last_completed: Date;
};
