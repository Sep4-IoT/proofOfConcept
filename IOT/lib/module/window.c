#include "window.h"

uint8_t windowAngle;

void open(){
    // Opens servo, no questions asked
    servo(180);
    windowAngle = 180;
}
void close(){
    // Closes servo, no questions asked
    servo(0);
    windowAngle = 0;
}
void openAtAngle(uint8_t angle){
    // Sets to an angle of openess, one question asked
    servo(angle);
    windowAngle = angle;
}

int getState(){
    // Reminds you of your window status
    return windowAngle;
}