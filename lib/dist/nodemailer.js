"use strict";
exports.__esModule = true;
exports.transporter = exports.smtpPassword = exports.smtpEmail = void 0;
var nodemailer_1 = require("nodemailer");
var nodemailer_smtp_transport_1 = require("nodemailer-smtp-transport");
exports.smtpEmail = process.env.GOOGLE_EMAIL;
exports.smtpPassword = process.env.GOOGLE_PASSWORD;
exports.transporter = nodemailer_1["default"].createTransport(nodemailer_smtp_transport_1["default"]({
    service: 'gmail',
    auth: {
        user: exports.smtpEmail,
        pass: exports.smtpPassword
    }
}));
