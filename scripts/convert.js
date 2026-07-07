const fs = require("fs");

const html = fs.readFileSync("raw.html", "utf8");

const blocks = html.split(/<p><strong>\d+\./).slice(1);

const questions = [];

blocks.forEach((block, index) => {
  const full = (index + 1) + "." + block;

  const qMatch = full.match(/^(\d+)\.\s*(.*?)<\/strong><\/p>/s);
  if (!qMatch) return;

  const id = Number(qMatch[1]);
  const question = qMatch[2].trim();

  const options = [];
  let correctAnswer = -1;

  const optionRegex =
    /([A-D])\.\s*(?:<strong>)?([\s\S]*?)(?:<\/strong>)?(?=<br\s*\/?>[A-D]\.|<\/p>)/g;

  let m;

  while ((m = optionRegex.exec(full)) !== null) {
    let text = m[2]
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    options.push(text);

    if (m[0].includes("<strong>")) {
      correctAnswer = options.length - 1;
    }
  }

  if (options.length === 4) {
    questions.push({
      id,
      question,
      options,
      correctAnswer,
    });
  }
});

fs.writeFileSync(
  "app/data/questions.json",
  JSON.stringify(questions, null, 2)
);

console.log(`Questions: ${questions.length}`);
console.log("Done.");
