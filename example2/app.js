import pkg from 'aes-wasm';
const aes128 = pkg.aes128
const {randomFillSync,} = await import("crypto");

    aes128().then(aes =>{

        function encrypt(_key,_iv,_messages){
            var encoder = new TextEncoder();
            aes.init(_key,_iv)
            var _ret_messages = [];
            for(var _message of _messages){
                var _enc_message = aes.encrypt(encoder.encode(_message))
                _ret_messages.push(_enc_message)
                console.log("encrypted: \'" + _message + "\'   using key: [" + _key+"]")
            }
            return _ret_messages
        }
        
        function decrypt(_key,_iv,_enc_messages){
            var decoder = new TextDecoder();
            aes.init(_key,_iv)
            var _ret_messages = [];
            for(var _enc_message of _enc_messages){
                var _dec_message = aes.decrypt(_enc_message)
                _ret_messages.push(decoder.decode(_dec_message))
                console.log("decrypted: \'" + decoder.decode(_dec_message) + "\'   using key: [" + _key+"]")
            }
            return _ret_messages
        }

    //init key and init vector for user1
    var key = randomFillSync(new Uint8Array(16))
    var iv = randomFillSync(new Uint8Array(16))

    
    // fill key and init vector with random bytes
    //key = fill_arr(key)
    //iv = fill_arr(iv)


    //messages need to be of a length divisible by 16
    var text1 = "first secret".padEnd(16,"0")
    var text2 = "second secret".padEnd(16,"0")
    var texts = [text1,text2]
    
    //user 1 encrypt a texts
    var enc_texts = encrypt(key,iv,texts)
        //encrypts another text

    //only decrypts text1
    var enc_text1 = [enc_texts[0]]
    var dec_text1 = decrypt(key,iv,enc_text1)



    //user2
    /*  user2 has managed to get a hold of an encrypted text enc_text2
        user2 has no information regarding the key or iv, just the knowledge that user1 
        was the last person to perform decryption
    */
    var enc_text2 = [enc_texts[1]]
    var dec_text2 = decrypt("","",enc_text2)



    })
    


