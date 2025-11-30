// TaskModel.ts
export interface Task {
  name: string;
  subject: string;
  priority: number;
  date?: Date;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
