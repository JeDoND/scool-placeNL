/* =========================
   DATA
========================= */

let lessons = JSON.parse(
    localStorage.getItem("schoolLessons")
) || [];

let tests = JSON.parse(
    localStorage.getItem("schoolTests")
) || [];

let selectedClass =
    localStorage.getItem("studentClass") || "";

let currentTheme =
    localStorage.getItem("schoolTheme") || "default";


/* =========================
   NAVIGATIE
========================= */

const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageName = button.dataset.page;

        navButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        pages.forEach(page =>
            page.classList.remove("active-page")
        );

        button.classList.add("active");

        document
            .getElementById(pageName)
            .classList.add("active-page");

        if (pageName === "rooster") {
            showStudentSchedule();
        }

        if (pageName === "toetsweken") {
            showTests();
        }

        if (pageName === "docent") {
            showTeacherSchedule();
        }
    });

});


/* =========================
   THEMA
========================= */

document.body.dataset.theme = currentTheme;

const themeButton =
    document.getElementById("themeButton");

const themeModal =
    document.getElementById("themeModal");

const closeTheme =
    document.getElementById("closeTheme");

themeButton.addEventListener("click", () => {
    themeModal.classList.remove("hidden");
});

closeTheme.addEventListener("click", () => {
    themeModal.classList.add("hidden");
});

document.querySelectorAll(".theme-option")
    .forEach(button => {

        button.addEventListener("click", () => {

            const theme =
                button.dataset.theme;

            currentTheme = theme;

            document.body.dataset.theme = theme;

            localStorage.setItem(
                "schoolTheme",
                theme
            );

            themeModal.classList.add("hidden");
        });

    });


/* =========================
   SCHOOL AI
========================= */

const sendQuestion =
    document.getElementById("sendQuestion");

const question =
    document.getElementById("question");

const chat =
    document.getElementById("chat");

const subject =
    document.getElementById("subject");

const level =
    document.getElementById("level");

sendQuestion.addEventListener("click", askAI);

question.addEventListener("keydown", event => {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        askAI();
    }

});


function askAI() {

    const text =
        question.value.trim();

    if (!text) return;

    addMessage(
        text,
        "user-message"
    );

    question.value = "";

    setTimeout(() => {

        let answer =
            generateDemoAnswer(text);

        addMessage(
            answer,
            "ai-message"
        );

    }, 500);

}


function addMessage(text, className) {

    const message =
        document.createElement("div");

    message.className =
        "message " + className;

    message.textContent = text;

    chat.appendChild(message);

    chat.scrollTop =
        chat.scrollHeight;
}


function generateDemoAnswer(text) {

    const lower =
        text.toLowerCase();

    if (
        lower.includes("fotosynthese") ||
        lower.includes("fotosynthese")
    ) {

        return "Fotosynthese is het proces waarbij planten met behulp van licht, water en koolstofdioxide glucose en zuurstof maken.";

    }

    if (
        lower.includes("zwaartekracht")
    ) {

        return "Zwaartekracht is de kracht waarmee massa's elkaar aantrekken. Op aarde zorgt zwaartekracht ervoor dat voorwerpen naar de grond vallen.";

    }

    if (
        lower.includes("2+2") ||
        lower.includes("2 + 2")
    ) {

        return "2 + 2 = 4 😊";

    }

    return `Je hebt een vraag gesteld over ${subject.value} op niveau ${level.value}. Dit is nog de demo-versie van de School-AI.`;

}


document
    .getElementById("clearChat")
    .addEventListener("click", () => {

        chat.innerHTML = `
            <div class="message ai-message">
                Chat gewist. Waar kan ik je mee helpen?
            </div>
        `;

    });


/* =========================
   LEERLING KLAS
========================= */

const studentClass =
    document.getElementById("studentClass");

studentClass.value =
    selectedClass;


document
    .getElementById("saveStudentClass")
    .addEventListener("click", () => {

        selectedClass =
            studentClass.value;

        localStorage.setItem(
            "studentClass",
            selectedClass
        );

        showStudentSchedule();

        alert(
            "Je klas is opgeslagen als " +
            selectedClass
        );

    });


/* =========================
   LEERLING ROOSTER
========================= */

function showStudentSchedule() {

    const container =
        document.getElementById(
            "studentSchedule"
        );

    const info =
        document.getElementById(
            "studentClassInfo"
        );

    container.innerHTML = "";

    if (!selectedClass) {

        info.textContent =
            "Kies hierboven eerst je klas.";

        return;
    }

    info.textContent =
        "Rooster van klas " +
        selectedClass;

    const classLessons =
        lessons.filter(
            lesson =>
                lesson.className === selectedClass
        );

    if (classLessons.length === 0) {

        container.innerHTML = `
            <div class="info-box">
                Er zijn nog geen lessen ingevoerd
                voor klas ${selectedClass}.
            </div>
        `;

        return;
    }

    const days = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag"
    ];

    days.forEach(day => {

        const dayLessons =
            classLessons.filter(
                lesson =>
                    lesson.day === day
            );

        dayLessons
            .sort((a, b) =>
                a.start.localeCompare(b.start)
            );

        dayLessons.forEach(lesson => {

            const div =
                document.createElement("div");

            div.className = "lesson";

            div.innerHTML = `
                <h3>${lesson.subject}</h3>
                <p>📅 ${lesson.day}</p>
                <p>🕐 ${lesson.start} - ${lesson.end}</p>
                <p>👨‍🏫 ${lesson.teacher}</p>
                <p>🚪 Lokaal ${lesson.room}</p>
                <p>🏫 Klas ${lesson.className}</p>
            `;

            container.appendChild(div);

        });

    });

}


/* =========================
   DOCENT LOGIN
========================= */

const teacherLoginButton =
    document.getElementById(
        "teacherLoginButton"
    );

const teacherCode =
    document.getElementById(
        "teacherCode"
    );

const loginMessage =
    document.getElementById(
        "loginMessage"
    );

const teacherLogin =
    document.getElementById(
        "teacherLogin"
    );

const teacherPanel =
    document.getElementById(
        "teacherPanel"
    );


teacherLoginButton.addEventListener(
    "click",
    () => {

        if (teacherCode.value === "12345") {

            teacherLogin.classList.add(
                "hidden"
            );

            teacherPanel.classList.remove(
                "hidden"
            );

            loginMessage.textContent = "";

            showTeacherSchedule();

        } else {

            loginMessage.textContent =
                "❌ Onjuiste docentcode.";

        }

    }
);


document
    .getElementById("teacherLogout")
    .addEventListener("click", () => {

        teacherPanel.classList.add(
            "hidden"
        );

        teacherLogin.classList.remove(
            "hidden"
        );

        teacherCode.value = "";

    });


/* =========================
   DOCENT LES TOEVOEGEN
========================= */

document
    .getElementById("addTeacherLesson")
    .addEventListener("click", () => {

        const lesson = {

            id: Date.now(),

            day:
                document.getElementById(
                    "teacherDay"
                ).value,

            start:
                document.getElementById(
                    "teacherStart"
                ).value,

            end:
                document.getElementById(
                    "teacherEnd"
                ).value,

            subject:
                document.getElementById(
                    "teacherSubject"
                ).value,

            teacher:
                document.getElementById(
                    "teacherName"
                ).value,

            room:
                document.getElementById(
                    "teacherRoom"
                ).value,

            className:
                document.getElementById(
                    "teacherClass"
                ).value
        };


        if (
            !lesson.start ||
            !lesson.end ||
            !lesson.subject ||
            !lesson.teacher ||
            !lesson.room
        ) {

            alert(
                "Vul alle gegevens van de les in."
            );

            return;
        }


        lessons.push(lesson);

        localStorage.setItem(
            "schoolLessons",
            JSON.stringify(lessons)
        );


        alert(
            `Les toegevoegd aan klas ${lesson.className}!`
        );


        document.getElementById(
            "teacherSubject"
        ).value = "";

        document.getElementById(
            "teacherName"
        ).value = "";

        document.getElementById(
            "teacherRoom"
        ).value = "";


        showTeacherSchedule();

    });


/* =========================
   DOCENT ROOSTER BEHEREN
========================= */

function showTeacherSchedule() {

    const container =
        document.getElementById(
            "teacherSchedule"
        );

    container.innerHTML = "";

    if (lessons.length === 0) {

        container.innerHTML =
            "<p>Er zijn nog geen lessen.</p>";

        return;
    }


    lessons
        .sort((a, b) =>
            a.start.localeCompare(b.start)
        )
        .forEach(lesson => {

            const row =
                document.createElement("div");

            row.className =
                "teacher-row";

            row.innerHTML = `
                <div>
                    <strong>
                        ${lesson.subject}
                    </strong>

                    <br>

                    ${lesson.day}
                    • ${lesson.start}-${lesson.end}

                    <br>

                    Klas ${lesson.className}
                    • lokaal ${lesson.room}
                </div>

                <button
                    onclick="deleteLesson(${lesson.id})"
                >
                    🗑️
                </button>
            `;

            container.appendChild(row);

        });

}


function deleteLesson(id) {

    lessons =
        lessons.filter(
            lesson =>
                lesson.id !== id
        );

    localStorage.setItem(
        "schoolLessons",
        JSON.stringify(lessons)
    );

    showTeacherSchedule();
    showStudentSchedule();

}


/* =========================
   TOETS TOEVOEGEN
========================= */

document
    .getElementById("addTest")
    .addEventListener("click", () => {

        const test = {

            id: Date.now(),

            day:
                document.getElementById(
                    "testDay"
                ).value,

            date:
                document.getElementById(
                    "testDate"
                ).value,

            subject:
                document.getElementById(
                    "testSubject"
                ).value,

            description:
                document.getElementById(
                    "testDescription"
                ).value,

            time:
                document.getElementById(
                    "testTime"
                ).value,

            className:
                document.getElementById(
                    "testTeacherClass"
                ).value

        };


        if (
            !test.date ||
            !test.subject ||
            !test.description
        ) {

            alert(
                "Vul de datum, het vak en de omschrijving in."
            );

            return;
        }


        tests.push(test);

        localStorage.setItem(
            "schoolTests",
            JSON.stringify(tests)
        );


        alert(
            `Toets toegevoegd voor klas ${test.className}!`
        );


        document.getElementById(
            "testSubject"
        ).value = "";

        document.getElementById(
            "testDescription"
        ).value = "";

        document.getElementById(
            "testTime"
        ).value = "";


        showTests();

    });


/* =========================
   TOETSWEKEN
========================= */

const testClass =
    document.getElementById(
        "testClass"
    );


testClass.addEventListener(
    "change",
    showTests
);


function showTests() {

    const container =
        document.getElementById(
            "tests"
        );

    container.innerHTML = "";


    const filter =
        testClass.value ||
        selectedClass;


    let visibleTests = tests;


    if (filter) {

        visibleTests =
            tests.filter(
                test =>
                    test.className === filter
            );

    }


    visibleTests.sort(
        (a, b) =>
            a.date.localeCompare(b.date)
    );


    if (visibleTests.length === 0) {

        container.innerHTML = `
            <div class="info-box">
                Geen toetsen gevonden.
            </div>
        `;

        return;
    }


    visibleTests.forEach(test => {

        const div =
            document.createElement("div");

        div.className = "test";

        div.innerHTML = `
            <h3>📝 ${test.subject}</h3>

            <p>
                📅 ${test.day}
                ${formatDate(test.date)}
            </p>

            <p>
                🕐 ${test.time || "Tijd nog niet bekend"}
            </p>

            <p>
                🏫 Klas ${test.className}
            </p>

            <p>
                📚 ${test.description}
            </p>
        `;

        container.appendChild(div);

    });

}


function formatDate(date) {

    if (!date) return "";

    const parts =
        date.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


/* =========================
   START
========================= */

showStudentSchedule();
showTests();