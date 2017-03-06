/* mbed Microcontroller Library
 * Copyright (c) 2006-2015 ARM Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include <string.h>
#include "mbed.h"
#include "ble/BLE.h"
#include "UARTService.h"

#define BUFFER_LEN 256

DigitalOut led1(LED1);
UARTService* uart;
Serial pc(USBTX, USBRX);

const static char     DEVICE_NAME[] = "tav01";

char buffer[BUFFER_LEN];

Timer lap;
Timeout del;

bool isrunning=false;

InterruptIn button(USER_BUTTON); //user button
DigitalOut led(LED1);

void send(){
    char* str = "\{\"timelap\":\"1234\"\}\r\n";
    if (uart) {
        uart->writeString(str);
        pc.printf("\n inviato");
        }
    return;
    }

void irq(){
    if(isrunning){
        lap.stop();
        led=0;
        isrunning=false;
        del.attach(&send, .2);
        }
    else{
        led=1;
        isrunning=true;
        lap.reset();
        lap.start();
        }
    return;
    }


/*Callback quando il dispositivo client si disconnette */
void disconnectionCallback(const Gap::DisconnectionCallbackParams_t *params){
    BLE::Instance().gap().startAdvertising();
    
    pc.printf("Periferica disconnessa \r\n");
}

void connectionCallback(const Gap::ConnectionCallbackParams_t *params){
    if(params->role == Gap::CENTRAL){
        pc.printf("Connesso dispositivo %u \r\n");
    }
}

void periodicCallback(void){
    led1 = !led1;
    
    /*Per spedire qualcosa al client*/
    //formato json 
    char* str = "\{\"timelap\":\"1234\"\}\r\n";
    if (uart) {
        uart->writeString(str);
        pc.printf("\n inviato");
        }
}

/**
 * Chiamata in caso di errore, ottengo il codice sulla console
 */
void onBleInitError(BLE &ble, ble_error_t error){
     pc.printf("Errore interno %u \r\n",error);
}


void onDataWritten(const GattWriteCallbackParams *params){
    if ((uart != NULL) && (params->handle == uart->getTXCharacteristicHandle())) {
        uint16_t bytesRead = params->len;
        
        pc.printf("ricevuti %u bytes\n\r ", bytesRead);
        
        if(bytesRead >= 255){
            pc.printf("Overflow comando %u n\r ", bytesRead);
            bytesRead = 255;
        }
        
        unsigned index = 0;
        for (; index < bytesRead; index++) {
            buffer[index] = params->data[index];
        }
        
        buffer[index++] = 0;
        
        pc.printf("Data : %s ",buffer);
        pc.printf("\r\n");
    }
}



/**
 * Chiamata quando il bluetooth è inizializzato
 */
void bleInitComplete(BLE::InitializationCompleteCallbackContext *params){
    
    BLE&        ble   = params->ble;
    ble_error_t error = params->error;
 
    if (error != BLE_ERROR_NONE) {
        onBleInitError(ble, error);
        return;
    }
 
    /* Controllo di avere solo una istanza bluetooth attiva */
    if(ble.getInstanceID() != BLE::DEFAULT_INSTANCE) {
        return;
    }
 
    ble.gap().onDisconnection(disconnectionCallback);
    ble.gap().onConnection(connectionCallback);
    
    /*Quando mi arriva qualcosa dal client viene invocata questa funzione*/
    ble.onDataWritten(onDataWritten);
 
    /* Imposto il servizio uart (Ne posso avere più di uno attivo) */
    uart = new UARTService(ble);
 
    /* Imposto i pacchetti di avviso attenzione posso avere connesso solo un client per volta al server */
    
    /* Imposto il disposiztivo come solo BLE e SCOPRIBILE*/
    ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::BREDR_NOT_SUPPORTED | GapAdvertisingData::LE_GENERAL_DISCOVERABLE);
    
    /* Imposto il nome della periferica*/
    ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LOCAL_NAME, (uint8_t *)DEVICE_NAME, sizeof(DEVICE_NAME));
    /* Imposto i servizi scopribili*/
    ble.accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LIST_128BIT_SERVICE_IDS,(const uint8_t *)UARTServiceUUID_reversed, sizeof(UARTServiceUUID_reversed));
   
   //Da approfondire
    ble.gap().setAdvertisingType(GapAdvertisingParams::ADV_CONNECTABLE_UNDIRECTED);
    
    /*Ogni quanto inviare un pacchetto di avviso*/
    ble.gap().setAdvertisingInterval(100); /* 1000ms. */
    
    /*Inizio a spedire i pacchetti*/
    ble.gap().startAdvertising();
 
}


int main(void){
    BLE &ble = BLE::Instance();
    ble.init(bleInitComplete);
    
    /* Aspetto fino a che la periferica bluetooth non è inizializzata */
    while (ble.hasInitialized()  == false) { /* spin loop */ }
    
    pc.printf("pronto");
    button.fall(&irq);
    
    while (true) {
        ble.waitForEvent();
    }
}


