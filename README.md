# Academy Cryptobank

Este é um projeto para a conclusão do curso da Kazap Academy 2019.

#Tecnologias
Para esse projeo foi usada as tecnologias:

-Vuejs:3.9.3
-Firebase:7.2.1
-Nodejs:10.16.0
-Yarn:1.16.0
-serve:11.10

#Rodando o Projeto

Para rodar o projeto instale primeiro o nodejs pelo site:
```
https://nodejs.org/en/download/
```
e depois o Yarn
```
https://yarnpkg.com/lang/en/docs/install/#windows-stable.
```

instalado o yarn executo o comando

```
yarn add global serve
```

que ira instalar o serve para poder rodar o projeto, instale tambem o vue com e o vur cli

```
npm install vue
yarn global add @vue/cli
```

Depois faça um fork desse repositorio e clone ele na sua maquina com o comando

```
git clone + a url do seu repositorio
```

Após fazer o clone entre na pasta ska do projeto e de um

```
yarn install
```

para instalar as dependencias necessarias e em seguida um

```
npm install --save firebase
```

Feito esses passos corretamente o seu servidor deve iniciar. mas ainda falta alguns passos para conseguir rodar o projeto.

Entre no site do firebase e crie uma conta se não tiver, se tiver crie um novo projeto com qualquer nome, logo após de criado crie um aplicação web clicando em </> logo na pagina inicial, de qualquer nome e nao selecione ainda apção de host, clik em proximo e copie os dados dentro da variavel FirebaseConfg vamos precisar depois.

Feito isso entre em  Authentication e depois em Métodos de Login ative a opção E-mail/senha isso é o que ira permitir os usuarios se cadastrarem no aplicativo. Depois vá para a opçao Databse e click em criar banco de dados e selecione o modo teste e em proximo, ele vai dar um aviso, mas para esse projeto isso não vai importar - se tiver alguma duvida sobre esse caso click em saiba mais - e depois click em concluído - ele vai criar o databse- criado o database abra a pasta ska no seu editor - no meu caso uso o VsCode, mas pode ser o que vc estiver acostumado -.

No seu editor abra o arquivo .env.exemple e mude o nome só para .env feito isso aqueles dados que copiamos vamos pegar os respectivos valores e copiar no arquivo .env sem as "" exemplo:
```
VUE_APP_FIREBASE_API_KEY=AIzaSyADVefJtJYF-LfLGjLUtYAgocHP_8NpYh0
VUE_APP_FIREBASE_AUTH_DOMAIN=teste-3ee4d.firebaseapp.com
VUE_APP_FIREBASE_DATABASE_URL=https://teste-3ee4d.firebaseio.com
VUE_APP_FIREBASE_PROJECT_ID=teste-3ee4d
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=293692658572
VUE_APP_FIREBASE_APP_ID=1:293692658572:web:6b5410811f2f8a5d
``` 
Como acabamos de criar o app o storageBucket não vai ter então só tire as ""
se você abrir o arquivo mais.js dentro da pasta src você ira ver que os campos do .env estão ali, isso é o que faz o sau aplicação se conectar com o projeto do firebase 

Após vontando para o terminal, abra a pasta functions, feito isso vc vai dar o comando:
```
npm install -g firebase-tools
```

esse comando vai instalar ou atualizar(caso já tiver instalado) o Cli do Firebase.

instalado de o comando:
```
fiebase login
```
ele vai pedir para vc logar na sua conta do google para ele ter acesso aos seus projetos e depois de logado digite:
```
firebase init
```
ele vi te pergunta se esta pronto para continuar digite 'y' e logo após ele vai perguntar o que vc quer fazer, selecione a opção functions com espaçao e de enter, logo depois ele vai pedir para vc escolher um projeto, selecione oque vc acabou de criar e de enter, depois ele vai pedir permisão para sobreescrever alguns alquivos, digite 'n' e de enter, a hora que ele pedir para instalar as dependencias do npm digite 'y' e com isso a instalaçao vai estar completa.

Digite o comando:
```
Firebase deploy
```

Esse comando vai fazer com que as funções no arquivo index.js sejam adicionadas as functions do projeto.

Feito isso o seu projeto deve estar rodando perfeitamente.

Link para o projeto rodando em hosting no Firebase
```
https://academy2019-cryptobank-632cd.firebaseapp.com/
```
