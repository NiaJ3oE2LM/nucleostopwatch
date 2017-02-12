CREATE ROLE miriam WITH LOGIN PASSWORD 'jw8s0F4' VALID UNTIL '2005-01-01';
If not specified, NOLOGIN is the default, except when CREATE ROLE is invoked through its alternative spelling CREATE USER.

GRANT CONNECT ON DATABASE mydb TO xxx;
-- This assumes you're actually connected to mydb..
GRANT USAGE ON SCHEMA public TO xxx;
GRANT SELECT ON mytable TO xxx;
NT USAGE, SELECT ON SEQUENCE cities_id_seq TO www;

* le app di tabellone e direttore devono esportare dei metodi per essere aggiornate in tempo reale attraverso il websocket

#operazioni
* create table lab1_1() inherits(racemodel);
insert into teams values ('mark2','federico,fabio','marconi');
mikwork=# grant select,insert,update,delete on allexports.insertLap = function(tavolo, laptime, callback){
 tables in schema public to direttore;
GRANT
mikwork=# grant select on all tables in schema public to tabellone;GRANT
mikwork=# grant select,insert,update  on teams,speed1_1,speed2_2,lab1_1 to registrazione;
ERROR:  relation "speed2_2" does not exist
mikwork=# grant select,insert,update  on teams,speed1_1,speed2_1,lab1_1 to registrazione;

grant select on all tables in schema public to user;

#utenti

* direttore
  salect
  grant revoke role ---> collaboratore

* registrazione
  insert

* tabellone
  select

* gara
  insert attivato

#funzione
* durante la fase di registrazione l'utente registrazione compila le tabelle delle gare con i nomi dei team e i binari con cui gareggiano
* durante la gara l'utente cronometro esegue un update del valore laptime su tali tabelle in base allo stato rilevato nellat tabella current
* la tabella delle scuole deve essere compilata manualmente
* durante la gara i collaboratori possono accedere e scaricare dal database i binari da caricare sui robot
