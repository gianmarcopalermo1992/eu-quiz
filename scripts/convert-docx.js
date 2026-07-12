const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");

(async () => {
  const folder = "question-bank";
  const files = fs
    .readdirSync(folder)
    .filter((file) => file.toLowerCase().endsWith(".docx"));

  let questions = [];
  let nextId = 1;

  const regex =
    /<p><strong>(\d+)\.\s*([\s\S]*?)<\/strong><\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>/g;

  for (const file of files) {
    console.log(`📖 Lettura di ${file}...`);

    const result = await mammoth.convertToHtml({
      path: path.join(folder, file),
    });

    const html = result.value;

    let m;

    while ((m = regex.exec(html)) !== null) {
      const question = m[2]
        .replace(/<[^>]+>/g, "")
        .trim();

      const answers = [];
      let correct = -1;

      for (let i = 3; i <= 6; i++) {
        let raw = m[i];

        if (/<strong>/.test(raw)) {
          correct = i - 3;
        }

        raw = raw
          .replace(/<[^>]+>/g, "")
          .replace(/^[A-D]\.\s*/, "")
          .trim();

        answers.push(raw);
      }

      questions.push({
        id: nextId++,
        question,
        options: answers,
        correctAnswer: correct,
      });
    }
  }

  fs.mkdirSync("app/data", { recursive: true });

  fs.writeFileSync(
    "app/data/questions.json",
    JSON.stringify(questions, null, 2)
  );

  console.log(`\n✅ ${questions.length} domande convertite da ${files.length} file.`);
})();
