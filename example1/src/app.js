
const express = require('express')
const app = express()
const m = require('./wasm/overflow')
const port = 3000

// for parsing form data
const bodyParser = require('body-parser');
const { stringToUTF8, UTF8ToString } = require('./wasm/overflow.js');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
    res.sendFile('index.html' , { root : __dirname});
})


app.post('/',(req,res) =>{
    var message = req.body.question
    console.log("msg:",message)

    var messagePtr = m._malloc(message.length+1)
    m.stringToUTF8(message,messagePtr,message.length+1)

    // import c function
    handle_message = m.cwrap('handle_message', 'number', ['number','number'])
    var static_message = handle_message(messagePtr)
    
    res.send(m.UTF8ToString(static_message))
})


app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})

// Emscripten command
// emcc bufferoverflow.c -o function.html -s EXPORTED_FUNCTIONS="['_sum', '_malloc', '_free']" -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','stringToUTF8', 'UTF8ToString']"