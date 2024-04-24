
#include "wifi.h"
#include "display.h"
#include "pc_comm.h"
#include "includes.h"
#include "servo.h"
#include "buttons.h"
#include "periodic_task.h"


int window_state = 1;
char message;

void button_task(); 
void decode(); // need to test of this works

void set_window(){

  if(window_state == 1)
  {
    servo(180);
    uart_send_string_blocking(USART_0,"servo state 1 \n");
  }
  else {
    servo(0);
    uart_send_string_blocking(USART_0,"servo state 0 \n");
  }
}

void setup(){
  pc_comm_init(9600,NULL);
  wifi_init();
  display_init();
  buttons_init();
  //periodic_task_init_a(set_window,5000);
}

void decode(){ // need to test of this works
  set_window();
}



int main(){
  setup();
  
  display_int(1234);

  if (WIFI_OK==wifi_command_join_AP("augustinas","asdfghjk"))  
    uart_send_string_blocking(USART_0,"Joined AP\n");
  else 
    uart_send_string_blocking(USART_0,"Failed to join AP\n");



  if (WIFI_OK==wifi_command_create_TCP_connection("192.168.103.40", 23, decode, message))  // use this for callback and deciphering callback
    uart_send_string_blocking(USART_0,"Joined TCP connection\n");
    else
    uart_send_string_blocking(USART_0,"Failed connecting tcp\n");

    _delay_ms(1000);
  while (1)
  {
      window_state = 0;
      wifi_command_TCP_transmit((uint8_t*)"Hi from Addell\n", 15);
      _delay_ms(1000);
      window_state = 1;
      //servo(0);
      wifi_command_TCP_transmit((uint8_t*)"Window Open\n", 12);
      _delay_ms(1000);
      wifi_command_TCP_transmit((uint8_t*)"Window Closed\n", 14);
      //servo(1);
      _delay_ms(1000);
  }
  
}