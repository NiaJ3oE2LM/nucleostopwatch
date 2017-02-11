#include "mbed.h"

Timer lap;
Timeout del;

bool isrunning=false;

InterruptIn button(USER_BUTTON); //user button
RawSerial pc(SERIAL_TX, SERIAL_RX);
DigitalOut led(LED1);

void irq();
void log();

int main(){ 
    pc.baud(115200);
    button.fall(&irq);
    while(1){
        }   
}

    
void irq(){
    if(isrunning){
        lap.stop();
        led=0;
        isrunning=false;
        del.attach(&log, .2);
        }
    else{
        led=1;
        isrunning=true;
        lap.reset();
        lap.start();
        }
    return;
    }
    
void log(){
    pc.printf("{\"laptime\":\"%f\"}\n",lap.read());
    //del.detach();
    return;
    }