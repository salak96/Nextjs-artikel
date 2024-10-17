"use strict";
exports.__esModule = true;
exports.contactFormSchema = exports.emailSchema = void 0;
var z = require("zod");
// Email validation schame for newsletter
exports.emailSchema = z.object({
    email: z.string().email({ message: 'Email is required.' })
});
// Contact form validation schema
exports.contactFormSchema = z.object({
    name: z.string().min(3, { message: 'Name is required' }),
    email: z.string().email({ message: 'Email is required.' }),
    message: z
        .string()
        .min(4, {
        message: 'Your message must be at least 4 characters long.'
    })
        .max(320, {
        message: 'Your message cannot be more than 320 characters long.'
    })
});
