"use strict";
exports.__esModule = true;
exports.imageDeleteSchema = void 0;
var z = require("zod");
exports.imageDeleteSchema = z.object({
    userId: z.string(),
    postId: z.string(),
    fileName: z.string()
});
