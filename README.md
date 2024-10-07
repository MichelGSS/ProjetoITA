O objetivo dessa tarefa é que os alunos especifiquem, planejem, modelem, implementem e testem de forma completa um pequeno sistema, assemelhado ao Livros a Jato usado em parte do curso. O sistema pode ser implementado em qualquer linguagem, porém para os alunos que estão fazendo os cursos do Programa de Cursos Integrados em sequência, recomenda-se que a implementação seja feita em Java.

Observação: Para questões de implementação, os monitores do curso têm condições de auxiliar se a implementação foi feita em Java. Caso o aluno opte por utilizar outras linguagens, não terá suporte nessa parte.

O sistema que deve ser criado se chama "Esse eu já li!" e é um portal onde as pessoas podem marcar livros que já leram e e com isso ganharem pontos dentro de um sistema de gamificação. Ao fazerem o login no sistema, os usuários vêem uma lista de livros. Eles podem clicar para visualizar um livro e marcar que já leram aquele livro. Cada livro que leram eles ganham 1 ponto, sendo que a cada 100 páginas que o livro tiver ele vale um ponto adicional (exemplos: 72 páginas vale 1 ponto, 124 páginas vale 2 pontos, 350 páginas vale 4 pontos). A cada 5 livros que o usuário ler de um mesmo estilo, ele deve receber um troféu "Leitor de #estilo#"; por exemplo, se ele leu 5 livros do estilo "Ficção Científica", ganhará o troféu "Leitor de Ficção Científica". O sistema ainda deve ter um ranking que exibe os 10 usuários com maior pontuação e cada usuário pode entrar em uma página pessoal que irá mostrar os seus pontos e os troféus que conquistou.

Baseado nessa descrição as seguintes tarefas devem ser realizadas:

    Especificação das seguintes User Stories:

    Logar usuário

    Visualizar lista de livros

    Visualizar livro

    Marcar leitura de livro

    Visualizar ranking de usuários

    Visualizar pontos e troféus de usuário

PS 1: Não é preciso ter o cadastro de livros e de usuários. Esses dados podem estar pré-cadastrados na base de dados. Leia com atenção a descrição do sistema e inclua os dados que achar que são necessários.

PS 2: Especificar as user stories seguindo o molde "Como um <tipo de usuário>, eu quero <ação>, de modo que <motivo>

PS 3: Incluir os atributos tamanho (size) em pontos de história, valor de de negócios (BV = Business Value) e testes de aceitação (Acceptation Tests)!

2.  Criação de modelos para auxiliar na compreensão do sistema

Utilizando os princípios da modelagem ágil, crie diagramas que o auxiliem a comunicar a arquitetura e o modelo de domínio da aplicação. Utilize os diagramas que achar adequado e os crie utilizando as ferramentas que achar adequadas; eles podem ser inclusive desenhados a mão ou em quadros brancos, mas as imagens correspondentes devem ser claras e entendíveis pelo revisor. 

3. Planejamento da Iteração

Divida as User Stories em tarefas granulares e faça uma estimativa das tarefas para a iteração. Crie um planejamento para duas iterações de tamanhos iguais com as User Stories citadas.

4. Implementação do Software seguindo o Planejamento

O aluno deve realizar a implementação do software seguindo o que foi pedido usando TDD, embora isso não seja cobrado neste trabalho. Para cada iteração, deve-se criar uma tabela com as tarefas de cada iteração, para quanto tempo foram planejadas e em quanto tempo foram executadas. Deve ser criado um burndown chart para refletir o andamento das duas iterações.

----------------------

Deve ser entregue:

    Especificação da User Stories como indicado acima

    Diagramas criados, com justificativa de porque esses foram os escolhidos

    Tabela com as tarefas de cada User Story, sua divisão dentro das iterações, a estimativa para cada uma, o tempo de execução de cada uma, e o burndown chart para as duas iterações.

    URL para um video que mostre o funcionamento do sistema criado e a execução de cada uma das User Stories pedidas.

Será considerado na avaliação:

    Se os requisitos funcionais foram especificados na forma de user stories

    Se as funcionalidades pedidas foram implementadas

    Se os diagramas e tabelas solicitados foram desenvolvidos

    Se os testes de aceitação foram criados e testados como solicitado
