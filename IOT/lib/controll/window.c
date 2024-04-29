#include "window.h"
#include "debug.h"



uint8_t windowAngle;
extern bool debugMode;

void open(){
    // Opens servo, no questions asked
    servo(180);
    windowAngle = 180;
    if(debugMode){printDebug("window close \n");}
}
void close(){
    // Closes servo, no questions asked
    servo(0);
    windowAngle = 0;
    if(debugMode){printDebug("window close \n");}
}
void openAtAngle(uint8_t angle){
    // Sets to an angle of openess, one question asked
    servo(angle);
    windowAngle = angle;
    if (debugMode) {
        char debugMessage[50];
        sprintf(debugMessage, "window openAtAngle: %u  \n", windowAngle);
        printDebug(debugMessage);
    }
}

int getState(){
    // Reminds you of your window status
    if (debugMode) {
        char debugMessage[50];
        sprintf(debugMessage, "window getState:  %u \n", windowAngle);
        printDebug(debugMessage);
    }
    return windowAngle;
}