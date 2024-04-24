#include "display.h"
#include "pc_comm.h"
#include "includes.h"
#include "servo.h"
#include "buttons.h"
#include "periodic_task.h"
#include "window.h"
#include "debug.h"
#include "wifiModule.h"
#include "debug.h"



 

int window_state = 1;
char message;

void button_task(); 



void setup(){
  debugInit();
  initialiseWifiModule();
  setAP_SSID("augustinas");
  setAP_PSWD("asdfghjk");
  setServerIP("192.168.103.40");
  setServerPort(23);
  connectToAP();
  connectToTCP();

  display_init();
  buttons_init();
  //periodic_task_init_a(set_window,5000);
}




int main(){
  setup();
  
  display_int(1234);

  

    _delay_ms(1000);
  while (1)
  {
    
      
  }
  
}