
let currentGrade = 3;
let currentSubject = "math";

// Darslar
const lessons = {
    3: {
        math: {
            title: "Qo‘shish va ayirish",
            description: "Bu darsda sonlarni qo‘shish va ayirishni o‘rganamiz."
        },
        english: {
            title: "Everyday Words — Kundalik so‘zlar",
            description: "Kundalik inglizcha so‘zlarni o‘rganamiz."
        }
    },
    4: {
        math: {
            title: "Ko‘paytirish va bo‘lish",
            description: "Ko‘paytirish va bo‘lish amallarini o‘rganamiz."
        },
        english: {
            title: "Am / Is / Are",
            description: "Am, is va are ishlatilishini o‘rganamiz."
        }
    },
    5: {
        math: {
            title: "Kasrlar",
            description: "Oddiy kasrlarni o‘rganamiz."
        },
        english: {
            title: "Present Simple",
            description: "Hozirgi oddiy zamonni o‘rganamiz."
        }
    },
    6: {
        math: {
            title: "Foizlar",
            description: "Foiz tushunchasini o‘rganamiz."
        },
        english: {
            title: "There is / There are",
            description: "Narsalarning borligini ifodalashni o‘rganamiz."
        }
    },
    7: {
        math: {
            title: "Tenglamalar",
            description: "Tenglamalarni yechishni o‘rganamiz."
        },
        english: {
            title: "Past Simple",
            description: "O‘tgan zamonni o‘rganamiz."
        }
    },
    8: {
        math: {
            title: "Chiziqli tenglamalar",
            description: "Chiziqli tenglamalarni o‘rganamiz."
        },
        english: {
            title: "Comparatives",
            description: "Taqqoslashni o‘rganamiz."
        }
    }
};

// 1. Sinfni tanlash
function selectGrade(grade) {
    currentGrade = grade;

    document.getElementById("classSection").style.display = "none";
    document.getElementById("subjectSection").style.display = "block";
    document.getElementById("lessonSection").style.display = "none";

    document.getElementById("selectedGrade").textContent =
        grade + "-sinf";

    document.getElementById("subjectSection").scrollIntoView({
        behavior: "smooth"
    });
}

// 2. Fanni tanlash
function selectSubject(subject) {
    currentSubject = subject;

    const lesson = lessons[currentGrade][subject];

    document.getElementById("subjectSection").style.display = "none";

    document.getElementById("lessonTitle").textContent = lesson.title;
    document.getElementById("lessonDescription").textContent = lesson.description;

    document.getElementById("lessonTitle").style.display = "block";
    document.getElementById("lessonDescription").style.display = "block";

    document.getElementById("lessonSection").style.display = "block";
    document.getElementById("lessonContent").style.display = "none";
    document.getElementById("startLessonButton").style.display = "inline-block";

    document.getElementById("lessonSection").scrollIntoView({
        behavior: "smooth"
    });
}

// Mashqlar javoblari
const exerciseAnswers = [27, 37, 32, 42, 58];

const exerciseSolutions = [
    "15 + 12 = 15 + 10 + 2 = 27.",
    "23 + 14 = 23 + 10 + 4 = 37.",
    "48 − 16 = 48 − 10 − 6 = 32.",
    "67 − 25 = 67 − 20 − 5 = 42.",
    "32 + 26 = 32 + 20 + 6 = 58."
];

let exerciseChecked = [false, false, false, false, false];
let exerciseCorrect = [false, false, false, false, false];

// 3. Darsni boshlash
function startLesson() {
    exerciseChecked = [false, false, false, false, false];
    exerciseCorrect = [false, false, false, false, false];

    const lessonContent = document.getElementById("lessonContent");

    document.getElementById("realLessonTitle").textContent =
        lessons[currentGrade][currentSubject].title;

    if (currentGrade === 3 && currentSubject === "math") {

        document.getElementById("lessonExplanation").innerHTML = `
            <p>Qo‘shish — sonlarni birlashtirish amalidir.</p>
            <p>Ayirish — bir sondan ikkinchi sonni ayirish amalidir.</p>
            <p><b>Misol:</b> 25 + 13 = 38</p>
            <p><b>Misol:</b> 48 − 16 = 32</p>
            <p>Sonlarni xona birliklariga ajratib hisoblash mumkin.</p>
        `;

        document.getElementById("lessonExamples").innerHTML = `
            <div class="exercise">
                <p><b>1-misol:</b> 24 + 15</p>
                <p>24 + 10 = 34</p>
                <p>34 + 5 = 39</p>
                <p><b>Javob: 39</b></p>
            </div>

            <div class="exercise">
                <p><b>2-misol:</b> 67 − 24</p>
                <p>67 − 20 = 47</p>
                <p>47 − 4 = 43</p>
                <p><b>Javob: 43</b></p>
            </div>
        `;

        document.getElementById("lessonExercises").innerHTML = `
            ${exerciseAnswers.map((answer, index) => `
                <div class="exercise">
                    <p><b>${index + 1}. ${
                        ["15 + 12", "23 + 14", "48 − 16", "67 − 25", "32 + 26"][index]
                    } = ?</b></p>

                    <input type="number" id="answer${index}" placeholder="Javobingiz">

                    <button onclick="checkExercise(${index})">
                        Tekshirish
                    </button>

                    <p id="feedback${index}"></p>

                    <button
                        id="solutionButton${index}"
                        onclick="showSolution(${index})"
                        style="display:none;">
                        Yechimni ko‘rish
                    </button>

                    <p id="solution${index}" style="display:none;"></p>
                </div>
            `).join("")}

            <p id="result"></p>
        `;

    } else {
        document.getElementById("lessonExplanation").innerHTML =
            "<p>Bu dars ustida ish olib borilmoqda. Tez orada yangi materiallar qo‘shiladi.</p>";

        document.getElementById("lessonExamples").innerHTML = "";
        document.getElementById("lessonExercises").innerHTML = "";
    }

    document.getElementById("quizResult").innerHTML = "";
    document.getElementById("finishQuizButton").disabled = false;

    lessonContent.style.display = "block";

    renderQuiz();

    lessonContent.scrollIntoView({
        behavior: "smooth"
    });
}

// Mashq javobini tekshirish
function checkExercise(index) {
    const input = document.getElementById("answer" + index);
    const feedback = document.getElementById("feedback" + index);
    const solutionButton = document.getElementById("solutionButton" + index);

    if (input.value.trim() === "") {
        feedback.textContent = "Avval javobingizni yozing!";
        return;
    }

    const userAnswer = Number(input.value);

    exerciseChecked[index] = true;
    exerciseCorrect[index] = userAnswer === exerciseAnswers[index];

    if (exerciseCorrect[index]) {
        feedback.textContent = "Ajoyib! Javobingiz to‘g‘ri! 🎉";
    } else {
        feedback.textContent = "Hozircha noto‘g‘ri. Yana urinib ko‘ring!";
    }

    solutionButton.style.display = "inline-block";

    const totalCorrect = exerciseCorrect.filter(Boolean).length;
    const totalChecked = exerciseChecked.filter(Boolean).length;

    document.getElementById("result").textContent =
        "Tekshirilgan: " + totalChecked +
        " / 5 | To‘g‘ri javoblar: " + totalCorrect;
}

// Mashq yechimini ko‘rsatish
function showSolution(index) {
    const solution = document.getElementById("solution" + index);

    solution.textContent = exerciseSolutions[index];
    solution.style.display = "block";
}

// 10 ta test savollari
const quizQuestions = [
    {
        question: "36 + 24 = ?",
        options: ["50", "60", "62", "58"],
        answer: 1,
        explanation: "36 + 24 = 60."
    },
    {
        question: "85 − 32 = ?",
        options: ["53", "57", "63", "43"],
        answer: 0,
        explanation: "85 − 32 = 53."
    },
    {
        question: "47 + 15 = ?",
        options: ["61", "52", "62", "63"],
        answer: 2,
        explanation: "47 + 15 = 62."
    },
    {
        question: "92 − 48 = ?",
        options: ["54", "44", "46", "42"],
        answer: 1,
        explanation: "92 − 48 = 44."
    },
    {
        question: "28 + 17 = ?",
        options: ["45", "46", "44", "43"],
        answer: 0,
        explanation: "28 + 17 = 45."
    },
    {
        question: "70 − 26 = ?",
        options: ["46", "42", "44", "45"],
        answer: 2,
        explanation: "70 − 26 = 44."
    },
    {
        question: "25 ta olmaga yana 18 ta olma qo‘shildi. Jami nechta?",
        options: ["33", "42", "43", "45"],
        answer: 2,
        explanation: "25 + 18 = 43 ta olma."
    },
    {
        question: "64 − 29 = ?",
        options: ["35", "45", "34", "36"],
        answer: 0,
        explanation: "64 − 29 = 35."
    },
    {
        question: "19 + 26 + 15 = ?",
        options: ["50", "60", "59", "61"],
        answer: 1,
        explanation: "19 + 26 + 15 = 60."
    },
    {
        question: "100 − 37 = ?",
        options: ["73", "67", "63", "53"],
        answer: 2,
        explanation: "100 − 37 = 63."
    }
];

// Testni chiqarish
function renderQuiz() {
    const container = document.getElementById("quizContainer");
    const finishButton = document.getElementById("finishQuizButton");

    if (currentGrade !== 3 || currentSubject !== "math") {
        container.innerHTML =
            "<p>Bu sinf va fan uchun testlar tez orada qo‘shiladi.</p>";

        finishButton.style.display = "none";
        return;
    }

    finishButton.style.display = "inline-block";

    let html = "";

    quizQuestions.forEach((q, index) => {
        html += `
            <div class="exercise">
                <p><b>${index + 1}. ${q.question}</b></p>
        `;

        q.options.forEach((option, optionIndex) => {
            html += `
                <label style="display:block; margin:10px 0;">
                    <input
                        type="radio"
                        name="quiz${index}"
                        value="${optionIndex}">
                    ${option}
                </label>
            `;
        });

        html += "</div>";
    });

    container.innerHTML = html;
}

// Testni yakunlash
function finishQuiz() {
    let score = 0;
    let resultHTML = "";

    for (let i = 0; i < quizQuestions.length; i++) {
        const selected = document.querySelector(
            'input[name="quiz' + i + '"]:checked'
        );

        if (!selected) {
            alert("Iltimos, barcha 10 ta savolga javob bering!");
            return;
        }

        const userAnswer = Number(selected.value);
        const correct = userAnswer === quizQuestions[i].answer;

        if (correct) {
            score++;
        }

        resultHTML += `
            <div class="exercise">
                <p><b>${i + 1}-savol:</b>
                ${correct ? "To‘g‘ri! 🎉" : "Noto‘g‘ri."}</p>

                <p>To‘g‘ri javob:
                <b>${quizQuestions[i].options[quizQuestions[i].answer]}</b></p>

                <p>${quizQuestions[i].explanation}</p>
            </div>
        `;
    }

    document.querySelectorAll("#quizContainer input").forEach(input => {
        input.disabled = true;
    });

    let message = "";

    if (score === 10) {
        message = "A'lo! 🏆";
    } else if (score >= 8) {
        message = "Juda yaxshi! 🌟";
    } else if (score >= 6) {
        message = "Yaxshi! 👍";
    } else {
        message = "Mavzuni yana takrorlang! 📚";
    }

    document.getElementById("quizResult").innerHTML = `
        <h2>Natijangiz: ${score} / 10</h2>
        <h3>${message}</h3>
        <h3>Javoblar va izohlar:</h3>
        ${resultHTML}
    `;

    document.getElementById("finishQuizButton").disabled = true;
}
