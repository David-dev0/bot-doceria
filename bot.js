const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const clientes = {};

app.get('/', (req,res)=>{
    res.send("Bot da doceria rodando 🍰");
});

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta " + PORT);
});

wppconnect.create({
    puppeteerOptions: {
  args: ['--no-sandbox', '--disable-setuid-sandbox']
},
    session: 'doceria',
    catchQR: (base64Qr, asciiQR) => {
        console.log("ESCANEIE O QR CODE");
        console.log(asciiQR);
    }
})
.then(client => start(client))
.catch(error => console.log(error));

function start(client){

client.onMessage(async (message)=>{

if(message.fromMe) return;

const numero = message.from;
//criar cliente
if (!clientes[numero]) {
    clientes[numero] = { etapa: "menu" };
}
//trata mensagem de texto
let msg = ""; 
if(message.type === "chat"){
    msg = message.body
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "");
}
// se for audio
if (message.type === "ptt" || message.type === "audio") {
return client.sendText(numero,
`🍰 *Melu Doceria*

Escolha uma opção:

1️⃣ Cardápio
2️⃣ encomendas personalizadas 
3️⃣ Horário de atendimento
4️⃣ Atendimento
5️⃣ instagram
0️⃣ menu principal

Digite um número para escolher a opção desejada ou digite *0* para voltar ao *MENU* principal.`);

 
}

//se for texto
if (msg === "0") {
    clientes[numero] = { etapa: "menu" };
 return client.sendText(numero,
`🍰 *Melu Doceria*

Escolha uma opção:

1️⃣ Cardápio
2️⃣ encomendas personalizadas 
3️⃣ Horário de atendimento
4️⃣ Atendimento
5️⃣ instagram
0️⃣ menu principal

Digite um número para escolher a opção desejada ou digite *0* para voltar ao *MENU* principal.`);

 
}

else if(msg === "1"){

return client.sendText(message.from,

`🍩 Cardápio

https://wa.me/c/556793464156

Se precisar de ajuda, me chama!`);

}

else if(msg === "2"){

return client.sendText(message.from,

`Por gentileza, me envie uma mensagem detalhando o que deseja encomendar.`);

}

else if(msg === "3"){

return client.sendText(message.from,

`Horário:

Segunda a sábado
11h às 00h
Domingo 
13h às 22h`);

}
else if(msg === "4"){

return client.sendText(message.from,

`Aguarde um momento por favor`);

}
else if(msg === "5"){

return client.sendText(message.from,

`instagram

https://www.instagram.com/meludoceriaa/`);

}
// QUALQUER OUTRA MENSAGEM
else {
    return client.sendText(numero,

`🍰 *Melu Doceria*

Escolha uma opção:

1️⃣ Cardápio
2️⃣ Encomendas personalizadas
3️⃣ Horário de atendimento
4️⃣ Atendimento
5️⃣ Instagram
0️⃣ Menu principal

Digite o número da opção desejada.`);

}

});
}
