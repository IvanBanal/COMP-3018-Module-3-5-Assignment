import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { HTTP_STATUS } from "../../../constants/httpConstants"

/**
 * Validation for middleware.
 * @param schema - Joi schema to validate the request body against.
 */
export const validate = 
    (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const {error, value } = schema.validate(req.body);

        if (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: `Validation error: ${error.message}`,
            });
            return;
        }

        // This will apply defaults.
        req.body = value;
        next();
    };