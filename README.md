<h1> Descrição </h1>
Essa aplicação é sobre um evento que já ocorreu da rocketseat, onde usuários autenticados através do
GitHub pudessem enviar mensagens sobre o evento. As mensagens são atualizadas em tempo real, e podem ser enviadas
pela WEB e por um app mobile. 
As mensagens são salvas em banco de dados utilizando o prisma e SQLite.

<h2> Link da aplicação hospedada no Vercel </h2>
- Ainda não o fiz, mas você pode clonar os dois repositórios e executar o servidor na sua máquina.

<h4> Instruções </h4>
1 - Clone os dois repositórios.
 front-end -> https://bityli.com/ViErLXX
 back-end  -> https://tinyurl.com/2p9x4524

2 - Back-end
 2.1 Instale as dependências usando yarn ou npm.
 
 2.2 - Você vai precisar criar três variáveis de ambiente
       Crie um arquivo .env na raiz da pasta do servidor.
       Coloque nesse arquivo as seguintes variáveis:

       GUITHUB_CLIENT_ID=
       GUITHUB_CLIENT_SECRET=
       JWT_SECRET=

       A 1ª e a 2ª você consegue criando um novo OAuth Apps do GitHub 
       Tutorial -> https://tinyurl.com/2p8a85rc 
       A 3ª variável você pode escrever uma sequência de caracteres aleatórios.

 2.3 - Feito isso você pode executar o comando "yarn dev" no console.
       Se retornar (Server is run on PORT 4000-) o servidor está operante.
       Caso retorne algum erro, pode ser que as variáveis ambientes estejam erradas.

 2.4 - Banco de dados:  Você pode executar o comando yarn prisma studio para ver a interface do banco de dados.

3 - Front-end
 3.1 - Instale as dependências usando yarn ou npm.

 3.2 Vai precisar das mesmas variáveis do back-end (2.2).

 3.3 - Feito isso você pode executar o comando "yarn dev" no console.
       Se retornar (Server is run on PORT 3000-) o servidor está operante.
       Caso retorne algum erro, pode ser que as variáveis de ambiente estejam erradas.

    Pronto você agora a aplicação está funcional.

<h3> Mobile </h3>
- Aplicação para mobile ainda não finalizada.

<h3> Dados do desenvolvimento do Back-end </h3>

Essa é a parte do pack-end:
 Utilizando:
 - Node.js
 - Prisma
 - SQLite
 - Socket.io
 - Cors

Existem as partes (Front, back e mobile).
links:

Front-end: https://bityli.com/ViErLXX <br>
Back-end : https://tinyurl.com/2p9x4524 <br>
Mobile:      https://tinyurl.com/yckrw82r <br>
