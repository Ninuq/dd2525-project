#!/bin/sh

rm -rf src/wasm
mkdir src/wasm

 emcc src/bufferoverflow.c -o src/wasm/overflow.js \
 -s EXPORTED_FUNCTIONS="['_handle_message', '_malloc', '_free']"  \
 -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','stringToUTF8', 'UTF8ToString']"

 #  emcc bufferoverflow.c -o function.html -s EXPORTED_FUNCTIONS="['_sum', '_malloc', '_free']" -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','stringToUTF8', 'UTF8ToString']"