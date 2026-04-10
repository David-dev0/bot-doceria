const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

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

const msg = message.body
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "");

const saudacoes = [
"oi",
"ola",
"bom dia",
"boa tarde",
"boa noite",
"oie",
"oii",
"oii",
"alo",
"dia",
"tarde",
"noite",
"opa",
"tudo bom?",
"tudo bom",
"tudo bem",
"tudo bem?",
"tdb",
"tdb?",

];

if (saudacoes.some(s => msg.includes(s))) {

await client.sendText(message.from,
`🍰 *Melu Doceria*

Escolha uma opção:

1️⃣ Cardápio
2️⃣ encomendas personalizadas 
3️⃣ Horário de atendimento
4️⃣ Atendimento
5️⃣ instagram`);

 
}

if(msg === "1"){

await client.sendText(message.from,

`🍩 Cardápio

https://wa.me/c/556793464156`);

}

if(msg === "2"){

await client.sendText(message.from,

`https://wa.me/c/556793464156`);

}

if(msg === "3"){

await client.sendText(message.from,

`Horário:

Segunda a sábado
11h às 00h
Domingo 
13h às 22h`);

}
if(msg === "5"){

await client.sendText(message.from,

`instagram

https://www.instagram.com/meludoceriaa/`);

}

});

}