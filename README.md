# Caso de uso para o RabbitMQ com Express

Aqui neste exemplo estou utilizando o Rabbit com outros três servidores express. O primeiro `src/backend-one` é o único publisher da aplicação,
fornecendo dois endpoints POST para a publicação de mensagens, seja para a FILA UM ou para a FILA DOIS. Os outros dois servers, `src/backend-two`
e `src/backend-three`, servem, respectivamente, como consumidores das filas UM e DOIS. Ou seja, os dados são enviados pelo primeiro servidor e
os outros dois recebem eles, aplicando a lógica que for. Não há um banco de dados conectado nessa aplicação.

### Como rodar
1. Dar um git clone nessa aplicação
2. Dar um `npm install`
3. Criar um arquivo docker compose se espelhando ao exemplo fornecido
4. Dar um `docker compose up -d` para criar o container com o RabbitMQ
5. Atualizar as variáveis ENV com os dados de acesso ao Rabbit e os nomes das filas desejadas
6. Pronto, agora é só rodar os servidores com um `node index` e testar a aplicação
