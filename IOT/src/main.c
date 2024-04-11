#include "includes.h"
#include "periodic_task.h"
#include "pc_comm.h"
#include "display.h"
#include "leds.h"
#include "servo.h"
#include "tone.h"
#include "wifi.h"


void func_a(){
static uint16_t i = -10;
display_int(i++);

pc_comm_send_string_blocking("!!!!!!!!!!!!!!!!!!!!!");
}

void func_b(){
    static uint8_t state = 0;
    if (state==0)
    {
        servo(50);
        state = 1;
    }
    else {
        servo(100);
        state = 0;
    }
    

}

void func_c(){

}


int main(void)
{

    display_init();     
    //tone_init();
    //tone_play_starwars_tuned();
    //leds_init();
    pc_comm_init(9600, ((void *)0));

    //Join AP
    
    
    wifi_init();

    
    char ssid[] = "augustinas";
    char password[] = "asdfghjk";
    wifi_command_join_AP(ssid, password);
    wifi_command_AT();
    
    //periodic_task_init_a(func_a, 3300);
    periodic_task_init_b(func_b, 1000);
    //periodic_task_init_c(func_c, 1000);
    


while (1) {
    // Check Wi-Fi status, handle incoming data, etc.
    // For example:
    

    // Perform other periodic tasks
    // func_a();  // Uncomment if needed
    // func_b();  // Uncomment if needed

    //_delay_ms(100); // Add some delay to prevent CPU overload
}

   


    return 0;
}
