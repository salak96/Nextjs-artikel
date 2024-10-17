"use strict";
exports.__esModule = true;
exports.commentFormSchema = exports.commentDeleteSchema = exports.commentSchema = void 0;
var z = require("zod");
exports.commentSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    comment: z.string()
});
exports.commentDeleteSchema = z.object({
    id: z.string(),
    userId: z.string()
});
exports.commentFormSchema = z.object({
    comment: z
        .string()
        .min(3, { message: 'Comment must be at least 3 characters long.' })
        .max(500, { message: 'Comment must be at most 500 characters long.' })
});
