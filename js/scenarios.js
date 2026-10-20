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
