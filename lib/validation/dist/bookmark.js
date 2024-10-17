"use strict";
exports.__esModule = true;
exports.bookmarkSchema = void 0;
var z = require("zod");
exports.bookmarkSchema = z.object({
    id: z.string(),
    user_id: z.string()
});
