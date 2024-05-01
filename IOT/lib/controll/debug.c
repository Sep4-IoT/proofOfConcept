#include "debug.h"
#include "pc_comm.h"

// rewrite for functions to use better debugs with different inputs

void debug_init(){
    pc_comm_init(9600,NULL);    // Telling the messenger how often he'll have to travel
    debug_print("Debug printing initialised \n");
}
void debug_print(const char *message){
    uart_send_string_blocking(USART_0, message); // Just the messenger
}