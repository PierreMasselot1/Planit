export type Habit = {
  id: number;
  title: string;
  description: string;
  streak: number;
  completion_count: number;
  is_deleted: boolean;
  last_completed: Date | undefined;
};
