/* ==========================================================================
   MATEMATIKA - 1. GODINA  (Savremena gimnazija, Beograd)
   --------------------------------------------------------------------------
   ODELJENJA: navedi sva odeljenja kojima predaješ ove godine. Iz ovoga se
   prave i tabele sa ocenama i filter kod prezentacija.

   PREZENTACIJE: svaka stavka je { label, href, meta, odeljenja }.
     - "odeljenja" izostavi (ili navedi sva) ako gradivo važi za sve smerove
     - "odeljenja: ['I-1']" ako je specifično samo za taj smer
     - "href" moze biti fajl na sajtu ("../files/nastava/g1/skupovi.pdf")
       ili spoljni link (Google Drive, Dropbox...)

   OCENE: za svako odeljenje napravi Google Sheet, Share -> "Svako u
     Savremenoj gimnaziji sa linkom -> Pregled", pa nalepi link u "href".

   ZADACI: { label, href, meta } - meta npr. "zadaci", "rešenja", "sken".
   ========================================================================== */
window.NASTAVA_GODINA = {
  godina: "I godina",
  podnaslov: "Savremena gimnazija, Beograd - školska 2025/26.",

  odeljenja: ["OS", "DJ", "IT", "SP"],

  oceneNapomena:
    "Otvara samo školski Google nalog učenika (@savremena-gimnazija.edu.rs). Svako vidi samo svoje odeljenje.",
  ocene: [
    { odeljenje: "I-1", href: "https://docs.google.com/spreadsheets/d/1E5upxItauw06L7PgtYVeW9HUfUQbv82oYxnNhpiHEMk/edit?usp=sharing" },
    { odeljenje: "I-2", href: "https://docs.google.com/spreadsheets/d/1cE6Zd2ZxpB66qavQIxvQ15Ie5ooAbcCNBZDRTJYrtDg/edit?usp=sharing" },
    { odeljenje: "I-4", href: "https://docs.google.com/spreadsheets/d/1X2mbHiXQPsajld230lM2hO1LgMA8UJuQaOV03lqzKhc/edit?usp=sharing" },
    { odeljenje: "I-6", href: "https://docs.google.com/spreadsheets/d/1NOysM0RqW9cW35b7QM5qPQhJ-_SQ95XKw-14ATevcTI/edit?usp=sharing" },
  ],

  prezentacije: [
    { label: "1. Logika", href: "../files/nastava/godina-1/1. Логика.pdf", meta: "PDF", odeljenja: ["I-1", "I-2", "I-4", "I-6"]  },
    { label: "2. Kvantifikatori - dodatak", href: "../files/nastava/godina-1/2. Квантификатори - додатак.pdf", meta: "PDF", odeljenja: ["I-4", "I-6"]  },
    { label: "3. Skupovi", href: "../files/nastava/godina-1/3. Скупови.pdf", meta: "PDF" },
    /*
    { label: "Proporcionalnost i primene", href: "#", meta: "PDF", odeljenja: ["I-1", "I-2", "I-4", "I-6"] },
    { label: "Kombinatorika — prošireno", href: "#", meta: "PDF", odeljenja: ["I-1"] },
    { label: "Uvod u geometriju", href: "#", meta: "PDF" },
     */
  ],

  zadaci: [
    { label: "1. Logika — zadaci iz zbirke", href: "#", meta: "zadaci" },
    { label: "Inicijalni test", href: "../files/nastava/godina-1/Иницијални тест.pdf", meta: "test"}, 
    { label: "Skupovi — primeri zadataka", href: "../files/nastava/godina-1/3. Скупови - примери задатака.pdf", meta: "rešenja", icon: "fa-solid fa-square-check" },
    /*
    { label: "Realni brojevi — zadaci", href: "#", meta: "zadaci" },
    { label: "Kontrolni 1 — urađeno na tabli", href: "#", meta: "sken", icon: "fa-solid fa-camera" },
     */
  ],
};
