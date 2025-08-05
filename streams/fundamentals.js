// Netflix & Spotify

// Importação de clientes via CSV (excel)
// 1gb - 1.000.000
// POST /upload import.csv
// 10mb/s - 100s
//100s --> Inserções no banco de dados
// 10mb/s - 10.000
// Readble Streams / Writeable Streams
// req e res são streams

//Stdin / Stdout

//process.stdin
//  .pipe(process.stdout);
  

import { Readable, Writable,Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        // sinaliza que o stream terminou
        this.push(null);
      } else {
        // sinaliza que tem mais dados para serem lidos
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000); // 1 segundo de delay
    // O setTimeout simula uma leitura lenta, como se fosse uma leitura de um arquivo grande
    // ou de uma API externa, onde os dados não estão disponíveis instantaneamente.
    // Isso é útil para testar como o stream lida com dados que chegam lentamente.
  }
}

class MutiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * 10;
    console.log(transformedChunk);
    callback();
  }
}

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1;
    
    // 1º parâmetro: erro (null se não houver erro)
    // 2º parâmetro: dado transformado
    callback(null, Buffer.from(String(transformedChunk)));
  }
  
}

/* new OneToHundredStream()
  .pipe(process.stdout);
 */
/* new OneToHundredStream()
  .pipe(new MutiplyByTenStream()); */

new OneToHundredStream()
  .pipe(new InvertNumberStream())
  .pipe(new MutiplyByTenStream());