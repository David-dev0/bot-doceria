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
    const saudacoes = [
  "oi", "oii" , "oiii" ,"ola", "olá", "ooi", "oie", "opa",
  "bom dia", "boa tarde", "boa noite",
  "e ai", "e aí", "fala", "hello" , "ei" , "ow"
];

client.onMessage(async (message)=>{

if(message.fromMe) return;

const numero = message.from;
//criar cliente
if (!clientes[numero]) {
    clientes[numero] = { 
        etapa: "inicio",
        ultimaInteracao: Date.now()
    };
 const TEMPO_EXPIRACAO = 10 * 60 * 1000; // 10 minutos

if (Date.now() - clientes[numero].ultimaInteracao > TEMPO_EXPIRACAO) {
    clientes[numero] = { 
        etapa: "inicio",
        ultimaInteracao: Date.now()
    };
}

clientes[numero].ultimaInteracao = Date.now();   
}
//trata mensagem de texto
let msg = ""; 
if(message.type === "chat"){
    msg = message.body
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "")
.trim();
}
// se for audio
if (saudacoes.includes(msg) && clientes[numero].etapa === "inicio") {
    clientes[numero].etapa = "menu";

    return client.sendText(numero,
`🍰 *Melu Doceria*

Escolha uma opção:

1️⃣ Cardápio
2️⃣ Encomendas personalizadas 
3️⃣ Horário de atendimento
4️⃣ Atendimento
5️⃣ Instagram
0️⃣ Menu principal

Digite um número para escolher a opção desejada ou digite *0* para voltar ao *MENU* principal.`);
}

//se for texto
if (msg === "0") {
    clientes[numero].etapa = "menu";
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
  clientes[numero].etapa = "menu";

    return client.sendText(numero,

`🍩 Cardápio

https://wa.me/c/556793464156

Se precisar de ajuda, me chama!`);

}

else if(msg === "2"){

 clientes[numero].etapa = "menu";

    return client.sendText(numero,

`Por gentileza, me envie uma mensagem detalhando o que deseja encomendar.`);

}

else if(msg === "3"){

 clientes[numero].etapa = "menu";

    return client.sendText(numero,

`Horário:

Segunda a sábado
11h às 00h
Domingo 
13h às 22h`);

}
else if(msg === "4"){

 clientes[numero].etapa = "menu";

    return client.sendText(numero,

`Aguarde um momento por favor`);

}
else if(msg === "5"){

 clientes[numero].etapa = "menu";

    return client.sendText(numero,

`instagram

https://www.instagram.com/meludoceriaa/`);


}

});
}
