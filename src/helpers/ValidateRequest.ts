import Joi from "joi";

export const validateRequest =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0]?.message });
    }
    next();
  };
