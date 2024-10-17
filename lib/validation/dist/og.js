"use strict";
exports.__esModule = true;
exports.ogImageSchema = void 0;
var z = require("zod");
exports.ogImageSchema = z.object({
    title: z.string(),
    subTitle: z.string(),
    tags: z.string().array(),
    slug: z.string()
});
