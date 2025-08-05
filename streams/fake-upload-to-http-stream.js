import { Readable} from 'node:stream';
//import { fetch } from 'undici';

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        console.log('Stream encerrado');
        this.push(null);
      } else {
        console.log('Enviando:', i);
        this.push(Buffer.from(String(i)));
      }
    }, 1000); // 1 segundo de delay
    // O setTimeout simula uma leitura lenta, como se fosse uma leitura de um arquivo grande
    // ou de uma API externa, onde os dados não estão disponíveis instantaneamente.
    // Isso é útil para testar como o stream lida com dados que chegam lentamente.
  }
}

// fetch API é nativa do NodeJS desde a versão 18
// fetch é uma API para fazer requisições HTTP, como o axios, mas nativa
// O fetch retorna uma Promise, que resolve para um objeto Response
// O objeto Response tem um método json() que retorna uma Promise que resolve para o JSON da resposta
// O fetch também suporta streams, o que permite enviar dados em partes, como no caso
// do upload de arquivos grandes, onde os dados são enviados em partes, sem precisar carregar tudo
// na memória de uma vez só.  
/* fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half', // indica que o corpo da requisição é um Readable Stream
  
}) */

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half', // MUITO IMPORTANTE
})
  .then((res) => res.text())
  .then((data) => {
    console.log('✅ Resposta final do servidor:', data);
  })
  .catch(console.error);