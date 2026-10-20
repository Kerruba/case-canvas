/**
 * PROFILER: CRIME BOARD
 * Scenario Loader & Preset Registry
 * Supports fetching ./scenario.json via HTTP, fallback for file:// protocol, and custom JSON upload.
 */

window.ProfilerScenarios = {
  presets: {
    'caso-409-morosini': {
      file: './scenario.json',
      data: {
        "metadata": {
          "id": "caso-409-morosini",
          "caseNumber": "FASCICOLO #409-MI",
          "title": "L'Eco della Serretta — Omicidio a Villa Morosini",
          "date": "14-15 Novembre 2026",
          "location": "Villa Morosini, Blevio (Lago di Como)",
          "description": "Alle ore 23:30 del 14 Novembre, il corpo senza vita del magnate farmaceutico Edoardo Morosini viene rinvenuto nel suo studio privato al primo piano della villa. Nessun segno di scasso agli ingressi principali. Quattro persone avevano accesso alla tenuta durante il violento temporale serale. Analizza i reperti oggettivi, ricostruisci la timeline reale e individua colpevole, arma, movente e depistaggi.",
          "victim": {
            "name": "Edoardo Morosini",
            "age": 68,
            "role": "Fondatore & CEO di Morosini BioPharma",
            "bloodType": "AB Negativo (AB-)",
            "notes": "Mancino puro. Altezza 178 cm, peso 80 kg. Affetto da glaucoma cronico bilaterale in terapia quotidiana con collirio beta-bloccante (Timololo 0,5%). Allergico ai crostacei."
          },
          "suspects": [
            {
              "id": "s1",
              "name": "Dott.ssa Clara Valli",
              "age": 42,
              "role": "Direttrice R&D Morosini BioPharma",
              "traits": "Destrorsa • Gruppo A+ • Calzature taglia 39 • Fumatrice (mentolo)",
              "notes": "In forte attrito con la vittima dopo la revoca dei suoi permessi di livello superiore avvenuta l'11 Novembre."
            },
            {
              "id": "s2",
              "name": "Lorenzo Morosini",
              "age": 34,
              "role": "Nipote della vittima & Architetto",
              "traits": "Mancino • Gruppo 0+ • Calzature taglia 42 • Guida Alfa Romeo GK-412-TR",
              "notes": "Unico erede familiare diretto; fortemente indebitato per speculazioni immobiliari fallite."
            },
            {
              "id": "s3",
              "name": "Matteo Rinaldi",
              "age": 51,
              "role": "Capo della Sicurezza (ex Perito Chimico)",
              "traits": "Destrorso • Gruppo 0- • Anfibi Vibram taglia 44 • Clearance Livello 4",
              "notes": "Responsabile dei sistemi di videosorveglianza, allarmi e custodia dei codici master della villa e dei laboratori."
            },
            {
              "id": "s4",
              "name": "Beatrice Sartori",
              "age": 59,
              "role": "Governante Residente & Curatrice Serra",
              "traits": "Destrorsa • Gruppo B+ • Stivaletti taglia 38 • Esperta botanica",
              "notes": "Al servizio della famiglia da 22 anni. Gestisce la cucina, gli orari domestici e la serra delle orchidee."
            }
          ]
        },
        "cards": [
          {
            "id": "card-01",
            "number": "#01",
            "title": "Sopralluogo Studio 1° Piano",
            "category": "Luogo",
            "timestamp": "14 Nov • Ore 23:45",
            "image": "svg:crime-scene-desk",
            "rawText": "• Cadavere rinvenuto prono (faccia in giù) sulla scrivania in mogano.\n• Tazzina da caffè con 4 ml di espresso posizionata a DESTRA del sottomano.\n• Stilografica aperta nella mano SINISTRA; sul foglio una riga d'inchiostro interrotta.\n• Finestra socchiusa (12 cm); sul davanzale interno: acqua piovana, polline di Orchidaceae e 1 fibra sintetica verde oliva.\n• Termostato fisso a 20,0 °C."
          },
          {
            "id": "card-02",
            "number": "#02",
            "title": "Rilievi Termici ed Ematologici",
            "category": "Forense",
            "timestamp": "15 Nov • Ore 01:10",
            "image": "svg:thermal-blood",
            "rawText": "• Temp. epatica cadavere alle 23:50: 34,0 °C (standard in vita: 37,0 °C; calo in ambiente a 20°C: 1,5 °C/ora).\n• Ipostasi cadaveriche (macchie da decubito): fissate sul DORSO e sulla nuca, incompatibili con la posizione prona sulla scrivania.\n• Maniglia interna porta di servizio dello studio: traccia ematica latente (Luminol+), gruppo sanguigno 0 Negativo (0-)."
          },
          {
            "id": "card-03",
            "number": "#03",
            "title": "Deposizione: Dott.ssa Clara Valli",
            "category": "Deposizione",
            "timestamp": "15 Nov • Ore 00:30",
            "image": "svg:witness-clara",
            "rawText": "«Ho discusso nello studio con Edoardo fino alle 21:15 riguardo al brevetto MBP-9. Poi sono salita nella mia camera nell'ala ovest e non sono più uscita.\nIl mio impermeabile verde oliva l'avevo lasciato appeso nello spogliatoio al piano terra nel pomeriggio.\nPorto il numero 39 di scarpe. Gruppo sanguigno: A Positivo.»"
          },
          {
            "id": "card-04",
            "number": "#04",
            "title": "Deposizione: Lorenzo Morosini",
            "category": "Deposizione",
            "timestamp": "15 Nov • Ore 00:50",
            "image": "svg:witness-lorenzo",
            "rawText": "«Sono uscito dalla villa alle 20:30 con la mia Alfa Romeo (targa GK-412-TR) per cenare al ristorante 'La Darsena' a Como, a 28 km da qui.\nHo pagato il conto alle 22:35 con il mio Apple Pay e sono rientrato in villa alle 23:15.\nAlle 23:25 ho bussato allo studio dello zio: la porta principale era chiusa a chiave dall'interno.»"
          },
          {
            "id": "card-05",
            "number": "#05",
            "title": "Log Domotica, Telepass & POS",
            "category": "Documento",
            "timestamp": "15 Nov • Ore 01:40",
            "image": "svg:digital-logs",
            "rawText": "• Varchi Stradali SS340 / Telepass: NESSUN transito del veicolo GK-412-TR tra le 20:00 e le 24:00.\n• Ricevuta POS 'La Darsena' (Como, ore 22:35): € 64,00 pagati via Apple Pay da dispositivo 'iPhone 15 Pro - Camilla Neri' (fidanzata di Lorenzo).\n• Serratura Elettronica Serra Botanica: apertura con codice master (#9901) alle 21:22; chiusura alle 21:38."
          },
          {
            "id": "card-06",
            "number": "#06",
            "title": "Tossicologia: Reperti Studio",
            "category": "Forense",
            "timestamp": "15 Nov • Ore 02:30",
            "image": "svg:toxicology-lab",
            "rawText": "• Tazzina Caffè (4 ml): rilevata Caffeina + 18 mg di Tassina B (alcaloide estratto da aghi di Taxus baccata). ZERO tracce di saliva o DNA sul bordo tazzina.\n• Flacone Collirio 'Timololo 0,5%' (nel bagno privato dello studio): contaminato con Atropina 4% e Aconitina pura (letale in 10 min per via oculare in sinergia con beta-bloccanti)."
          },
          {
            "id": "card-07",
            "number": "#07",
            "title": "Referto Autoptico & Telemetria",
            "category": "Forense",
            "timestamp": "15 Nov • Ore 03:10",
            "image": "svg:autopsy-ecg",
            "rawText": "• Contenuto gastrico vittima: 0,0 mg di Tassina B; 0,0 mg di caffeina.\n• Umor vitreo e dotti lacrimali: concentrazione letale di Aconitina (4,2 µg/mL) e Atropina.\n• Apple Watch vittima: promemoria 'Collirio Glaucoma' attivo alle 21:40; tachicardia ventricolare alle 21:44; arresto cardiaco (linea piatta) alle 21:51."
          },
          {
            "id": "card-08",
            "number": "#08",
            "title": "Deposizione: Beatrice Sartori",
            "category": "Deposizione",
            "timestamp": "15 Nov • Ore 02:00",
            "image": "svg:witness-beatrice",
            "rawText": "«Alle 21:39 ho portato l'espresso nello studio: il signor Edoardo era nel bagno interno a mettersi il collirio, quindi ho poggiato la tazzina sulla scrivania e sono uscita.\nIl codice #9901 della serra lo conosciamo solo io e Matteo Rinaldi. Nella serra coltiviamo Taxus baccata e orchidee, ma nessun Aconitum.\nMio figlio ha perso il lavoro dopo che il signor Edoardo gli ha negato un prestito.»"
          },
          {
            "id": "card-09",
            "number": "#09",
            "title": "Deposizione: Matteo Rinaldi",
            "category": "Deposizione",
            "timestamp": "15 Nov • Ore 02:15",
            "image": "svg:witness-matteo",
            "rawText": "«Ho pattugliato il perimetro esterno dalle 21:00 alle 22:00. Alle 23:05 il sensore fumo del 1° piano ha segnalato un'anomalia: sono salito nel corridoio ma non sono mai entrato nello studio.»\n• Nota verbalizzante: il soggetto presenta un taglio fresco di 8 mm sul dorso dell'indice destro. Gruppo sanguigno: 0 Negativo (0-)."
          },
          {
            "id": "card-10",
            "number": "#10",
            "title": "Rilievi Serra & Spogliatoio",
            "category": "Luogo",
            "timestamp": "15 Nov • Ore 04:00",
            "image": "svg:greenhouse-boots",
            "rawText": "• Serra Botanica: cesoie con residui di Taxus baccata e mortaio umido. Sul vialetto fangoso: impronte di stivaletti misura 38 con polline di Orchidaceae.\n• Spogliatoio Piano Terra: impermeabile verde oliva (taglia M, di Clara Valli) appeso all'esterno; spalle bagnate di pioggia, nella tasca un filtro da infusione con tracce di Taxus baccata."
          },
          {
            "id": "card-11",
            "number": "#11",
            "title": "Registro Armadio Veleni BioPharma",
            "category": "Documento",
            "timestamp": "15 Nov • Ore 05:15",
            "image": "svg:vault-registry",
            "rawText": "• Laboratorio Tossicologia Morosini BioPharma (Sede Centrale):\n• Data 12 Novembre, ore 18:40: prelievo di 1 fiala standard di Aconitina pura Sigma-Aldrich (50 mg) e 1 fiala di Atropina solfato.\n• Log apertura caveau chimico Livello 4: eseguito tramite Badge Magnetico #SEC-01 intestato a Matteo Rinaldi."
          },
          {
            "id": "card-12",
            "number": "#12",
            "title": "Perizia Informatica & Scena Studio",
            "category": "Documento",
            "timestamp": "15 Nov • Ore 06:00",
            "image": "svg:forensic-digital",
            "rawText": "• Portatile vittima (file salvato ore 20:45): denuncia penale contro Matteo Rinaldi per vendita segreta dei dati del brevetto MBP-9 a un laboratorio di Basilea per 450.000 CHF.\n• Smartphone di Lorenzo: SMS delle 21:30 dall'avvocato nella rimessa barche («Se tuo zio ti disereda, impugneremo il testamento»).\n• Sotto il tappeto tra bagno e scrivania: segni di trascinamento suola Vibram taglia 44; console Sicurezza: blackout telecamere 1° piano forzato dalle 23:04 alle 23:08."
          }
        ],
        "solution": [
          {
            "id": "q1",
            "question": "1. Chi è l'assassino effettivo che ha causato la morte di Edoardo Morosini?",
            "options": [
              "Dott.ssa Clara Valli",
              "Lorenzo Morosini",
              "Matteo Rinaldi",
              "Beatrice Sartori"
            ],
            "correctOptionIndex": 2,
            "explanation": "Matteo Rinaldi è l'assassino effettivo. Ha prelevato Aconitina e Atropina dal caveau chimico il 12 Novembre col suo badge #SEC-01 (Carta #11), ha contaminato il collirio della vittima (Carta #06) causando l'arresto cardiaco alle 21:51 (Carta #07), e alle 23:05 ha oscurato le telecamere per spostare il corpo dal pavimento del bagno alla scrivania, lasciando sangue 0- sulla maniglia di servizio e tracce di suola Vibram taglia 44 (Carte #02, #09, #12)."
          },
          {
            "id": "q2",
            "question": "2. Qual è stata l'arma del delitto che ha effettivamente ucciso la vittima e a che ora è avvenuto il decesso?",
            "options": [
              "Caffè espresso corretto con Tassina B alle ore 21:39",
              "Collirio al Timololo contaminato con Aconitina e Atropina, decesso alle ore 21:51",
              "Iniezione letale di Atropina praticata alle ore 23:05 durante il falso allarme",
              "Avvelenamento per contatto cutaneo sulla penna stilografica Montblanc alle 22:15"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sia il calcolo termico (37°C - 34°C = 3°C / 1,5°C/h = 2 ore prima delle 23:50 → ~21:50, Carta #02) sia la telemetria dell'Apple Watch (Carta #07) confermano il decesso alle 21:51. L'autopsia dimostra che la vittima non ha bevuto il caffè avvelenato (0 mg nello stomaco), ma è morta per assorbimento oculare di Aconitina e Atropina contenute nel collirio applicato alle 21:40 (Carte #06, #07)."
          },
          {
            "id": "q3",
            "question": "3. Qual è il movente dell'omicidio commesso dall'assassino?",
            "options": [
              "Ereditare il patrimonio immobiliare della famiglia prima della modifica del testamento",
              "Impedire la denuncia penale per lo spionaggio industriale sul brevetto MBP-9 (450.000 CHF)",
              "Vendicare la revoca dei permessi di ricerca del laboratorio avvenuta l'11 Novembre",
              "Vendicare il rifiuto di un prestito finanziario al figlio disoccupato"
            ],
            "correctOptionIndex": 1,
            "explanation": "Alle 20:45 della sera stessa, Edoardo Morosini aveva salvato sul portatile la denuncia alla Procura contro Matteo Rinaldi per aver venduto i dati del brevetto MBP-9 a un competitor svizzero per 450.000 CHF (Carta #12)."
          },
          {
            "id": "q4",
            "question": "4. Chi ha tentato (senza successo) di avvelenare la vittima con il caffè alla Tassina B e come ha cercato di depistare le indagini?",
            "options": [
              "Clara Valli, usando il codice di Beatrice per entrare nella serra",
              "Lorenzo Morosini, entrando dalla finestra con l'impermeabile verde oliva",
              "Beatrice Sartori, preparando l'infuso di Taxus in serra (21:22-21:38) con l'impermeabile di Clara e posando la tazzina a destra",
              "Matteo Rinaldi, preparando due veleni diversi per sicurezza"
            ],
            "correctOptionIndex": 2,
            "explanation": "Beatrice Sartori (taglia 38, codice #9901, esperta di Taxus baccata) è entrata in serra tra le 21:22 e le 21:38 indossando l'impermeabile verde oliva di Clara Valli per incastrarla (Carte #05, #08, #10). Ha portato il caffè avvelenato alle 21:39 posandolo a destra (da destrorsa, mentre Edoardo era mancino), ma Edoardo era in bagno e morì pochi minuti dopo per il collirio senza mai toccare la tazzina (Carte #01, #06, #07)."
          },
          {
            "id": "q5",
            "question": "5. Perché il cadavere presentava ipostasi sul dorso pur essendo stato trovato prono sulla scrivania?",
            "options": [
              "È un effetto chimico secondario dell'avvelenamento da Aconitina",
              "La vittima è morta supina sul pavimento del bagno alle 21:51 e Rinaldi l'ha spostata sulla scrivania alle 23:05 per simulare un malore al lavoro",
              "Lorenzo Morosini ha girato il corpo alle 23:25 per cercare il testamento nelle tasche",
              "Beatrice Sartori ha spostato il corpo prima di chiamare i soccorsi alle 23:30"
            ],
            "correctOptionIndex": 1,
            "explanation": "Dopo essersi messo il collirio in bagno alle 21:40, Edoardo è crollato supino (a pancia in su), posizione in cui le ipostasi si sono fissate sul dorso per oltre un'ora (Carta #02). Alle 23:05 Rinaldi ha simulato un allarme fumo, disattivato le telecamere per 4 minuti e trascinato il corpo sulla scrivania (segni Vibram taglia 44 sotto il tappeto, Carta #12) mettendogli la penna nella mano sinistra."
          }
        ]
      }
    },
    'caso-112-valenti': {
      file: './scenario-valenti.json',
      data: {
        "metadata": {
          "id": "caso-112-valenti",
          "caseNumber": "FASCICOLO #112-TO",
          "title": "L'Ultimo Sigaro del Conte Valenti",
          "date": "28 Ottobre 2026",
          "location": "Palazzo Valenti, Collina di Torino",
          "description": "Il Conte Vittorio Valenti viene trovato privo di vita alle 23:05 nella biblioteca blindata della sua tenuta. Un calice di Brandy rovesciato, un sigaro a metà e un orologio da taschino rotto sulle 22:15 sembrano raccontare una scena fin troppo chiara. Ma i reperti forensi raccontano tutta un'altra verità.",
          "victim": {
            "name": "Conte Vittorio Valenti",
            "age": 74,
            "role": "Collezionista d'Arte & Aristocratico",
            "bloodType": "0 Negativo (0-)",
            "notes": "Asmatico cronico grave (intollerante al fumo di tabacco). Portatore di pacemaker. Non beveva superalcolici da 5 anni per prescrizione cardiologica."
          },
          "suspects": [
            {
              "id": "v1",
              "name": "Notaio Goffredo Serra",
              "age": 61,
              "role": "Curatore Patrimoniale & Amico di famiglia",
              "traits": "Gruppo A+ (Secernente) • Fumatore di Cohiba • Indossa foulard di seta",
              "notes": "Gestisce le aste e il caveau dei dipinti del Seicento della collezione Valenti."
            },
            {
              "id": "v2",
              "name": "Arturo Benini",
              "age": 55,
              "role": "Maggiordomo Capo",
              "traits": "Gruppo B+ • Non fumatore • Sordo dall'orecchio sinistro",
              "notes": "Unico dipendente in servizio al piano nobile la sera del delitto."
            },
            {
              "id": "v3",
              "name": "Elena Valenti",
              "age": 29,
              "role": "Nipote & Restauratrice",
              "traits": "Gruppo 0- • Chimica del restauro • Alloggia nella dépendance",
              "notes": "Utilizza solventi e sali di cianuro per la pulitura di argenti antichi nel laboratorio."
            }
          ]
        },
        "cards": [
          {
            "id": "v-01",
            "number": "#01",
            "title": "Sopralluogo Biblioteca",
            "category": "Luogo",
            "timestamp": "28 Ott • Ore 23:10",
            "image": "svg:crime-scene-desk",
            "rawText": "• Calice di cristallo rovesciato sul tappeto: residuo liquido 15 ml di Brandy.\n• Orologio da taschino del Conte: vetro incrinato, lancette bloccate sulle 22:15.\n• Posacenere sulla scrivania: 1 sigaro Cohiba fumato a metà.\n• Finestra francese verso il giardino: chiusa col chiavistello interno."
          },
          {
            "id": "v-02",
            "number": "#02",
            "title": "Esame Autoptico Preliminare",
            "category": "Forense",
            "timestamp": "29 Ott • Ore 00:20",
            "image": "svg:autopsy-ecg",
            "rawText": "• Vittima: Gruppo 0 Negativo. Asma bronchiale severa.\n• Stomaco vittima: 0,0 ml di alcol; 0,0 mg di cianuro.\n• Vie aeree superiori: micro-fibre di seta tinta bordeaux nelle cavità nasali e petecchie congiuntivali da asfissia meccanica.\n• Log digitale Pacemaker interno: fibrillazione e arresto cardiaco registrati alle ore 21:58."
          },
          {
            "id": "v-03",
            "number": "#03",
            "title": "Analisi Chimica & DNA Reperti",
            "category": "Forense",
            "timestamp": "29 Ott • Ore 01:05",
            "image": "svg:toxicology-lab",
            "rawText": "• Liquido nel calice rovesciato (15 ml): Brandy invecchiato + Cianuro di potassio (250 mg).\n• Mozzicone sigaro Cohiba: saliva contenente antigeni gruppo A Positivo (A+).\n• Perno della corona dell'orologio da taschino rotto sulle 22:15: rilevati graffi da pinzetta metallica sulla ghiera di regolazione manuale."
          },
          {
            "id": "v-04",
            "number": "#04",
            "title": "Deposizione: Maggiordomo Arturo",
            "category": "Deposizione",
            "timestamp": "28 Ott • Ore 23:40",
            "image": "svg:witness-matteo",
            "rawText": "«Il Conte vietava categoricamente il fumo in biblioteca per via dell'asma.\nAlle 22:15 ero in corridoio e ho sentito un rumore di vetro infranto provenire dalla biblioteca. Ho bussato subito e una voce maschile da dentro ha gridato: 'Tutto bene Arturo, mi è caduto il calice, non entrare!'»"
          },
          {
            "id": "v-05",
            "number": "#05",
            "title": "Deposizione: Notaio Goffredo Serra",
            "category": "Deposizione",
            "timestamp": "29 Ott • Ore 00:05",
            "image": "svg:witness-lorenzo",
            "rawText": "«Ho parlato col Conte in biblioteca fino alle 21:50. Poi sono uscito dalla porta-finestra nel giardino esterno per fumare un sigaro Cohiba in pace fino alle 22:30, rientrando dal salone principale.\nIl mio foulard di seta bordeaux l'ho smarrito la settimana scorsa.\nIl mio gruppo sanguigno è A Positivo.»"
          },
          {
            "id": "v-06",
            "number": "#06",
            "title": "Deposizione: Elena Valenti",
            "category": "Deposizione",
            "timestamp": "29 Ott • Ore 00:40",
            "image": "svg:witness-clara",
            "rawText": "«Dalle 21:00 alle 22:45 ero nel mio laboratorio nella dépendance a catalogare cornici. È vero che ieri mattina è sparito un barattolo di sali di cianuro dal mio scaffale, ma la porta del laboratorio non era chiusa a chiave.\nMio zio aveva scoperto un ammanco nei quadri del Seicento e domani avrebbe fatto periziare il caveau.»"
          },
          {
            "id": "v-07",
            "number": "#07",
            "title": "Bollettino Meteo & Pluviometro",
            "category": "Documento",
            "timestamp": "29 Ott • Ore 01:30",
            "image": "svg:digital-logs",
            "rawText": "• Stazione Meteo Automatica Collina di Torino (a 200m da Palazzo Valenti):\n• Dalle ore 21:45 alle ore 22:40: nubifragio violento ininterrotto (42 mm di pioggia in 55 minuti) con raffiche di vento a 60 km/h.\n• Giardino esterno privo di tettoie o porticati."
          },
          {
            "id": "v-08",
            "number": "#08",
            "title": "Ispezione Caminetto & Guardaroba",
            "category": "Luogo",
            "timestamp": "29 Ott • Ore 02:10",
            "image": "svg:greenhouse-boots",
            "rawText": "• Caminetto spento della biblioteca: sotto la cenere fredda, rinvenuto un lembo carbonizzato di tessuto in seta bordeaux con iniziali ricamate 'G.S.' e tracce di muco nasale gruppo 0 Negativo.\n• Guardaroba ingresso: soprabito e scarpe in cuoio del Notaio Serra risultano completamente asciutti e privi di tracce di fango."
          },
          {
            "id": "v-09",
            "number": "#09",
            "title": "Ricevute Monte dei Pegni & Perizia",
            "category": "Documento",
            "timestamp": "29 Ott • Ore 02:50",
            "image": "svg:vault-registry",
            "rawText": "• Valigetta del Notaio Serra: ricevuta riservata della Casa d'Aste Bolaffi. Serra ha impegnato 3 tele originali del Guercino appartenenti al Conte Valenti per 240.000 €, sostituendole nel caveau con copie.\n• Email sul PC del Conte (ore 20:15): convocazione di un perito assicurativo per il 29 Ottobre alle ore 09:00."
          },
          {
            "id": "v-10",
            "number": "#10",
            "title": "Analisi Acustica & Impronte",
            "category": "Forense",
            "timestamp": "29 Ott • Ore 03:30",
            "image": "svg:forensic-digital",
            "rawText": "• Sul tavolo accanto al telefono interno: frammenti di una lampadina da scrivania schiacciata col tacco di una scarpa maschile alle 22:15 per simulare il rumore di un bicchiere rotto.\n• Sul bordo esterno del calice col cianuro: solo impronte con guanti in pelle; nessuna impronta della vittima."
          }
        ],
        "solution": [
          {
            "id": "vq1",
            "question": "1. Chi ha ucciso il Conte Vittorio Valenti?",
            "options": [
              "Arturo Benini (Maggiordomo)",
              "Notaio Goffredo Serra",
              "Elena Valenti (Nipote)",
              "Un ladro esterno entrato dal giardino"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il Notaio Goffredo Serra ha soffocato il Conte alle 21:58 con il proprio foulard di seta bordeaux (iniziali G.S. trovate nel caminetto, fibre nel naso della vittima, Carte #02 e #08), ha fumato il sigaro Cohiba (saliva A+, Carta #03) nella biblioteca dopo la morte del Conte e ha simulato che il Conte fosse ancora vivo alle 22:15 rispondendo al maggiordomo da dentro la stanza (Carta #04)."
          },
          {
            "id": "vq2",
            "question": "2. Qual è stata la vera causa della morte e a che ora è avvenuta?",
            "options": [
              "Avvelenamento da cianuro nel Brandy alle ore 22:15",
              "Asfissia meccanica (soffocamento con foulard di seta bordeaux) alle ore 21:58",
              "Attacco d'asma fatale indotto dal fumo di sigaro alle ore 22:05",
              "Trauma cranico da caduta alle ore 22:15"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il pacemaker certifica l'arresto cardiaco alle 21:58 (Carta #02). Nello stomaco della vittima c'erano zero alcol e zero cianuro; il calice avvelenato e l'orologio manomesso sulle 22:15 erano una messinscena (Carte #02, #03)."
          },
          {
            "id": "vq3",
            "question": "3. Quale prova smentisce categoricamente l'alibi del Notaio Serra tra le 21:50 e le 22:30?",
            "options": [
              "La porta-finestra era rotta da anni",
              "Il nubifragio violento (21:45-22:40) rende impossibile aver fumato un sigaro in giardino restando con abiti e scarpe asciutti",
              "Il maggiordomo lo ha visto uscire dalla cucina alle 22:20",
              "Il sigaro era di una marca che Serra non fuma"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il bollettino meteo registra un nubifragio violento dalle 21:45 alle 22:40 sul giardino scoperto (Carta #07). Serra non poteva fumare un sigaro all'aperto sotto 42 mm di pioggia ed avere soprabito e scarpe asciutti (Carta #08): in realtà era chiuso dentro la biblioteca dove ha fumato il sigaro e risposto ad Arturo alle 22:15."
          },
          {
            "id": "vq4",
            "question": "4. Qual era il movente dell'omicidio?",
            "options": [
              "Impedire la perizia dell'indomani che avrebbe scoperto il furto dei 3 quadri del Guercino impegnati per 240.000 €",
              "Incassare l'eredità come unico beneficiario del testamento",
              "Rubare la formula chimica del laboratorio di Elena",
              "Un ricatto legato al passato militare del Conte"
            ],
            "correctOptionIndex": 0,
            "explanation": "Serra aveva sostituito 3 dipinti del Guercino con copie per impegnarli da Bolaffi per 240.000 €; il Conte aveva appena convocato un perito per la mattina seguente alle 09:00 (Carta #09)."
          }
        ]
      }
    },
    'caso-718-fenice': {
      file: './scenario-fenice.json',
      data: {
        "metadata": {
          "id": "caso-718-fenice",
          "caseNumber": "FASCICOLO #718-VE",
          "title": "Requiem per l'Automa d'Oro — Delitto a Venezia",
          "date": "21-22 Novembre 2026",
          "location": "Teatro San Samuele, Venezia",
          "description": "Alle ore 23:15 del 21 Novembre, al termine della prima dell'opera 'Orfeo', il celebre direttore d'orchestra Maestro Aurelio Contarini viene trovato senza vita nel suo Camerino Blindato n. 1, chiuso dall'interno col chiavistello. Ha uno stiletto in vetro di Murano conficcato nel petto, una coppa di Champagne rovesciata sul tavolo e il suo prezioso Automa Carillon del 1768 accanto a sé. Cinque sospettati, tre colpi di scena e un enigma di camera chiusa.",
          "victim": {
            "name": "Maestro Aurelio Contarini",
            "age": 64,
            "role": "Direttore d'Orchestra & Collezionista di Automi del '700",
            "bloodType": "A Negativo (A-)",
            "notes": "Destrorso. Portatore di Holter cardiaco medicale continuo. Rigorosamente astemio nelle sere di concerto. Abitudine rituale: durante ogni intermezzo del II Atto (ore 22:10-22:15) rientrava in camerino per caricare con 3 giri di chiave il suo Automa Carillon del 1768 ('L'Orfeo d'Oro', assicurato per 1,5 milioni di euro)."
          },
          "suspects": [
            {
              "id": "f1",
              "name": "Flavia De Santis",
              "age": 36,
              "role": "Prima Soprano Protagonista",
              "traits": "Destrorsa • Gruppo 0+ • Usa rossetto 'Rouge Carmine #14' • In cura con Digitalina",
              "notes": "Il Maestro aveva minacciato di rimuoverla dal cast della tournée europea dopo le prove generali."
            },
            {
              "id": "f2",
              "name": "Davide Moretti",
              "age": 41,
              "role": "Primo Violino di Spalla",
              "traits": "Mancino • Gruppo B Negativo (B-) • Corporatura snella • Usa pece di pino (colofonia)",
              "notes": "Sotto ricatto del Maestro per aver falsificato la perizia di un violino Guadagnini; fidanzato segreto di Valeria Contarini."
            },
            {
              "id": "f3",
              "name": "Ing. Ettore Marin",
              "age": 58,
              "role": "Maestro Orologiaio & Curatore degli Automi",
              "traits": "Destrorso • Gruppo A+ • Usa olio sintetico Moebius 9010 • Appassionato di tassidermia marina",
              "notes": "Unico tecnico autorizzato a smontare e revisionare l'Automa del 1768 del Maestro Contarini."
            },
            {
              "id": "f4",
              "name": "Valeria Contarini",
              "age": 31,
              "role": "Figlia del Maestro & Clavicembalista",
              "traits": "Mancina • Gruppo AB+ • Custodisce fili di seta e chiavi d'accordatura per arpa e clavicembalo",
              "notes": "In lite col padre perché contraria alla sua relazione segreta con il violinista Davide Moretti."
            },
            {
              "id": "f5",
              "name": "Lorenzo Grimaldi",
              "age": 49,
              "role": "Sovrintendente Finanziario del Teatro",
              "traits": "Destrorso • Gruppo 0- • Indossa gemelli d'onice • Fumatore di sigari Toscano",
              "notes": "Indagato internamente dal Maestro per un buco di bilancio di 180.000 € nei fondi della fondazione lirica."
            }
          ]
        },
        "cards": [
          {
            "id": "fen-01",
            "number": "#01",
            "title": "Sopralluogo Camerino Blindato n. 1",
            "category": "Luogo",
            "timestamp": "21 Nov • Ore 23:20",
            "image": "svg:fenice-dressing-room",
            "rawText": "• Porta del Camerino n. 1 sfondata dai pompieri alle 23:15: il chiavistello interno in ottone era regolarmente inserito.\n• Il Maestro Contarini siede riverso davanti alla specchiera con uno stiletto di scena in vetro di Murano conficcato nell'emitorace sinistro.\n• Sul tavolo: una coppa di Champagne Rosé con bordo dorato rovesciata e l'Automa del 1768 ('L'Orfeo d'Oro') con la chiavetta di carica inserita.\n• Nessuna finestra presente nel camerino."
          },
          {
            "id": "fen-02",
            "number": "#02",
            "title": "Ispezione Porta, Chiavistello & Condotto",
            "category": "Luogo",
            "timestamp": "21 Nov • Ore 23:40",
            "image": "svg:fenice-locked-door",
            "rawText": "• Chiavistello interno della porta: presenta micro-solchi circolari freschi sul pomello e un frammento spezzato di filo di seta dorata ad alta tenacità (lungo 4 cm) incastrato nella fessura sotto la soglia verso il corridoio esterno.\n• Parete nord (dietro il paravento): griglia del condotto di risonanza acustica (45x45 cm) con le 4 viti allentate; sul bordo inferiore tracce di polvere ambrata resinosa."
          },
          {
            "id": "fen-03",
            "number": "#03",
            "title": "Registro di Palcoscenico & Cronologia",
            "category": "Documento",
            "timestamp": "21 Nov • Ore 23:55",
            "image": "svg:fenice-stage-plan",
            "rawText": "• Ore 21:30 - 22:00: Intervallo tra Atto I e Atto II.\n• Ore 22:05: Inizio Atto II diretto dal Maestro Contarini.\n• Ore 22:10 - 22:25: 'Intermezzo Pastorale' diretto dal Vice-Direttore mentre il Maestro rientra da solo nel Camerino n. 1.\n• Ore 22:26: Il Maestro non torna sul podio; il Vice-Direttore prosegue fino al termine dell'opera (ore 23:10).\n• Ore 22:10 - 22:25: Tutti i 5 sospettati sono visti in sala o sul palco da decine di testimoni."
          },
          {
            "id": "fen-04",
            "number": "#04",
            "title": "Deposizione: Flavia De Santis (Soprano)",
            "category": "Deposizione",
            "timestamp": "22 Nov • Ore 00:15",
            "image": "svg:fenice-soprano",
            "rawText": "«Sono entrata nel camerino di Aurelio alle 21:35 durante l'intervallo per brindare alla prima con due coppe di Champagne Rosé. Lui era nervoso e mi ha cacciata dicendo che avrebbe bevuto più tardi.\nDalle 22:05 alle 22:45 ero ininterrottamente sul palcoscenico a cantare il secondo atto davanti a 600 spettatori.\nSoffro di aritmia lieve e porto in borsetta gocce di Digitalina.»"
          },
          {
            "id": "fen-05",
            "number": "#05",
            "title": "Analisi Chimica: Coppa & Stiletto di Vetro",
            "category": "Forense",
            "timestamp": "22 Nov • Ore 00:45",
            "image": "svg:fenice-champagne-dagger",
            "rawText": "• Coppa di Champagne col bordo dorato (rovesciata sul tappeto): contiene 120 mg di Digitalina purissima (dose letale). Sul bordo esterno: impronta labiale di rossetto 'Rouge Carmine #14', ma NESSUNA traccia di saliva o DNA della vittima.\n• Stiletto di scena in vetro di Murano (estratto dal petto della vittima): sulla guardia dell'impugnatura viene isolata una goccia di sangue fresco gruppo B Negativo (B-) e granuli di colofonia (pece per archetti da violino)."
          },
          {
            "id": "fen-06",
            "number": "#06",
            "title": "Autopsia & Tracciato Holter Cardiaco",
            "category": "Forense",
            "timestamp": "22 Nov • Ore 01:20",
            "image": "svg:fenice-autopsy",
            "rawText": "• COLPO DI SCENA 1 — Stomaco vittima: 0,0 ml di Champagne e 0,0 mg di Digitalina.\n• COLPO DI SCENA 2 — Ferita al petto da stiletto di Murano: margini completamente ESANGUI (assenza totale di reazione vitale). La pugnalata è stata inflitta POST-MORTEM su un cadavere già morto da oltre 35 minuti!\n• VERA CAUSA MORTE: micro-puntura profonda 1,8 mm sul polpastrello dell'indice DESTRO con tracce di Tetrodotossina pura e olio sintetico Moebius 9010.\n• Holter cardiaco vittima: arresto cardiaco fulminante registrato alle ore 22:14:18."
          },
          {
            "id": "fen-07",
            "number": "#07",
            "title": "Deposizione: Davide Moretti (1° Violino)",
            "category": "Deposizione",
            "timestamp": "22 Nov • Ore 01:40",
            "image": "svg:fenice-violinist",
            "rawText": "«Ho suonato in buca d'orchestra fino alle 22:47. Poi ho avuto un crampo al braccio e sono sceso nello spogliatoio fino alle 23:02. Non sono mai entrato nel camerino del Maestro!»\n• Nota medico legale: il soggetto (Gruppo B Negativo) presenta una ferita lacera fresca di 12 mm sul polso sinistro con un micro-frammento di vetro azzurro di Murano."
          },
          {
            "id": "fen-08",
            "number": "#08",
            "title": "Deposizione: Ing. Ettore Marin (Orologiaio)",
            "category": "Deposizione",
            "timestamp": "22 Nov • Ore 02:00",
            "image": "svg:fenice-horologist",
            "rawText": "«Alle 19:30, prima dello spettacolo, ho consegnato l'Automa del 1768 nel camerino del Maestro dopo aver lubrificato la molla di carica.\nDalle 21:55 fino alle 23:10 ero seduto in prima fila di platea (poltrona A-14) accanto al critico del Gazzettino: non mi sono mosso di un centimetro quando il Maestro è morto alle 22:14!»"
          },
          {
            "id": "fen-09",
            "number": "#09",
            "title": "Deposizione: Valeria Contarini (Figlia)",
            "category": "Deposizione",
            "timestamp": "22 Nov • Ore 02:20",
            "image": "svg:fenice-daughter",
            "rawText": "«Alle 22:14 stavo suonando il basso continuo al clavicembalo in orchestra. Alle 22:28, finita la mia parte, sono salita al camerino di papà: la porta era socchiusa di pochi millimetri e l'ho visto riverso e immobile.\nHo avuto il terrore che Davide fosse già passato di lì dopo le minacce di papà: così ho tirato il chiavistello interno dall'esterno usando un filo di seta da arpa fatto passare sotto la porta, che mi si è spezzato all'ultimo istante.»"
          },
          {
            "id": "fen-10",
            "number": "#10",
            "title": "Alibi Sovrintendente & Orologio Corridoio",
            "category": "Documento",
            "timestamp": "22 Nov • Ore 02:40",
            "image": "svg:digital-logs",
            "rawText": "• Lorenzo Grimaldi (Sovrintendente): ripreso dalle telecamere del Palco Reale in compagnia del Sindaco ininterrottamente dalle 21:48 alle 23:12.\n• Ammette di aver spostato avanti di 15 minuti il pendolo del corridoio alle 21:10 solo per giustificare un ritardo alla riunione sindacale.\n• Sulla cassa del pendolo: cenere di sigaro Toscano, estranea al camerino del Maestro."
          },
          {
            "id": "fen-11",
            "number": "#11",
            "title": "Rilievi sul Tentato Avvelenamento (21:35)",
            "category": "Forense",
            "timestamp": "22 Nov • Ore 03:10",
            "image": "svg:toxicology-lab",
            "rawText": "• Nel cestino del camerino di Flavia De Santis: flacone vuoto di 'Digitalina 2%' con impronte della soprano.\n• Ricostruzione: alle 21:35 Flavia aveva versato la Digitalina nella coppa del Maestro e poggiato le labbra sulla propria coppa per simulare il brindisi, ma nella fretta ha scambiato i calici o il Maestro, astemio prima di dirigere, ha urtato la coppa alle 21:36 senza berne nemmeno una goccia."
          },
          {
            "id": "fen-12",
            "number": "#12",
            "title": "Rilievi Condotto Acustico & Custodia Violino",
            "category": "Forense",
            "timestamp": "22 Nov • Ore 03:35",
            "image": "svg:fenice-locked-door",
            "rawText": "• Condotto di risonanza acustica (collegato allo spogliatoio orchestrali): rilevate impronte palmari di Davide Moretti e polvere di colofonia.\n• Nella custodia del violino di Moretti: rinvenuta la lettera di denuncia del Maestro macchiata di sangue B- e un cacciavite a croce.\n• Messo alle strette, Moretti confessa: «Sono entrato dal condotto alle 22:52 perché la porta era bloccata col chiavistello. Nel buio ho creduto che Aurelio dormisse sulla sedia: in preda al panico l'ho colpito col pugnale di scena di Murano, che si è spezzato ferendomi il polso, ho preso la lettera e sono fuggito dal condotto alle 22:58!»"
          },
          {
            "id": "fen-13",
            "number": "#13",
            "title": "Verifica Tecnica Camera Chiusa (Ore 22:30)",
            "category": "Forense",
            "timestamp": "22 Nov • Ore 04:00",
            "image": "svg:fenice-daughter",
            "rawText": "• Nella borsa del clavicembalo di Valeria Contarini viene repertato un rocchetto di filo di seta dorata identico per torsione e lotto chimico al frammento di 4 cm rimasto sotto la porta del Camerino n. 1.\n• Questo spiega il paradosso della camera chiusa: alle 22:14 la porta NON era chiusa a chiave; è stata bloccata dall'esterno da Valeria alle 22:30 col trucco del filo, costringendo poi Moretti a passare dal condotto acustico alle 22:52."
          },
          {
            "id": "fen-14",
            "number": "#14",
            "title": "Perizia Meccanica sull'Automa del 1768",
            "category": "Forense",
            "timestamp": "22 Nov • Ore 04:30",
            "image": "svg:fenice-automaton",
            "rawText": "• COLPO DI SCENA 3 — L'ispezione microscopica della chiavetta d'oro di carica dell'Automa rivela una modifica micromeccanica letale:\n• All'interno dell'albero cavo della chiavetta è stato fresato un alloggiamento con molla a scatto calibrata sul 3° giro di carica.\n• Al terzo giro completo (eseguito dal Maestro alle 22:13), un micro-ago chirurgico da 0,2 mm intriso di Tetrodotossina e olio Moebius 9010 scatta fuori dal foro dell'impugnatura, pungendo il polpastrello dell'indice destro di chi gira la chiave!"
          },
          {
            "id": "fen-15",
            "number": "#15",
            "title": "Perquisizione Laboratorio Ing. Ettore Marin",
            "category": "Documento",
            "timestamp": "22 Nov • Ore 05:10",
            "image": "svg:vault-registry",
            "rawText": "• Nel laboratorio di orologeria dell'Ing. Ettore Marin (Cannaregio):\n• Sul tornio di precisione: trucioli microscopici di lega aurea 18kt identici alla chiavetta forata dell'Automa e flacone di lubrificante 'Moebius 9010'.\n• Nel frigorifero blindato per tassidermia ittiologica: fiala aperta di Tetrodotossina anidra estratta da Tetraodontidae (pesce palla) e confezione di micro-aghi da agopuntura calibro 0,20 mm."
          },
          {
            "id": "fen-16",
            "number": "#16",
            "title": "Perizia XRF sull'Automa & Conto di Ginevra",
            "category": "Documento",
            "timestamp": "22 Nov • Ore 05:45",
            "image": "svg:fenice-xrf-report",
            "rawText": "• L'analisi spettrometrica XRF sull'Automa 'L'Orfeo d'Oro' svela il movente: il movimento interno NON è quello originale del 1768, ma una replica moderna in ottone al piombo lavorata a controllo numerico (CNC) nel 2026!\n• Email sul telefono del Maestro Contarini (inviata ore 18:50 a Marin): «Ettore, il suono del carillon è cambiato. Domani mattina alle 09:00 i periti assicurativi eseguiranno la scansione metallurgica XRF sull'Automa».\n• Rogatoria bancaria: Ettore Marin aveva venduto il vero meccanismo del 1768 a un collezionista di Ginevra il 4 Novembre per 1.200.000 CHF."
          }
        ],
        "solution": [
          {
            "id": "fq1",
            "question": "1. Chi è il vero assassino che ha causato la morte del Maestro Aurelio Contarini?",
            "options": [
              "Flavia De Santis (Prima Soprano)",
              "Davide Moretti (Primo Violino)",
              "Ing. Ettore Marin (Maestro Orologiaio)",
              "Valeria Contarini (Figlia del Maestro)"
            ],
            "correctOptionIndex": 2,
            "explanation": "L'Ing. Ettore Marin ha ucciso il Maestro a distanza senza bisogno di trovarsi nel camerino alle 22:14: alle 19:30 ha installato nella chiavetta di carica dell'Automa un micro-ago a scatto intriso di Tetrodotossina (Carte #06, #08, #14, #15), sapendo che il Maestro caricava puntualmente il carillon con 3 giri di chiave durante l'intermezzo delle 22:12."
          },
          {
            "id": "fq2",
            "question": "2. Qual è stata la vera causa della morte e a che ora esatta è deceduto il Maestro?",
            "options": [
              "Trauma cardiaco da stiletto in vetro di Murano alle ore 22:52",
              "Avvelenamento da Digitalina nello Champagne Rosé alle ore 21:35",
              "Inoculazione di Tetrodotossina sul polpastrello destro tramite il micro-ago nella chiavetta dell'Automa, con arresto cardiaco alle 22:14",
              "Asfissia meccanica provocata col filo di seta dorata alle ore 22:30"
            ],
            "correctOptionIndex": 2,
            "explanation": "L'autopsia e l'Holter cardiaco (Carta #06) dimostrano che il Maestro è morto alle 22:14:18 per Tetrodotossina inoculata nel polpastrello dell'indice destro dal meccanismo a scatto nascosto nella chiavetta dell'Automa (Carta #14). Lo stomaco era privo di Champagne/Digitalina e la ferita al petto col pugnale di vetro era esangue (post-mortem)."
          },
          {
            "id": "fq3",
            "question": "3. Perché il cadavere aveva uno stiletto di Murano conficcato nel petto se era già morto avvelenato?",
            "options": [
              "È stato Ettore Marin alle 19:30 prima dell'inizio dell'opera",
              "Davide Moretti si è introdotto dal condotto acustico alle 22:52 per rubare la lettera di denuncia e, nel buio, ha colpito il corpo già morto da 38 minuti",
              "Flavia De Santis lo ha colpito alle 21:35 dopo che il Maestro ha rifiutato lo Champagne",
              "Il Maestro si è ferito da solo cadendo sullo specchio durante l'arresto cardiaco"
            ],
            "correctOptionIndex": 1,
            "explanation": "Alle 22:52 il primo violino Davide Moretti è entrato dal condotto acustico (trovando la porta chiusa col chiavistello) per sottrarre la lettera di denuncia. Vedendo la sagoma del Maestro nel buio e credendolo vivo, lo ha colpito col pugnale di scena in vetro di Murano su un corpo già deceduto alle 22:14, ferendosi il polso e lasciando sangue B- e pece da violino (Carte #05, #06, #07, #12)."
          },
          {
            "id": "fq4",
            "question": "4. Come si spiega l'enigma della 'camera chiusa' (chiavistello interno bloccato) se sia l'assassino sia gli altri sospettati erano fuori alle 23:15?",
            "options": [
              "Il Maestro si è chiuso dentro prima di caricare l'Automa e nessuno è più entrato",
              "Ettore Marin aveva costruito un chiavistello magnetico telecomandato",
              "Valeria Contarini ha bloccato il chiavistello dall'esterno alle 22:30 con un filo di seta da arpa fatto passare sotto la porta, mentre Moretti alle 22:52 è entrato e uscito dal condotto acustico",
              "I pompieri hanno fatto scattare il chiavistello per errore sfondando la porta"
            ],
            "correctOptionIndex": 2,
            "explanation": "Valeria Contarini, trovando il padre morto alle 22:28 e temendo che venisse incolpato il fidanzato Davide Moretti, ha chiuso il chiavistello dall'esterno usando un filo di seta dorata da arpa fatto passare sotto la soglia (dove se n'è spezzato un frammento di 4 cm, Carte #02, #09, #13). Venti minuti dopo (22:52), Moretti è passato attraverso la griglia del condotto acustico."
          },
          {
            "id": "fq5",
            "question": "5. Chi aveva avvelenato la coppa di Champagne con la Digitalina e perché non ha ucciso il Maestro?",
            "options": [
              "Lorenzo Grimaldi, ma la coppa è evaporata per il caldo del camerino",
              "Flavia De Santis alle 21:35 per evitare l'esclusione dalla tournée, ma il Maestro (astemio prima di dirigere) non ne ha bevuto nemmeno un sorso",
              "Valeria Contarini per ereditare il patrimonio paterno",
              "Ettore Marin come piano di riserva nel caso l'Automa non funzionasse"
            ],
            "correctOptionIndex": 1,
            "explanation": "La soprano Flavia De Santis ha versato 120 mg della propria Digitalina nella coppa con bordo dorato alle 21:35 (Carte #04, #05, #11), ma il Maestro non beveva mai alcolici prima di dirigere e lo stomaco è risultato completamente vuoto (0,0 ml di Champagne e 0,0 mg di Digitalina, Carta #06)."
          },
          {
            "id": "fq6",
            "question": "6. Qual era il vero movente dell'Ing. Ettore Marin per assassinare il Maestro proprio la sera del 21 Novembre?",
            "options": [
              "Un debito di gioco contratto con il Sovrintendente Grimaldi",
              "Impedire la perizia spettrometrica XRF fissata per l'indomani mattina, che avrebbe scoperto il furto del meccanismo originale del 1768 venduto a Ginevra per 1.200.000 CHF",
              "Vendicarsi per il licenziamento di suo figlio dall'orchestra del teatro",
              "Impossessarsi della partitura autografa dell'Orfeo custodita nel camerino"
            ],
            "correctOptionIndex": 1,
            "explanation": "Marin aveva sostituito il meccanismo originale settecentesco dell'Automa con una copia moderna CNC e venduto l'originale a Ginevra per 1.200.000 CHF. Alle 18:50 del 21 Novembre il Maestro gli aveva comunicato che l'indomani mattina alle 09:00 i periti avrebbero eseguito la scansione XRF sull'Automa (Carta #16)."
          }
        ]
      }
    },
    'caso-904-abbazia': {
      file: './scenario-abbazia.json',
      data: {
        "metadata": {
          "id": "caso-904-abbazia",
          "caseNumber": "FASCICOLO #904-AO",
          "title": "L'Ombra della Cripta — Delitto all'Eremo di San Bernardo",
          "date": "2-3 Dicembre 2026",
          "location": "Eremo & Biblioteca Antica di San Bernardo (Valle d'Aosta, 2.180 m)",
          "description": "Isolati da una violenta tormenta di neve a oltre duemila metri di quota, cinque presenti assistono al ritrovamento del corpo senza vita del celebre paleografo Prof. Gregorio Dalmasso ai piedi della ripida scalinata in pietra della Cripta Ipogea. Accanto al corpo giace un pesante candelabro in bronzo macchiato di sangue e il suo orologio da polso con il vetro infranto fermo sulle 22:40. La Carta #01 espone il contesto iniziale e i 6 Quesiti della Procura a cui dovrai rispondere a testo libero al termine dell'indagine.",
          "victim": {
            "name": "Prof. Gregorio Dalmasso",
            "age": 66,
            "role": "Paleografo & Direttore del Restauro del 'Codex Vallis'",
            "bloodType": "AB Positivo (AB+)",
            "notes": "Destrorso. Diabetico di tipo 2 monitorato con sensore glicemico sottocutaneo continuo (CGM) collegato al tablet. Esperto di falsi medievali e diagnostica multispettrale a raggi UV."
          },
          "suspects": [
            {
              "id": "a1",
              "name": "Padre Anselmo Viret",
              "age": 69,
              "role": "Priore dell'Eremo & Custode dell'Archivio",
              "traits": "Destrorso • Gruppo A+ • Cammina con bastone dal puntale in ottone • Cura l'apiario",
              "notes": "Fortemente contrario al trasferimento del 'Codex Vallis' presso i laboratori statali di Torino voluto dalla vittima."
            },
            {
              "id": "a2",
              "name": "Dott.ssa Miriam Alverà",
              "age": 38,
              "role": "Chimica dei Pigmenti & Vicedirettrice Restauro",
              "traits": "Mancina • Gruppo 0- • Fuma tabacco al chiodo di garofano • Maneggia Orpimento (Arsenico)",
              "notes": "Collaboratrice diretta del Professore nello Scriptorium; in difficoltà finanziarie per debiti pregressi."
            },
            {
              "id": "a3",
              "name": "Federico Dalmasso",
              "age": 33,
              "role": "Figlio della Vittima & Antiquario a Ginevra",
              "traits": "Destrorso • Gruppo A- • Stivali La Sportiva taglia 43 • Allergico alle api (usa EpiPen)",
              "notes": "Giunto all'eremo nel pomeriggio del 2 Dicembre per chiedere al padre una fideiussione urgente per la sua galleria."
            },
            {
              "id": "a4",
              "name": "Suor Cecilia (Elena Roux)",
              "age": 45,
              "role": "Speziale & Responsabile Erboristeria Monastica",
              "traits": "Destrorsa • Gruppo B+ • Distilla liquore Genepy • Ex infermiera anestesista",
              "notes": "Gestisce la farmacia dell'eremo, la distilleria di erbe alpine e le spedizioni postali dei prodotti monastici."
            },
            {
              "id": "a5",
              "name": "Marco Chabod",
              "age": 52,
              "role": "Guardiano Tecnico & Manutentore Caldaie",
              "traits": "Mancino • Gruppo 0+ • Scarponi chiodati taglia 45 • Addetto al generatore elettrico",
              "notes": "Conosce ogni passaggio interno dell'abbazia; gestisce il gruppo elettrogeno diesel e la manutenzione."
            }
          ]
        },
        "cards": [
          {
            "id": "abb-01",
            "number": "#01",
            "title": "Briefing dello Scenario & Quesiti della Procura",
            "category": "Documento",
            "timestamp": "2 Dic • Ore 23:10",
            "image": "svg:abbazia-briefing",
            "rawText": "SCENARIO INIZIALE:\nLa sera del 2 Dicembre 2026 una tormenta isola l'Eremo di San Bernardo. Alle 23:10 il Prof. Gregorio Dalmasso viene trovato privo di vita ai piedi della scalinata della Cripta Ipogea, con una ferita lacero-contusa alla nuca, un candelabro di bronzo insanguinato accanto e l'orologio da polso spezzato sulle 22:40.\n\nQUESITI FINALI DELLA PROCURA (A RISPOSTA APERTA):\n1. Chi ha effettivamente ucciso il Prof. Dalmasso e con quale arma/modalità?\n2. A che ora precisa è morto e perché l'orologio segna le 22:40?\n3. Qual è il vero movente dell'assassino legato al 'Codex Vallis'?\n4. Chi lo ha colpito alla nuca col candelabro di bronzo e perché quel colpo non l'ha ucciso?\n5. Chi aveva avvelenato il liquore Genepy nello Scriptorium e che fine ha fatto?\n6. Chi ha causato il blackout delle 22:28 e spostato il corpo nella Cripta?"
          },
          {
            "id": "abb-02",
            "number": "#02",
            "title": "Sopralluogo Cripta Ipogea & Scalinata",
            "category": "Luogo",
            "timestamp": "2 Dic • Ore 23:25",
            "image": "svg:abbazia-crypt-stairs",
            "rawText": "• Il cadavere giace supino alla base dei 18 gradini in pietra che scendono dal corridoio alla Cripta.\n• A 40 cm dalla testa: candelabro a tre bracci in bronzo con tracce ematiche (gruppo AB+) e capelli grigi della vittima.\n• ANOMALIA 1: Sui 18 gradini polverosi non vi è alcun segno di rotolamento o urto del corpo.\n• ANOMALIA 2: Gli occhiali da lettura in cristallo sottile del Professore sono intatti nel taschino sul petto."
          },
          {
            "id": "abb-03",
            "number": "#03",
            "title": "Sopralluogo Scriptorium (Piano Superiore)",
            "category": "Luogo",
            "timestamp": "2 Dic • Ore 23:45",
            "image": "svg:abbazia-scriptorium",
            "rawText": "• Lo Scriptorium si trova esattamente sopra la Cripta. Sul leggio centrale è aperto il manoscritto duecentesco 'Codex Vallis' sotto una lampada di Wood (raggi UV) ancora accesa.\n• Vicino alla fioriera nell'angolo: un bicchierino da liquore vuoto posato sul terriccio umido che emana un forte odore di erbe alpine (Genepy).\n• Sul tappeto dietro il leggio: una singola goccia di cera d'api vergine e una macchia di fango scuro."
          },
          {
            "id": "abb-04",
            "number": "#04",
            "title": "Rilievi Termici & Perizia sull'Orologio",
            "category": "Forense",
            "timestamp": "3 Dic • Ore 00:15",
            "image": "svg:thermal-blood",
            "rawText": "• Temp. epatica del cadavere alle ore 23:30: 34,0 °C (temperatura normale: 37,0 °C; nel freddo dell'eremo il raffreddamento cadaverico è di esattamente 2,0 °C per ogni ora trascorsa dalla morte).\n• Ispezione microscopica dell'orologio da polso della vittima (fermo sulle 22:40 col vetro rotto): la corona laterale di regolazione dell'ora si trova nella posizione ESTRATTA (scatto di rimessa manuale) e il vetro presenta l'impronta netta di un tacco chiodato."
          },
          {
            "id": "abb-05",
            "number": "#05",
            "title": "Deposizione: Padre Anselmo Viret (Priore)",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 00:35",
            "image": "svg:abbazia-priore",
            "rawText": "«Dalle 21:30 alle 22:45 sono rimasto in Cappella a pregare al lume delle candele di cera d'api del nostro apiario. Con la mia grave artrosi al ginocchio destro non cammino mai senza il mio bastone col puntale in ottone e non potrei mai scendere la ripida scalinata della Cripta.\nÈ vero, ieri ho discusso con Gregorio: voleva trasferire il Codex Vallis a Torino, privando l'eremo del suo tesoro.»"
          },
          {
            "id": "abb-06",
            "number": "#06",
            "title": "Deposizione: Dott.ssa Miriam Alverà",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 00:55",
            "image": "svg:abbazia-chimica",
            "rawText": "«Ho lavorato nello Scriptorium con il Professore fino alle 21:20 per catalogare i pigmenti gialli a base di Orpimento (trisolfuro di arsenico). Poi sono salita nella mia cella al secondo piano, ho fumato una sigaretta al chiodo di garofano e mi sono collegata al Wi-Fi dell'eremo senza più scendere.\nIl Professore era severo, ma non avrei mai potuto fargli del male.»"
          },
          {
            "id": "abb-07",
            "number": "#07",
            "title": "Deposizione: Federico Dalmasso (Figlio)",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 01:15",
            "image": "svg:abbazia-figlio",
            "rawText": "«Dalle 21:30 alle 23:00 ero nella Sala Camino al piano terra per una lunga chiamata sul telefono satellitare con i miei soci di Ginevra.\nAvevo lasciato il mio borsello medico incustodito nell'ingresso dell'Erboristeria tra le 20:30 e le 21:30: dentro tenevo due autoiniettori automatici EpiPen per la mia allergia alle api, ma ora controllando insieme a voi ne è rimasto soltanto uno!»"
          },
          {
            "id": "abb-08",
            "number": "#08",
            "title": "Deposizione: Suor Cecilia (Speziale)",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 01:35",
            "image": "svg:abbazia-suora",
            "rawText": "«Alle 21:36 ho preparato in Erboristeria il vassoio con il bicchierino del nostro liquore Genepy per il Professore. L'ho lasciato un minuto sul bancone del corridoio per chiudere la dispensa e alle 21:40 l'ho servito nello Scriptorium: il Professore era vivo e stava esaminando il Codex Vallis con la lampada UV e il tablet.\nAlle 21:55 sono tornata un istante nello Scriptorium solo per riprendere il vassoio vuoto, e lui stava benissimo.»"
          },
          {
            "id": "abb-09",
            "number": "#09",
            "title": "Deposizione: Marco Chabod (Manutentore)",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 01:55",
            "image": "svg:abbazia-custode",
            "rawText": "«Alle 22:28 il generatore diesel è saltato per il gelo lasciando l'intero eremo al buio completo fino alle 22:39. In quegli undici minuti ero chiuso nel locale motori esterno a spurgare la pompa del gasolio.\nPorto scarponi chiodati taglia 45 per camminare nel ghiaccio, ma stasera non sono mai salito nello Scriptorium né sceso nella Cripta.»"
          },
          {
            "id": "abb-10",
            "number": "#10",
            "title": "Referto Autoptico & Tossicologia Cadaverica",
            "category": "Forense",
            "timestamp": "3 Dic • Ore 02:20",
            "image": "svg:abbazia-autopsy-epipen",
            "rawText": "• COLPO DI SCENA 1 — La ferita lacero-contusa alla nuca (candelabro di bronzo) presenta margini ESANGUI e zero edema vitale: è stata inflitta POST-MORTEM su un corpo già deceduto!\n• COLPO DI SCENA 2 — Stomaco vittima: 0,0 ml di liquore Genepy e 0,0 mg di Arsenico.\n• VERA CAUSA DELLA MORTE: Arresto cardiorespiratorio fulminante da iniezione intramuscolare di Succinilcolina cloruro (curaro ospedaliero paralizzante) + Cloruro di Potassio.\n• Sulla spalla SINISTRA (attraverso la giacca): foro d'ago circondato dall'ecchimosi ad anello tipica di un autoiniettore a molla."
          },
          {
            "id": "abb-11",
            "number": "#11",
            "title": "Analisi Chimica della Fioriera nello Scriptorium",
            "category": "Forense",
            "timestamp": "3 Dic • Ore 02:45",
            "image": "svg:abbazia-scriptorium",
            "rawText": "• Nel terriccio della fioriera dello Scriptorium vengono isolati 35 ml di liquore Genepy contenenti 180 mg di Orpimento macinato (Trisolfuro di Arsenico letale).\n• Sull'appunti-vocale del telefono del Professore (registrato alle ore 21:48): «Nota riservata: il Genepy servito stasera presenta un precipitato giallo sulfureo sul fondo del bicchiere. L'ho versato nella fioriera senza berlo per analizzarlo domani»."
          },
          {
            "id": "abb-12",
            "number": "#12",
            "title": "Telemetria Sensore Glicemico (CGM) Vittima",
            "category": "Documento",
            "timestamp": "3 Dic • Ore 03:05",
            "image": "svg:autopsy-ecg",
            "rawText": "• Scaricamento dati dal sensore sottocutaneo continuo del Prof. Dalmasso:\n• Ore 21:40 – 21:55: parametri vitali regolari mentre la vittima lavora al leggio dello Scriptorium.\n• Ore 21:56:30: improvviso picco adrenergico da colluttazione/sorpresa.\n• Ore 21:59:10: cessazione definitiva della perfusione ematica e arresto cardiaco (coerente con la temperatura epatica di 34,0 °C rilevata 1,5 ore dopo alle 23:30)."
          },
          {
            "id": "abb-13",
            "number": "#13",
            "title": "Ispezione Scala a Chiocciola & Cera d'Api",
            "category": "Luogo",
            "timestamp": "3 Dic • Ore 03:25",
            "image": "svg:abbazia-priore",
            "rawText": "• Dietro lo scaffale ligneo dello Scriptorium si apre una porticina di servizio collegata alla Cappella da soli 4 gradini bassi.\n• Sul pavimento vicino al leggio dello Scriptorium: il Luminol e la luce radente evidenziano l'impronta circolare di un puntale in ottone da 22 mm (identico al bastone di Padre Anselmo) e gocce di cera d'api liturgica della Cappella.\n• Sulla base del candelabro di bronzo: impronte digitali parziali di Padre Anselmo Viret."
          },
          {
            "id": "abb-14",
            "number": "#14",
            "title": "Secondo Interrogatorio: Confessione del Priore",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 03:45",
            "image": "svg:abbazia-priore",
            "rawText": "• Messo di fronte alle impronte del bastone e alla cera d'api nello Scriptorium, Padre Anselmo scoppia in lacrime:\n«Sono entrato nello Scriptorium alle 22:15 passando dalla porticina della Cappella. La stanza era in penombra e Gregorio era steso a terra accanto al leggio. Quando mi sono chinato per prendere il Codex Vallis, il suo braccio è scivolato e nel panico ho creduto che si stesse rialzando per denunciarmi: ho afferrato il candelabro di bronzo e l'ho colpito alla nuca alle 22:18! Ero convinto di averlo ucciso io!»"
          },
          {
            "id": "abb-15",
            "number": "#15",
            "title": "Perizia Quadro Elettrico & Tracce Taglia 45",
            "category": "Forense",
            "timestamp": "3 Dic • Ore 04:05",
            "image": "svg:forensic-digital",
            "rawText": "• Il generatore diesel esterno non ha subito alcun blocco da gelo: il registro elettronico mostra che il blackout delle 22:28–22:39 è stato provocato abbassando manualmente l'interruttore generale nel quadro interno.\n• Tra lo Scriptorium e la sommità della scalinata della Cripta: rilevate impronte fangose di scarponi chiodati taglia 45 (compatibili con la frattura sul vetro dell'orologio della vittima) e segni di trasporto a braccia del corpo."
          },
          {
            "id": "abb-16",
            "number": "#16",
            "title": "Confessione di Marco Chabod (Lo Spostamento)",
            "category": "Deposizione",
            "timestamp": "3 Dic • Ore 04:25",
            "image": "svg:abbazia-custode",
            "rawText": "• Confrontato con la perizia sul generatore e le impronte taglia 45, il manutentore Marco Chabod ammette:\n«Alle 22:22 Padre Anselmo è corso da me sconvolto dicendo di aver ucciso per errore il Professore nello Scriptorium col candelabro. Mi ha offerto 20.000 euro per inscenare una caduta accidentale: alle 22:28 ho staccato la corrente, ho caricato il corpo sulle spalle portandolo dallo Scriptorium ai piedi della Cripta, ho messo lì il candelabro, ho tirato la corona dell'orologio portandolo sulle 22:40 e ne ho spaccato il vetro col tacco dello scarpone!»"
          },
          {
            "id": "abb-17",
            "number": "#17",
            "title": "Perquisizione Cella di Miriam Alverà",
            "category": "Forense",
            "timestamp": "3 Dic • Ore 04:45",
            "image": "svg:abbazia-chimica",
            "rawText": "• Vicino al bancone del corridoio dove Suor Cecilia aveva lasciato incustodito il vassoio alle 21:37 viene repertata cenere di tabacco al chiodo di garofano.\n• Messa alle strette, la Dott.ssa Miriam Alverà confessa il tentato avvelenamento: «Il Professore aveva scoperto che avevo venduto due frammenti di pergamena minore. Alle 21:38, mentre Suor Cecilia era in dispensa, ho versato l'Orpimento (Arsenico) nel bicchierino di Genepy sul vassoio! Poi alle 21:42 mi sono chiusa in cella» (alibi dalle 21:42 confermato dai log della serratura magnetica e del router)."
          },
          {
            "id": "abb-18",
            "number": "#18",
            "title": "Ritrovamento dell'EpiPen nell'Inceneritore",
            "category": "Forense",
            "timestamp": "3 Dic • Ore 05:10",
            "image": "svg:abbazia-autopsy-epipen",
            "rawText": "• COLPO DI SCENA 3 — Nella cenere fredda della stufa dell'Erboristeria Monastica viene rinvenuto l'autoiniettore automatico 'EpiPen' sottratto dal borsello di Federico Dalmasso.\n• L'analisi di laboratorio dimostra che il serbatoio interno è stato svuotato dell'adrenalina e ricaricato con una soluzione letale di Succinilcolina cloruro e Cloruro di Potassio.\n• Sulla ghiera interna del dispositivo: micro-tracce di olio essenziale di Artemisia genipi (Genepy) e lattice di guanti chirurgici taglia S."
          },
          {
            "id": "abb-19",
            "number": "#19",
            "title": "Dossier Segreto: Chi è davvero Suor Cecilia",
            "category": "Documento",
            "timestamp": "3 Dic • Ore 05:35",
            "image": "svg:abbazia-suora",
            "rawText": "• Verifica dattiloscopica Interpol su Suor Cecilia: la donna è in realtà la Dott.ssa Elena Roux, ex medico anestesista dell'Ospedale di Lione, ricercata in Francia dal 2019 per la sottrazione di fiale ospedaliere di Succinilcolina e per una morte sospetta.\n• Nella cella di Suor Cecilia, dentro il doppiofondo della cassetta di pronto soccorso dell'Erboristeria: rinvenute 3 fiale intatte di 'Succinilcolina Cloruro 100mg/2ml' e 1 fiala appena svuotata, oltre a siringhe di precisione per il travaso nell'autoiniettore EpiPen."
          },
          {
            "id": "abb-20",
            "number": "#20",
            "title": "Scansione UV sul 'Codex Vallis' & Casse a Lione",
            "category": "Documento",
            "timestamp": "3 Dic • Ore 06:00",
            "image": "svg:abbazia-uv-codex",
            "rawText": "• Il tablet del Prof. Dalmasso (bloccato con ultimo salvataggio alle ore 21:54) rivela il VERO MOVENTE:\n• Esaminando il 'Codex Vallis' ai raggi UV, il Professore aveva appena scoperto che le 4 miniature più preziose del 1280 (valore 1,4 milioni di €) erano state tagliate e sostituite con falsi moderni invecchiati chimicamente usando un decotto di Genepy dell'Erboristeria!\n• Nel registro spedizioni dell'Erboristeria: Suor Cecilia contrabbandava le miniature autentiche sul mercato nero di Lione nascondendole nel doppiofondo delle casse di bottiglie di Genepy (bonifico di 680.000 € sul conto cifrato di Elena Roux). Tornata nello Scriptorium alle 21:55, ha visto la scoperta sul tablet del Professore e alle 21:56 gli ha piantato nella spalla l'EpiPen modificato!"
          }
        ],
        "solution": [
          {
            "id": "aq1",
            "question": "1. Chi ha effettivamente ucciso il Prof. Gregorio Dalmasso e con quale arma/modalità esatta?",
            "officialAnswer": "Suor Cecilia (al secolo Dott.ssa Elena Roux), iniettandogli nella spalla sinistra Succinilcolina e Cloruro di Potassio tramite l'autoiniettore EpiPen rubato a Federico e modificato.",
            "acceptedKeywords": [
              ["cecilia", "elena", "roux", "suora", "speziale"],
              ["epipen", "iniettore", "autoiniettore", "succinilcolina", "potassio", "iniezione", "spalla"]
            ],
            "explanation": "Suor Cecilia (l'ex anestesista Elena Roux) aveva rubato un autoiniettore EpiPen dal borsello di Federico Dalmasso tra le 20:30 e le 21:30, riempiendolo con Succinilcolina cloruro e Cloruro di Potassio (Carte #07, #10, #18, #19). Tornata nello Scriptorium alle 21:55, ha colpito il Professore alla spalla sinistra alle 21:56 causando l'arresto cardiaco alle 21:59 (Carta #12)."
          },
          {
            "id": "aq2",
            "question": "2. A che ora precisa è avvenuto il decesso della vittima e perché l'orologio da polso segnava invece le 22:40?",
            "officialAnswer": "Il decesso è avvenuto alle ore 21:59 nello Scriptorium. L'orologio è stato spostato manualmente sulle 22:40 (corona estratta) e rotto col tacco dallo scarpone di Marco Chabod durante la messinscena.",
            "acceptedKeywords": [
              ["21:59", "22:00", "21:56", "21.59", "22.00"],
              ["chabod", "marco", "manutentore", "corona", "manualmente", "spostato", "falso", "messinscena", "tacco"]
            ],
            "explanation": "Sia la telemetria del sensore CGM (morte clinica alle 21:59:10, Carta #12) sia il raffreddamento epatico (34,0 °C alle 23:30 con calo di 2 °C/ora = 1,5 ore prima → ~22:00, Carta #04) confermano la morte alle 21:59. L'orologio è stato portato avanti manualmente sulle 22:40 (corona rimasta estratta) e spaccato col tacco chiodato da Marco Chabod durante il blackout delle 22:28-22:39 (Carte #04, #16)."
          },
          {
            "id": "aq3",
            "question": "3. Qual è il vero movente dell'assassino e cosa aveva appena scoperto il Professore esaminando il 'Codex Vallis'?",
            "officialAnswer": "Il Professore aveva scoperto con la lampada UV che 4 miniature del '200 del Codex Vallis erano state sostituite con falsi invecchiati al Genepy e contrabbandate a Lione da Suor Cecilia nelle casse di liquore (per 680.000 €).",
            "acceptedKeywords": [
              ["codex", "miniature", "pergamene", "falsi", "uv", "lione", "contrabbando", "casse", "680", "1,4"]
            ],
            "explanation": "Alle 21:54 il Prof. Dalmasso aveva documentato con la lampada UV che le 4 miniature più preziose del 'Codex Vallis' erano state sostituite con copie moderne invecchiate col decotto di Genepy. Suor Cecilia usava le spedizioni delle casse di liquore dell'Erboristeria per esportare le pergamene autentiche a un ricettatore di Lione per 680.000 € (Carta #20)."
          },
          {
            "id": "aq4",
            "question": "4. Chi ha colpito il cranio del Professore con il candelabro di bronzo e perché quel colpo non è stato la causa della morte?",
            "officialAnswer": "Padre Anselmo Viret lo ha colpito alle 22:18 nello Scriptorium, ma la ferita era post-mortem (esangue) perché il Professore era già morto alle 21:59 per l'iniezione di Suor Cecilia.",
            "acceptedKeywords": [
              ["anselmo", "priore", "viret", "padre"],
              ["post-mortem", "post mortem", "già morto", "esangue", "22:18", "21:59", "cadavere"]
            ],
            "explanation": "Padre Anselmo è entrato nello Scriptorium alle 22:15 (lasciando le tracce del puntale in ottone del bastone e cera d'api, Carta #13). Vedendo un movimento passivo del braccio del corpo nel buio mentre cercava di prendere il manoscritto, lo ha colpito alla nuca col candelabro alle 22:18 (Carta #14), quando Gregorio era già morto da 19 minuti (ferita completamente esangue all'autopsia, Carta #10)."
          },
          {
            "id": "aq5",
            "question": "5. Chi aveva avvelenato il bicchierino di liquore Genepy nello Scriptorium e che fine ha fatto quel liquore?",
            "officialAnswer": "La Dott.ssa Miriam Alverà lo aveva avvelenato alle 21:38 con Orpimento (Arsenico), ma il Professore ha sentito l'odore sulfureo e lo ha versato nella fioriera dello Scriptorium senza berlo.",
            "acceptedKeywords": [
              ["miriam", "alverà", "alvera", "chimica"],
              ["fioriera", "versato", "pianta", "terra", "non l'ha bevuto", "non ha bevuto", "arsenico", "orpimento"]
            ],
            "explanation": "Miriam Alverà ha versato 180 mg di Orpimento (trisolfuro di arsenico) nel bicchierino sul vassoio incustodito alle 21:38 per coprire un piccolo furto di frammenti (Carta #17). Tuttavia alle 21:48 il Professore ha notato il precipitato giallo sulfureo e ha rovesciato il liquore nella terra della fioriera dello Scriptorium senza berne una goccia (Carte #03, #10, #11)."
          },
          {
            "id": "aq6",
            "question": "6. Chi ha provocato il blackout delle 22:28 e spostato il cadavere nella Cripta, e quali tracce fisiche lo inchiodano?",
            "officialAnswer": "Il manutentore Marco Chabod (pagato da Padre Anselmo con 20.000 €), inchiodato dalla manomissione manuale del quadro elettrico e dalle impronte di scarponi chiodati taglia 45 (anche sul vetro dell'orologio).",
            "acceptedKeywords": [
              ["marco", "chabod", "manutentore", "custode", "guardiano"],
              ["45", "scarponi", "chiodati", "quadro", "interruttore", "generatore", "anselmo"]
            ],
            "explanation": "Credendo che Padre Anselmo avesse ucciso il Professore col candelabro, il manutentore Marco Chabod ha accettato 20.000 € per simulare una caduta: alle 22:28 ha abbassato manualmente l'interruttore generale, ha trasportato il corpo dallo Scriptorium ai piedi della scala della Cripta lasciando impronte di scarponi chiodati taglia 45 e ha fracassato l'orologio sulle 22:40 (Carte #04, #15, #16)."
          }
        ]
      }
    }
  },

  async loadPreset(presetId) {
    const preset = this.presets[presetId] || this.presets['caso-409-morosini'];
    try {
      const response = await fetch(preset.file, { cache: 'no-store' });
      if (response.ok) {
        const json = await response.json();
        if (this.validateScenario(json).valid) {
          return json;
        }
      }
    } catch (_) {
      // Fallback to embedded JSON when opened via file:// or offline
    }
    return JSON.parse(JSON.stringify(preset.data));
  },

  validateScenario(json) {
    if (!json || typeof json !== 'object') {
      return { valid: false, error: 'Il file non contiene un oggetto JSON valido.' };
    }
    if (!json.metadata || !json.metadata.title) {
      return { valid: false, error: 'Campo "metadata.title" mancante nello scenario.' };
    }
    if (!Array.isArray(json.cards) || json.cards.length === 0) {
      return { valid: false, error: 'L\'array "cards" è mancante o vuoto.' };
    }
    if (!Array.isArray(json.solution) || json.solution.length === 0) {
      return { valid: false, error: 'L\'array "solution" è mancante o vuoto.' };
    }
    return { valid: true };
  }
};
