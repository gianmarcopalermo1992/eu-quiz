const fs = require("fs");
const mammoth = require("mammoth");

(async () => {

    const result = await mammoth.convertToHtml({
        path: "questions.docx"
    });

    const html = result.value;

    const questions = [];

    const regex =
        /<p><strong>(\d+)\.\s*([\s\S]*?)<\/strong><\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>([\s\S]*?)<\/p>/g;

    let m;

    while ((m = regex.exec(html)) !== null) {

        const id = Number(m[1]);

        const question = m[2]
            .replace(/<[^>]+>/g, "")
            .trim();

        const answers = [];
        let correct = -1;

        for (let i = 3; i <= 6; i++) {

            let raw = m[i];

            if (/<strong>/.test(raw))
                correct = i - 3;

            raw = raw
                .replace(/<[^>]+>/g, "")
                .replace(/^[A-D]\.\s*/, "")
                .trim();

            answers.push(raw);
        }

        questions.push({
            id,
            question,
            options: answers,
            correctAnswer: correct
        });
    }

    fs.mkdirSync("app/data", { recursive: true });

    fs.writeFileSync(
        "app/data/questions.json",
        JSON.stringify(questions, null, 2)
    );

    console.log(`✅ ${questions.length} domande convertite`);

})();
