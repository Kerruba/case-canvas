PORT ?= 8080
HOST ?= 127.0.0.1
URL  := http://$(HOST):$(PORT)

.PHONY: start run serve open check help

## Avvia il server web locale (default: make oppure make start)
start:
	@echo "🕵️‍♂️ PROFILER: CRIME BOARD in avvio su $(URL) (Premi Ctrl+C per fermare)"
	@python3 -m http.server $(PORT) --bind $(HOST)

run: start
serve: start

## Apre il browser e avvia il server locale
open:
	@echo "🕵️‍♂️ Apertura browser su $(URL)..."
	@(sleep 0.6 && open "$(URL)") &
	@python3 -m http.server $(PORT) --bind $(HOST)

## Verifica la sintassi dei file JS e JSON
check:
	@node --check js/app.js
	@node --check js/scenarios.js
	@node --check js/svg-illustrations.js
	@python3 -m json.tool scenario.json > /dev/null
	@python3 -m json.tool scenario-valenti.json > /dev/null
	@echo "✅ Sintassi JS e JSON verificata con successo."

## Mostra i comandi disponibili
help:
	@echo "Comandi disponibili:"
	@echo "  make          Avvia il server locale su $(URL)"
	@echo "  make open     Avvia il server locale e apre automaticamente il browser"
	@echo "  make start PORT=3000  Avvia il server su una porta personalizzata"
	@echo "  make check    Verifica la sintassi di tutti i file JS e JSON"
