import Joi from "joi";

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

export const TaskSchema = Joi.object<Task>({
  name: Joi.string().min(3).max(30).required(),
  subject: Joi.string().min(3).max(30).required(),
  priority: Joi.number().min(1).max(5).required(),
  date: Joi.date().optional(),
  coordinates: Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number(),
  }).optional(),
});
