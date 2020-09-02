<h1>DÉApp</h1>

> Status do Projeto: concluído :heavy_check_mark:

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Layout da Aplicação](#layout-da-aplicação-dash)

## Descrição do projeto 

<p align="justify">
  Aplicativo desenvolvido para o estudo de Javascript juntamente com as tecnologias Node.JS e React Native.
</p>

## Funcionalidades

:heavy_check_mark: Autenticação de login

:heavy_check_mark: Controle de frequência

:heavy_check_mark: Controle de cadastro

## Layout da Aplicação :dash:

<p align="justify">
  A seguir são mostradas algumas imagens retiradas do app:
</p>

<p align="center">
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_Home.jpeg" width=100>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_Home_Login.jpeg" width=100>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_FirstAccess.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_Main_1.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_Main_DrawerMenu.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_NewCall.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_Main_2.jpeg" width=100/>
</p>
<p align="center">
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_CallHistory.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_CallHistoryDetail.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_Profile.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_ChangePassword.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_NewServant.jpeg" width=100/>
  <Img src="https://github.com/rafarod21/DEApp/blob/master/Screens/Screen_ChangeServant.jpeg" width=100/>
</p>

## Casos de Uso

Na aplicação, os usuários são considerados como servos e são divididos em três tipos:
  - **Servo**: um usuário comum;
  - **Servo responsável pela chamada**: um **Servo** que também pode realizar/excluir chamadas;
  - **Servo responsável geral**: um **Servo responsável pela chamada** que também pode realizar/editar/excluir outros servos.

1 Inserção/alteração/exclusão de servo:
  - Apenas um **Servo responsável geral** tem acesso a essas funcionalidades.
  - Os dados para cadastro são:
    - O nome do servo que será cadastrado;
    - Um usuário que não exista no banco de dados (por padrão, o sistema gera um usuário com o primeiro e o último nome do servo);
    - Uma senha provisória que será alterada no primeiro acesso do servo ao aplicativo;
    - O ministério que fará parte;
    - O tipo de servo que ele será e que definirá suas permissões no aplicativo.
  - Os dados para alteração são:
    - Nome (caso tenha mudado de nome);
    - Quantidade de faltas;
    - Ministério (caso tenha mudado de ministério);
    - TIpo de servo (caso o servo tenha que ter mais algumas permissões dentro do aplicativo).

2 Alteração de senha:
  - Apenas o próprio servo poderá alterar sua senha;
  - Os dados necessários para essa alteração são:
    - Senha antiga;
    - Senha nova.

3 Realizar nova chamada:
  - Apenas um **Servo responsável pela chamada** ou um **Servo responsável geral** podem realizar uma nova chamada;
  - Sempre que uma nova chamada for feita em um dia que já tenha sido feita outra chamada, essa nova importará os dados da chamada antiga e, assim que confirmada, substituirá a chamada anterior;
  - Sempre que a primeira chamada do dia for feita, todos os servos receberam automaticamente uma falta inteira (+1) na lista de seleção, cabendo a quem for realizar a chamada, o trabalho de selecionar aqueles presentes;
  - Cada servo pode estar em três situações que vão interferir na chamada:
    - O servo está presente, então não deverá receber falta (+0) e deverá ser selecionado;
    - O servo se atrasou ou não está presente, mas justificou a falta, então deverá receber meia falta (+0.5), deverá ser escrito o motivo na linha destinada ao servo em questão e não deve ser selecionado;
    - O servo não está presente e não justificou, então deverá receber uma falta inteira (+1) e não deve ser selecionado.

4 Excluir chamadas:
  - Apenas um **Servo responsável pela chamada** ou um **Servo responsável geral** podem realizar uma nova chamada;
  - Essa ação excluirá por completo todas as chamadas já feitas no banco de dados e definirá como 0 as faltas de todos os servos.

5 Ver histórico de chamadas e/ou a chamada de um dia específico:
  - Qualquer servo terá acesso a visualização do histórico de chamadas e de um dia específico qualquer.

## JSON :floppy_disk:

Exemplos usados no banco de dados:

### Usuários (servants):

|user|password|passwordTemporary|name|type|ministry|absences|
| -------- |-------- |-------- |-------- |-------- |-------- |-------- |
|joaosilva|12345|true|João Martins da Silva|Servo|Música|1.0|
|marcosborges|marcosBG14|false|Marcos Correia Borges|Servo responsável pela chamada|Acolhimento|1.5|
|marialima|lima22campos|false|Maria Ferreira de Campos Lima|Servo|Servo responsável geral|0.5|

### Chamadas (calls): 

|id|day|time|user|present|absences|justification|
| -------- |-------- |-------- |-------- |-------- |-------- |-------- |
|1|2020-03-10|19:05:22|marcosborges|false|1.5|Avisou que não viria|
|2|2020-03-10|19:05:22|joaosilva|true|0.0||
|3|2020-03-10|19:05:22|marialima|true|0.5|Avisou que não viria|
|4|2020-10-10|19:08:32|marcosborges|true|1.5||
|5|2020-10-10|19:08:32|joaosilva|false|1.0||
|6|2020-10-10|19:08:32|marialima|true|0.5||

## Linguagens, dependencias e libs utilizadas :books:

- [Node.js](https://nodejs.org/en/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)

## Desenvolvedores/Contribuintes :octocat:

[<img src="https://avatars0.githubusercontent.com/u/39251153?s=460&u=b18964e9a5e2c3c1ef9bc74ae8c35b11095c841b&v=4" width=115><br><sub>Rafael Rodrigues</sub>](https://github.com/rafarod21)

