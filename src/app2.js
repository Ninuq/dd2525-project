
const express = require('express')
const app = express()
const m = require('./function.js')
const port = 3000

/*
{headers:{'Content-Type':'application/wasm'}}
var memory = new WebAssembly.Memory({initial: 1,maximum: 10})

WebAssembly.instantiateStreaming(fetch('function.wasm'),{ js: { mem: memory }} )
.then(results => {
  // add code here
  results.instance.exports.sum()
});
*/



// for parsing form data
const bodyParser = require('body-parser');
const { stringToUTF8, UTF8ToString } = require('./function.js');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
    res.sendFile('index.html' , { root : __dirname});
})


app.post('/',(req,res) =>{
    var message = req.body.question
    console.log("msg:",message)

    var messagePtr = m._malloc(message.length+1)
    m.stringToUTF8(message,messagePtr,message.length+1)

    sum = m.cwrap('sum', 'number', ['number','number'])
   var acopy = sum(messagePtr,outPtr)
   console.log(acopy-outPtr)
    var r = m.UTF8ToString(acopy)
    console.log(r)

    res.send(r)
})


app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})

// Emscripten command
// emcc bufferoverflow.c -o function.html -s EXPORTED_FUNCTIONS="['_sum', '_malloc', '_free']" -s EXPORTED_RUNTIME_METHODS="['ccall','cwrap','stringToUTF8', 'UTF8ToString']"
//00000000000000000000000000000000<a onmouseover ='alert("XSS")'>link</a>