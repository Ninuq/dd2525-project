#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <emscripten.h>


void my_print(const char s[]){
char* str = malloc(sizeof(char)*(18+30));
sprintf(str,"console.log('%s')",s);
emscripten_run_script(str);
}

char*  sum (char* message){
    //char* text = (char *) malloc(32);
    char* msg_copy = malloc(sizeof(char)*28);
    char* outptr = malloc(sizeof(char)*32);
    strcpy(outptr, "static safe output");
    strcpy(msg_copy,message);

    return outptr;

}