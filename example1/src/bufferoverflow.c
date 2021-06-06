#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <emscripten.h>

// helper function for console logs
void my_print(const char s[]){
char* str = malloc(sizeof(char)*(18+30));
sprintf(str,"console.log('%s')",s);
emscripten_run_script(str);
}

// vulnerable c function
char*  handle_message (char* message){
    char* msg_copy = malloc(sizeof(char)*28);
    char* outptr = malloc(sizeof(char)*32);
    
    // static string will be overwritten due to buffer overflow
    strcpy(outptr, "static safe output");
    strcpy(msg_copy,message);
    return outptr;
}