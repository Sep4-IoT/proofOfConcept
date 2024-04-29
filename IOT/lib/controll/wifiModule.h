/// @brief module is responsible for establishing and keeping connectivity, sending messages

// wifi controloler rename

#include "wifi.h"
#include "debug.h"

// initialisation of module
void initialiseWifiModule();

// changing credentials/server ip
void setAP_SSID(const char *message);
void setAP_PSWD(const char *message);
void setServerIP(const char *IP);
void setServerPort(const uint16_t *Port);

// connectivity management
void connectToAP();
void disconnectFromAP();
void connectToTCP();
void disconnectFromTCP();

// sending messages
void sendMessage(const char *message);
void callback();
