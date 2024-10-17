"use strict";
exports.__esModule = true;
exports.getUrlFromString = exports.isValidUrl = exports.delay = exports.toBase64 = exports.shimmer = exports.getUrl = exports.toDateString = exports.getOgImageUrl = exports.getMinutes = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
// Shadcn UI and for Tailwind CSS
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return tailwind_merge_1.twMerge(clsx_1.clsx(inputs));
}
exports.cn = cn;
// Reading Time
function getMinutes(minutes) {
    var roundedMinutes = Math.round(minutes);
    return roundedMinutes + " min";
}
exports.getMinutes = getMinutes;
// Open Graph Images for Twitter and Facebook
function getOgImageUrl(title, subTitle, tags, slug) {
    var uri = [
        "?title=" + encodeURIComponent(title),
        "&subTitle=" + encodeURIComponent(subTitle),
        "" + tags.map(function (tag) { return "&tags=" + encodeURIComponent(tag); }).join(""),
        "&slug=" + encodeURIComponent(slug),
    ].join("");
    return getUrl() + "/api/og" + uri;
}
exports.getOgImageUrl = getOgImageUrl;
// Convert date to string
exports.toDateString = function (date) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};
function getUrl() {
    if (process.env.NODE_ENV === "development") {
        return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    }
    else {
        return process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";
    }
}
exports.getUrl = getUrl;
// BlurData for loading images with blur effect
exports.shimmer = function (w, h) { return "\n<svg width=\"" + w + "\" height=\"" + h + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <defs>\n    <linearGradient id=\"g\">\n      <stop stop-color=\"#d1d5db\" offset=\"20%\" />\n      <stop stop-color=\"#d7dade\" offset=\"50%\" />\n      <stop stop-color=\"#d1d5db\" offset=\"70%\" />\n    </linearGradient>\n  </defs>\n  <rect width=\"" + w + "\" height=\"" + h + "\" fill=\"#d1d5db\" />\n  <rect id=\"r\" width=\"" + w + "\" height=\"" + h + "\" fill=\"url(#g)\" />\n  <animate xlink:href=\"#r\" attributeName=\"x\" from=\"-" + w + "\" to=\"" + w + "\" dur=\"1s\" repeatCount=\"indefinite\"  />\n</svg>"; };
exports.toBase64 = function (str) {
    return typeof window === "undefined"
        ? Buffer.from(str).toString("base64")
        : window.btoa(str);
};
exports.delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
function getUrlFromString(str) {
    if (isValidUrl(str))
        return str;
    try {
        if (str.includes(".") && !str.includes(" ")) {
            return new URL("https://" + str).toString();
        }
    }
    catch (e) {
        return null;
    }
}
exports.getUrlFromString = getUrlFromString;
