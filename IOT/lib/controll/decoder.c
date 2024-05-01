#include "debug.h"
#include "window.h"
#include <stddef.h> 
#include <string.h>
#include "decoder.h"
#include "settings.c"

extern bool debugMode;
extern char greenhouseId[];

// only care about readability and maintainability

void decoder_decode(const char *message) {
    if (debugMode) {
        char debugMessage[100]; 
        sprintf(debugMessage, "decode: %s \n", message); 
        debug_print(debugMessage); 
    }

    char *substring = strstr(message, "REQ,10,SET,SER,");
    if (substring != NULL) {
        // Check if the substring is at the beginning of the message


        if (substring == message) {
            // Extract the last part of the message as an integer
            int windowOpenAngle;
            if (sscanf(message + strlen("REQ,10,SET,SER,"), "%d", &windowOpenAngle) == 1) {
                window_open_at_angle(windowOpenAngle);

                char answer[50]; // "ACK,{Greenhouse id},{Sensor},{Answer}"
                sprintf(answer, "ACK,%s,SER,%u" , greenhouseId,window_get_state()); 

                wifi_controller_send_message(answer);

                if (debugMode) {
                    char debugMessage[100]; 
                    sprintf(debugMessage, "ACK message sent: %s \n", answer); 
                    debug_print(debugMessage); 
                }

            }
        }
    }
}