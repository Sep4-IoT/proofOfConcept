#include "debug.h"
#include "window.h"
#include <stddef.h> 
#include <string.h>
#include "decoder.h"
#include "settings.c"

extern bool debugMode;

// only care about readability and aintainability

void decode(const char *message) {
    if (debugMode) {
        char debugMessage[100]; 
        sprintf(debugMessage, "decode: %s \n", message); 
        printDebug(debugMessage); 
    }

    char *substring = strstr(message, "REQ,10,SET,SER,");
    if (substring != NULL) {
        // Check if the substring is at the beginning of the message
        if (substring == message) {
            // Extract the last part of the message as an integer
            int windowOpenAngle;
            if (sscanf(message + strlen("REQ,10,SET,SER,"), "%d", &windowOpenAngle) == 1) {
                openAtAngle(windowOpenAngle);
            }
        }
    }
}