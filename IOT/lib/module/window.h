/// @brief module is reponsible for managing the servo/window
/// Module also contains the state of the window

#include <servo.h>

void open();
void close();
void openAtAngle(uint8_t angle);
int getState();