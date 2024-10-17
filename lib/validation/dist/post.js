"use strict";
exports.__esModule = true;
exports.postUpdateSchema = exports.postEditFormSchema = exports.postEditFormContentSchema = exports.postParamSchema = exports.postCreateSchema = exports.postSlugSchema = exports.postDeleteSchema = void 0;
var zod_1 = require("zod");
exports.postDeleteSchema = zod_1["default"].object({
    id: zod_1["default"].string(),
    user_id: zod_1["default"].string()
});
exports.postSlugSchema = zod_1["default"].object({
    slug: zod_1["default"].string()
});
exports.postCreateSchema = zod_1["default"].object({
    title: zod_1["default"].string(),
    user_id: zod_1["default"].string()
});
exports.postParamSchema = zod_1["default"].object({
    postId: zod_1["default"].string(),
    userId: zod_1["default"].string()
});
exports.postEditFormContentSchema = zod_1["default"].object({
    content: zod_1["default"].any().optional()
});
exports.postEditFormSchema = zod_1["default"].object({
    title: zod_1["default"]
        .string()
        .min(2, {
        message: "Title must be at least 2 characters."
    })
        .max(120, {
        message: "Title must not be longer than 120 characters."
    }),
    slug: zod_1["default"]
        .string()
        .min(2, {
        message: "Slug must be at least 2 characters."
    })
        .max(100, {
        message: "Slug must not be longer than 100 characters."
    }),
    categoryId: zod_1["default"].string({
        required_error: "Please select a category."
    }),
    image: zod_1["default"].string().optional(),
    description: zod_1["default"]
        .string()
        .min(2, {
        message: "Description must be at least 2 characters."
    })
        .max(300, {
        message: "Description must not be longer than 300 characters."
    }),
    content: zod_1["default"].any().optional()
});
exports.postUpdateSchema = zod_1["default"].object({
    id: zod_1["default"].string(),
    title: zod_1["default"].string(),
    slug: zod_1["default"].string(),
    categoryId: zod_1["default"].string(),
    image: zod_1["default"].string().optional(),
    description: zod_1["default"].string().optional(),
    content: zod_1["default"].any().optional()
});
