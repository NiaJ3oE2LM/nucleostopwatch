##cronometro nucleo per roboval
1. ogni cronometro consite di una scheda nucleo collegata tramite bluetooth ad un pc server
2. il pc server contine un database postgres che registra i dati e un'interfaccia per la gstione delle procedure di gara accessibile tramite il server
3. il server è scritto in nodejs: legge da seriale (bluetooth dongle) i dati dai cronometri e mette a disposizione in localhost un'interfaccia web che permette di accedere al database e di effettuale le procedure di gara
4. (opzionale) tabellone di gara realtime ottenuto con un raspberry in comunicazione con il server (url dedicato)

##cronometri nucleo

##database postgres
* salvataggio dei tempi gara
* salvaraggio dei binari caricati sulle macchine
* tabella team in gara

##interfaccia di gestione
* procedura di login per i dirigenti della gara
* struttura semplice: html e bootstrap
* gestione automatica risultati di gara
