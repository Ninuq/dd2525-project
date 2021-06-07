# dd2525-project
This project consists of two examples showing different memory related attacks against JavaScript applications using WebAssembly modules

## Example1
install the dependencies using ´npm install´ in the example1 folder
run ´./emscripten.sh´ to compile the WebAssembly code.
then run the example using the command: ´node src/app.js´.
This will start an express server, open a browser and go to ´localhost:3000´.
There you can send a message to the server, the default input will create a link, which when hovered over causes a XSS attack.
If a shorter message is inserted, or the leading 0 are removed a static string will be printed instead.

## Example2
install the dependencies using ´npm install´ in the example2 folder
then run the example using the command: ´node app.js´.
It is possible to change which strings, keys and ivs are used by editing the app.js file.
It is possible to encrypt/decrypt by either calling our functions which takes a key, list of messages and a list of ivs and returns a list of encrypted strings.
Or by directly calling imported aes module by calling ´aes.init(key,iv)´ followed by ´aes.encrypt(message)´/´aes.decrypt(message)´. 
*Note* It is important to call ´aes.init´ between each encryption/decryption since the ´iv´ will change after each 16 byte block message according to the aes encryption cycle and need to be reset before encrypting the next message.
