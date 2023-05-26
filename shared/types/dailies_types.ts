export type Dailies = {
    id: number;
    title: string;
    description: string;
    streak: number;
    completion_count: number;
    is_deleted: boolean;
    completion_dates: Array<Date> | undefined;
};