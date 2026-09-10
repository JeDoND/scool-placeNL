const vraag = document.getElementById("vraag");
const verstuur = document.getElementById("verstuur");
const chat = document.getElementById("chat");
const wis = document.getElementById("wis");

const darkMode = document.getElementById("darkMode");

const vak = document.getElementById("vak");
const niveau = document.getElementById("niveau");


// ==============================
// PAGINA'S
// ==============================

const tabAI = document.getElementById("tabAI");
const tabRooster = document.getElementById("tabRooster");
const tabAccounts = document.getElementById("tabAccounts");

const aiPagina = document.getElementById("aiPagina");
const roosterPagina = document.getElementById("roosterPagina");
const accountsPagina = document.getElementById("accountsPagina");


function openPagina(pagina) {

    aiPagina.classList.add("verborgen");
    roosterPagina.classList.add("verborgen");
    accountsPagina.classList.add("verborgen");

    tabAI.classList.remove("active");
    tabRooster.classList.remove("active");
    tabAccounts.classList.remove("active");


    if (pagina === "ai") {

        aiPagina.classList.remove("verborgen");

        tabAI.classList.add("active");

    }


    if (pagina === "rooster") {

        roosterPagina.classList.remove("verborgen");

        tabRooster.classList.add("active");

        toonRooster();

    }


    if (pagina === "accounts") {

        accountsPagina.classList.remove("verborgen");

        tabAccounts.classList.add("active");

    }

}


tabAI.addEventListener("click", function () {

    openPagina("ai");

});


tabRooster.addEventListener("click", function () {

    openPagina("rooster");

});


tabAccounts.addEventListener("click", function () {

    openPagina("accounts");

});


// ==============================
// SCHOOL-AI
// ==============================

function voegBerichtToe(tekst, type) {

    const bericht = document.createElement("div");

    bericht.className = "bericht " + type;


    const titel = document.createElement("strong");

    const inhoud = document.createElement("p");


    if (type === "gebruiker") {

        titel.innerText = "👤 Jij";

    } else {

        titel.innerText = "🤖 scool-placeNL AI";

    }


    inhoud.innerText = tekst;


    bericht.appendChild(titel);
    bericht.appendChild(inhoud);


    chat.appendChild(bericht);


    chat.scrollTop = chat.scrollHeight;

}


function geefAntwoord(vraagTekst) {

    const tekst = vraagTekst.toLowerCase();

    const gekozenVak = vak.value;

    const gekozenNiveau = niveau.value;


    if (tekst.includes("fotosynthese")) {

        return `Fotosynthese is het proces waarbij planten lichtenergie gebruiken om voedsel te maken.

🌞 Licht
💧 Water
🌫️ Koolstofdioxide

Daaruit maakt de plant glucose en zuurstof.

Kort:

licht + water + koolstofdioxide
→ glucose + zuurstof`;

    }


    if (
        tekst.includes("zwaartekracht") ||
        tekst.includes("gravitatie")
    ) {

        return `Zwaartekracht is de kracht waarmee objecten met massa elkaar aantrekken.

Op aarde zorgt zwaartekracht ervoor dat voorwerpen naar de grond vallen.

Voorbeeld:

Laat je een bal los, dan valt hij naar beneden door de zwaartekracht.`;

    }


    if (gekozenVak === "wiskunde") {

        if (tekst.includes("2+2")) {

            return "2 + 2 = 4 ✅";

        }


        return `Je hebt een wiskundevraag gesteld.

Niveau: ${gekozenNiveau}

Dit is nog de demo-versie van de School-AI.`;

    }


    return `Je vroeg:

"${vraagTekst}"

Vak: ${gekozenVak}
Niveau: ${gekozenNiveau}

Dit is de huidige demo van scool-placeNL. 🤖`;

}


function stelVraag() {

    const tekst = vraag.value.trim();


    if (tekst === "") {

        return;

    }


    voegBerichtToe(tekst, "gebruiker");


    vraag.value = "";


    verstuur.disabled = true;

    verstuur.innerText =
        "School-AI denkt...";


    setTimeout(function () {

        const antwoord =
            geefAntwoord(tekst);


        voegBerichtToe(
            antwoord,
            "ai"
        );


        verstuur.disabled = false;

        verstuur.innerText =
            "Vraag stellen 🚀";

    }, 700);

}


verstuur.addEventListener(
    "click",
    stelVraag
);


vraag.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            stelVraag();

        }

    }
);


wis.addEventListener(
    "click",
    function() {

        chat.innerHTML = `

            <div class="bericht ai">

                <strong>
                    🤖 scool-placeNL AI
                </strong>

                <p>
                    De chat is gewist.
                    Stel een nieuwe vraag! 😊
                </p>

            </div>

        `;

    }
);


// ==============================
// DONKERE MODUS
// ==============================

darkMode.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            darkMode.innerText = "☀️";

        } else {

            darkMode.innerText = "🌙";

        }

    }
);


// ==============================
// ROOSTER
// ==============================

const lesToevoegen =
    document.getElementById(
        "lesToevoegen"
    );


const dag =
    document.getElementById("dag");

const begin =
    document.getElementById("begin");

const einde =
    document.getElementById("einde");

const lesVak =
    document.getElementById("lesVak");

const docent =
    document.getElementById("docent");

const lokaal =
    document.getElementById("lokaal");

const rooster =
    document.getElementById("rooster");


let lessen =
    JSON.parse(
        localStorage.getItem(
            "schoolAI_rooster"
        )
    ) || [];


// LES TOEVOEGEN

lesToevoegen.addEventListener(
    "click",
    function() {


        if (
            begin.value === "" ||
            einde.value === "" ||
            lesVak.value.trim() === ""
        ) {

            alert(
                "Vul minimaal het vak, de begintijd en de eindtijd in."
            );

            return;

        }


        const nieuweLes = {

            id: Date.now(),

            dag: dag.value,

            begin: begin.value,

            einde: einde.value,

            vak: lesVak.value.trim(),

            docent: docent.value.trim(),

            lokaal: lokaal.value.trim()

        };


        lessen.push(nieuweLes);


        localStorage.setItem(
            "schoolAI_rooster",
            JSON.stringify(lessen)
        );


        begin.value = "";
        einde.value = "";
        lesVak.value = "";
        docent.value = "";
        lokaal.value = "";


        toonRooster();

    }
);


// ROOSTER TONEN

function toonRooster() {

    rooster.innerHTML = "";


    if (lessen.length === 0) {

        rooster.innerHTML = `

            <p>
                Je hebt nog geen lessen toegevoegd.
            </p>

        `;

        return;

    }


    const dagen = [

        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag"

    ];


    dagen.forEach(
        function(dagNaam) {


            const lessenVanDag =
                lessen

                .filter(
                    function(les) {

                        return (
                            les.dag === dagNaam
                        );

                    }
                )

                .sort(
                    function(a, b) {

                        return a.begin.localeCompare(
                            b.begin
                        );

                    }
                );


            if (
                lessenVanDag.length === 0
            ) {

                return;

            }


            const dagTitel =
                document.createElement(
                    "h3"
                );


            dagTitel.innerText =
                "📅 " + dagNaam;


            rooster.appendChild(
                dagTitel
            );


            lessenVanDag.forEach(
                function(les) {


                    const element =
                        document.createElement(
                            "div"
                        );


                    element.className =
                        "les";


                    const informatie =
                        document.createElement(
                            "div"
                        );


                    informatie.className =
                        "les-info";


                    const titel =
                        document.createElement(
                            "strong"
                        );


                    titel.innerText =
                        `${les.begin} - ${les.einde} | ${les.vak}`;


                    const details =
                        document.createElement(
                            "p"
                        );


                    let tekst = "";


                    if (
                        les.docent !== ""
                    ) {

                        tekst +=
                            "👨‍🏫 " +
                            les.docent;

                    }


                    if (
                        les.lokaal !== ""
                    ) {

                        if (
                            tekst !== ""
                        ) {

                            tekst +=
                                " • ";

                        }


                        tekst +=
                            "🚪 " +
                            les.lokaal;

                    }


                    details.innerText =
                        tekst;


                    informatie.appendChild(
                        titel
                    );

                    informatie.appendChild(
                        details
                    );


                    const verwijderen =
                        document.createElement(
                            "button"
                        );


                    verwijderen.className =
                        "verwijder-les";


                    verwijderen.innerText =
                        "🗑️ Verwijderen";


                    verwijderen.addEventListener(
                        "click",
                        function() {

                            verwijderLes(
                                les.id
                            );

                        }
                    );


                    element.appendChild(
                        informatie
                    );


                    element.appendChild(
                        verwijderen
                    );


                    rooster.appendChild(
                        element
                    );

                }
            );

        }
    );

}


// LES VERWIJDEREN

function verwijderLes(id) {

    lessen =
        lessen.filter(
            function(les) {

                return les.id !== id;

            }
        );


    localStorage.setItem(
        "schoolAI_rooster",
        JSON.stringify(lessen)
    );


    toonRooster();

}