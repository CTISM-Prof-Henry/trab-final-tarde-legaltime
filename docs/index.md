# EncontraSala - Docs

## O Que Faz?

O projeto **EncontraSala** existe para oferecer uma solução simples e rápida para problemas de agendamento de salas e ambientes em universidades. Para tal fim, figura como um *software* baseado em *web* no qual atuam um **administrador** e múltiplos **usuários**, que interagem com uma tabela de agendamentos.

## Requisitos
1) [Git](https://git-scm.com/downloads) deve estar instalado na máquina.

## Execução

1A) Abrir o CMD (Windows) e clonar o repositório do projeto para algum diretório *dir*: 
```
git clone https://github.com/CTISM-Prof-Henry/trab-final-tarde-legaltime/
```
1B) Alternativamente, baixar o arquivo *zip* do software disponível no [repositório](https://github.com/CTISM-Prof-Henry/trab-final-tarde-legaltime/).

2) Abrir o arquivo *index.html*:
```
start ./dir/trab-final-tarde-legaltime/app/html/index.html 
```

## Como Usar
Posta a máquina acessível onde hão de decorrer os agendamentos, cá estão as possibilidades:
### Gerenciando de Agendamentos
Usuários comuns podem **criar** e **deletar** agendamentos. Glosa-se que a segunda função é possível desde que o agendamento seja do usuário em questão.

Administradores, além de gozarem de todas as funcionalidades dos usuários comuns, não possuem restrição quanto à remoção de agendamentos e são capazes de aplicar um *reset* no conjunto de agendamentos.

Para qualquer tipo de usuário, a **criação** de um agendamento parte do botão "Criar", que disponibiliza uma janela onde se deve entrar com as informações do agendamento. Ainda, para todo agendamento existente na tabela, um clique sobre ele levantará a opção de **remoção**.

### Administrando o Sistema
O administrador dispõe, acrescendo às atribuições comuns a qualquer tipo de usuário, de funcionalidades mais sensíveis, como **adição e remoção de usuários** e **adição e remoção de salas**.

Adicionar e remover usuários resume-se em, na lista de usuários, clicar no ícone de lixeira ao lado do item.

O processo é análogo para a lista de salas.

### Restrições Pertinentes
Diversas ações dentro de *EncontraSala* possuem restrições específicas.

1. A remoção e adição de usuários é uma funcionalidade restrita ao administrador.

2. A remoção e adição de salas é uma funcionalidade restrita ao administrador.

3. A remoção de uma sala só é exequível caso não existam agendamentos ligados a ela.
