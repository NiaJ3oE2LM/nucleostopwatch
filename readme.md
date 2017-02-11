#cronometro nucleo per roboval
1. ogni cronometro consiste di una scheda nucleo collegata tramite bluetooth ad un pc server
2. il pc server (raspberry) contine un database postgres che registra i dati e un'interfaccia per la gestione delle procedure di gara accessibile tramite hotspot
3. il server è scritto in nodejs: legge da seriale (bluetooth dongle) i dati dai cronometri e mette a disposizione in localhost un'interfaccia web che permette di accedere al database e di effettuale le procedure di gara
4. tabellone di gara realtime (stessa rasberry) ottenuto con un websocket in comunicazione con il server (rete locale)

#nodi

##cronometri nucleo
* comunicazione seriale via bluetooth al pc server
* interfaccia utente: user button + led|display per iniziare una nuova gara e segnalare l'invio corretto dei dati

##database postgres
* salvataggio dei tempi gara
* salvataggio del codice arduino da caricare sui robot
* tabella team in gara
* come salvare i file binari?

##interfaccia di gestione websocket
* accesso ad una rete locale
* struttura semplice: html e bootstrap
* gestione automatica risultati di gara

##tabellone interattivo websocket
* visualizza lo stato della gara corrente
* visulizza i team che stanno partecipando, l'ordine di partenza
* visualizza messaggi di avviso per la chiamata dei team al banco gara
* visualizza lo stato della gara

#procedure
il server gestisce le fasi della gara determinando quali operazioni sono possibili

## 1. registrazione scuole e team
l'interfaccia permette di popolare le tabelle : scuole, team

## 2. registrazione sessione di gara
* registrare quali team partecipano a quale gara con quale codice
* determinare l'ordine di partenza da visualizzare nel tabellone
* creare la tabella per registrare le performance

## 3. svolgimento sessione di gara
* popolare la tabella performace per tutti i partecipanti
* visualizzare l'avanzamento della competixione sul tabellone

## 4. chiusura sessione di gara
* creazione della tabella risultati di gara
