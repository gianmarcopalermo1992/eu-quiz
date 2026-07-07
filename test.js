const fs = require("fs");

const html = fs.readFileSync("raw.html", "utf8");

console.log(html.substring(0, 1000));
