#!/bin/sh

rm -rf src/wasm
mkdir src/wasm

 ./emcc bufferoverflow.c -o function.html \
 -s EXPORTED_FUNCTIONS="['_sum', '_malloc', '_free']"  \
 -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','stringToUTF8', 'UTF8ToString']"

 #  emcc bufferoverflow.c -o function.html -s EXPORTED_FUNCTIONS="['_sum', '_malloc', '_free']" -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','stringToUTF8', 'UTF8ToString']"