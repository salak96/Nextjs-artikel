"use strict";
exports.__esModule = true;
exports.profileSchema = exports.profileFormSchema = void 0;
var z = require("zod");
exports.profileFormSchema = z.object({
    firstName: z
        .string()
        .min(2, {
        message: "Firstname must be at least 2 characters."
    })
        .max(30, {
        message: "Firstname must not be longer than 30 characters."
    }),
    lastName: z
        .string()
        .min(2, {
        message: "Lastname must be at least 2 characters."
    })
        .max(30, {
        message: "Lastname must not be longer than 30 characters."
    }),
    userName: z.string().optional(),
    email: z.string().email().optional(),
    avatarUrl: z.string().url().optional(),
    website: z.string().optional()
});
exports.profileSchema = z.object({
    id: z.string(),
    fistName: z.string(),
    lastName: z.string(),
    email: z.string().email().optional(),
    userName: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    website: z.string().optional()
});
