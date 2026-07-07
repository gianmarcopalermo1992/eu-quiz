const fs = require("fs");
const cheerio = require("cheerio");

const html = fs.readFileSync("raw.html", "utf8");
const $ = cheerio.load(html);

const paragraphs = $("p").toArray();

const questions = [];
let i = 0;

while (i < paragraphs.length) {
    const text = $(paragraphs[i]).text().trim();

    // Inizio domanda
    if (/^\d+\./.test(text)) {

        const question = text.replace(/^\d+\.\s*/, "");

        const answers = [];
        let correct = -1;

        for (let j = 1; j <= 4; j++) {

            const p = paragraphs[i + j];
            if (!p) break;

            const answerText = $(p).text().trim();

            const clean = answerText.replace(/^[A-D]\.\s*/, "");

            answers.push(clean);

            if ($(p).find("strong").length > 0) {
                correct = j - 1;
            }
        }

        if (answers.length === 4) {
            questions.push({
                question,
                answers,
                correct
            });
        }

        i += 5;
    } else {
        i++;
    }
}

fs.writeFileSync(
    "questions.json",
    JSON.stringify(questions, null, 2)
);

console.log(`✅ Convertite ${questions.length} domande`);
