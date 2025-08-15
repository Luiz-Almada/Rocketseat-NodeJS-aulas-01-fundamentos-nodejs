import http from 'node:http'
import { Transform } from 'node:stream';

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformedChunk = Number(chunk.toString()) * -1;
    
    console.log(transformedChunk);

    // 1º parâmetro: erro (null se não houver erro)
    // 2º parâmetro: dado transformado
    callback(null, Buffer.from(String(transformedChunk)));
  }
  
}

// req => Readable Stream
// res => Writable Stream
// req e res são streams, ou seja, eles podem ser lidos e escritos em partes

const server = http.createServer(async (req, res) => {
  req.on('data', (chunk) => {
  });

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  
  console.log(fullStreamContent);

  return res.end(fullStreamContent)

/*   
    //Old
    return req
    .pipe(new InvertNumberStream())
    .pipe(res);
*/

  // O pipe conecta o Readable Stream (req) ao Writable Stream (res)
  // Isso significa que os dados lidos do req serão escritos no res
  // O res é o que será enviado como resposta para o cliente
  // O InvertNumberStream transforma os dados lidos do req, invertendo o sinal
  // e escrevendo no res, que será enviado como resposta para o cliente
  // O pipe é uma forma de encadear streams, permitindo que os dados sejam processados em partes
  // sem precisar carregar tudo na memória de uma vez só.
  // Isso é útil para lidar com grandes volumes de dados, como arquivos grandes ou streams de
})

server.listen(3334)