#include "wifi.h"
#include "wifiModule.h"
#include "debug.h"
#include <stdbool.h>
#include <stdio.h>
#include "decoder.h"

// wifi controloler rename
//name convention wifiModule_initialiseWifiModule;
//class diagram
// naming variables wifiModule_AP_SSID;


extern bool debugMode;
 char *AP_SSID;
 char *AP_PSWD;
 char *ServerIP;
 uint16_t *ServerPort;

char receivedMessage[50];

// initialisation of module
void initialiseWifiModule(){
    wifi_init();
    if(debugMode){printDebug("wifiModule initialised \n");}
    
}

// changing credentials/server ip
void setAP_SSID(const char *SSID) {
    AP_SSID = SSID;
    if (debugMode) {
        char debugMessage[50];
        sprintf(debugMessage, "setAP_SSID %s  \n", AP_SSID);
        printDebug(debugMessage);
    }
}
void setAP_PSWD(const char *PSWD) {
    AP_PSWD = PSWD;
    if (debugMode) {
        char debugMessage[50];
        sprintf(debugMessage, "setAP_PSWD %s  \n", AP_PSWD);
        printDebug(debugMessage);
    }
}
void setServerIP(const char *IP) {
    ServerIP = IP;
    if (debugMode) {
        char debugMessage[50];
        sprintf(debugMessage, "setServerIP %s  \n", ServerIP);
        printDebug(debugMessage);
    }
}

void setServerPort(const uint16_t *Port) {
    ServerPort = Port;
    if (debugMode) {
        char portString[6]; // Assuming 5 characters for the port number plus null terminator
        // Convert uint8_t ServerPort to string
        sprintf(portString, "%u", ServerPort);
        char debugMessage[50];
        sprintf(debugMessage, "setServerPort %s  \n", portString);
        printDebug(debugMessage);
    }
}

// connectivity management
void connectToAP(){

    if(debugMode){
        char debugMessage[50]; // Assuming the message won't exceed 50 characters
        sprintf(debugMessage, "connectToAP SSID:%s PSWD:%s \n", AP_SSID, AP_PSWD);
        printDebug(debugMessage);
        }

    if (WIFI_OK==wifi_command_join_AP(AP_SSID,AP_PSWD))  
        if(debugMode){printDebug("Joined AP \n");}
    else 
        if(debugMode){printDebug("Failed to join AP \n");}
}
void disconnectFromAP(){
    wifi_command_quit_AP();
    if(debugMode){printDebug("Disconected from AP \n");}
}
void connectToTCP(){
    if(debugMode){
        char portString[6]; // Assuming 5 characters for the port number plus null terminator
        // Convert uint8_t ServerPort to string
        sprintf(portString, "%u", ServerPort);
        char debugMessage[50]; // Assuming the message won't exceed 50 characters
        sprintf(debugMessage, "connectToTCP %s:%s \n", ServerIP, portString);
        printDebug(debugMessage);
    }


    if (WIFI_OK == wifi_command_create_TCP_connection(ServerIP,ServerPort, callback, receivedMessage))  // use this for callback and deciphering callback
        if(debugMode){printDebug("Joined TCP connection\n");}
    else
        if(debugMode){printDebug("Failed connecting tcp\n");}
        
}
void disconnectFromTCP(){
    
    wifi_command_close_TCP_connection();
    if(debugMode){printDebug("disconnectFromTCP\n");}
}

// sending messages
void sendMessage(const char *message){
    char paddedMessage[50]; // Assuming the maximum length of the message is 50 characters

    // Copy the message to paddedMessage and pad with null characters if necessary
    size_t messageLength = strlen(message);
    if (messageLength < 50) {
        strcpy(paddedMessage, message);
        memset(paddedMessage + messageLength, '\0', 50 - messageLength);
    } else {
        strncpy(paddedMessage, message, 50);
    }

    // Transmit the padded message
    wifi_command_TCP_transmit((uint8_t *)paddedMessage, 50);

    if (debugMode) {
        char debugMessage[50];
        sprintf(debugMessage, "sendMessage \' %s \' \n", message);
        printDebug(debugMessage);
    }
}

// callback function
void callback(){
    if(debugMode){
        char debugMessage[50]; // Assuming the message won't exceed 50 characters
        sprintf(debugMessage,"recieved message: %s \n" , receivedMessage);
        printDebug(debugMessage);
    }
    decode(receivedMessage);
    
}