#include "debug.h"
#include "pc_comm.h"

// rewrite for functions to use better debugs with different inputs

void debugInit(){
    pc_comm_init(9600,NULL);    // Telling the messenger how often he'll have to travel
    printDebug("Debug printing initialised \n");
}
void printDebug(const char *message){
    uart_send_string_blocking(USART_0, message); // Just the messenger
}