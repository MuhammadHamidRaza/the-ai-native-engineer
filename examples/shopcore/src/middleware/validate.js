import { AppError } from '../lib/errors.js';

// validateBody(schema) -> middleware that parses req.body with a zod schema.
// On success, req.body is REPLACED by the parsed data (coercions applied).
export const validateBody = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    return next(new AppError(400, 'VALIDATION', message));
  }
  req.body = result.data;
  next();
};
