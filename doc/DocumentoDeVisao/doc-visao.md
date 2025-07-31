# Documento de Visão

## Histórico de Revisões

|    Data    | Versão |    Descrição    |                           Autores                            |
| :--------: | :----: | :-------------: | :----------------------------------------------------------: |
| 25/04/2023 |  1.0   | Versão inicial  |                       Walber Ranniere                        |
| 09/05/2023 |  1.1   | Versão revisada |                        Anna Carolinne                        |
| 30/05/2023 |  1.2   | Versão revisada |                        Anna Carolinne                        |
| 19/09/2023 |  2.0   |  Revisão Geral  |              Anna Carolinne, Renato Bernardino               |
| 03/10/2023 |  2.1   |  Revisão Geral  | Anna Carolinne, Renato Bernardino, Virginia Claudia, Gabriel Ricardo |
| 17/07/2025 |  3.0   |  Revisão Geral  | Wemerson das chagas |


## 1. Introdução
### 1.1 Propósito do Documento
Este documento apresenta a visão geral da aplicação Nanny’s Pet, definindo seus objetivos, funcionalidades principais, requisitos iniciais e público-alvo. Ele serve como base para o alinhamento entre os stakeholders e a equipe de desenvolvimento, além de orientar as próximas etapas do processo de Engenharia de Requisitos.
### 1.2 Escopo do Projeto
A aplicação Nanny’s Pet é uma plataforma digital voltada à intermediação de serviços de hospedagem temporária para animais de estimação, conectando tutores e cuidadores de forma prática, personalizada e segura. O sistema oferecerá funcionalidades como cadastro de usuários, busca por cuidadores, agendamento de serviços, comunicação interna, reputação e pagamento online.</br></br>

## 2. Posicionamento
### 2.1 Oportunidade de Mercado
No contexto da economia colaborativa, cresce a demanda por soluções que facilitem o cuidado de pets durante a ausência de seus tutores. A Nanny’s Pet surge para atender esse público, oferecendo uma plataforma confiável e eficiente para o encontro entre cuidadores e tutores de animais.  </br></br>

### 2.2 Benefícios
* Para tutores: facilidade, segurança e tranquilidade ao encontrar cuidadores qualificados.

* Para cuidadores: geração de renda extra por meio de um canal digital confiável.

* Para a plataforma: modelo de negócio baseado em comissão sobre os serviços intermediados.  </br></br>

### 2.3 Descrição do problema

| **Problema** | O *problema* para encontrar pessoas capacitadas e com ambientes adequados para hospedagem de Pets tem *afetado* tutores que por algum motivo precisam ausentar-se de casa por um período mais longo. Isso tem *impactado* na qualidade de vida dos Pets e seus tutores, que, por horas, ficam preocupados com quem e onde podem deixar seus Pets. Uma *solução* seria a construção de uma aplicação que permitisse encontrar tutores, segundo um conjunto de características desejáveis pelos Pets e seus tutores. |
| :----------: | ------------------------------------------------------------ |
|  **Afeta**   | Todos aqueles que possuem um animal de estimação e em algum momento necessitam se afastar de sua residência. |
| **Impacta**  | Em evitar uma busca desorganizada por cuidadores de pets ou cancelamentos de compromissos motivados pela falta de opção de ter onde deixar seu animal de estimação. |
| **Solução**  | O Nanny's Pets - que junta de maneira eficiente aqueles que podem disponibilizar o serviço de hospedar um pet com aqueles que precisam dessa hospedagem. |

## 3. Público-Alvo
* Tutores de pets: pessoas que necessitam de hospedagem temporária para seus animais.

* Cuidadores de pets: indivíduos aptos e interessados em hospedar animais em casa.

* Administradores da plataforma: responsáveis pelo suporte, moderação e operação do sistema.  </br></br>

### 3.1 Descrição dos usuários 

|     Nome      |                          Descrição                           |                    Responsabilidade                    |
| :-----------: | :----------------------------------------------------------: | :----------------------------------------------------: |
| Administrador | Pessoa que trabalha para a plataforma. |   Responsável pelo gerenciamento e funcionamento correto da aplicação.   |  
|     Tutor     | Pessoa que deseja encontrar profissionais que possam cuidar do seu Pet por uma tempo. |   Cuida do seu Pet e procura por profissionais que prestam serviço de cuidador de Pet.    |
|   Cuidador    | Profissional que presta serviço de cuidar de pets. Pode ser pessoa física ou empresa. | Cuidar dos Pets segundo a necessidade dos mesmos. |
|   Visitante   |                Pessoa que acessa o site.                 |                  Nenhuma.               |


## 4. Descrição Geral do Produto
A Nanny’s Pet será uma aplicação web (e desejavel mobile), com interface intuitiva e funcionalidades que facilitam todo o processo de contratação do serviço: desde a busca e seleção do cuidador, passando pela comunicação, agendamento e pagamento, até a avaliação pós-serviço.  </br></br>

### 4.1 Funcionalidades Principais (resumo)
* Cadastro de usuários com perfis distintos

* Busca inteligente por cuidadores com filtros

* Solicitação, agendamento e confirmação de hospedagens

* Chat interno tutor/cuidador

* Sistema de avaliações e reputação

* Pagamento seguro online

* Histórico de serviços realizados  </br></br>


#### 4.1.1 Descrição do ambiente dos usuários

* Número de pessoas envolvidas na execução da tarefa? Isso está mudando?  
  **Para que a tarefa seja executada são necessárias duas pessoas, uma que disponibiliza os serviços de hospedagem e a outra que precisa desse serviço.**  
* Quaisquer restrições ambientais exclusivas: móveis, externas etc?  
  **Não há restrições ambientais.** 
* Que plataformas de sistema são utilizadas hoje? Plataformas futuras?  
  **Sistema de de plataforma web. Futuramente será desenvolvido sistema mobile** 
* Que outros aplicativos estão em uso? É necessário que o seu aplicativo interaja com eles?  
  **Não há aplicativos similares.** 
  </br></br>

## 5. Principais necessidades dos usuários

Conseguir encontrar uma pessoa qualificada, de confiança, com um ambiente seguro e adequado as necessidades do animal e disponível para cuidar e hospedar com todo amor e carinho com que você cuidaria, quando precisar se ausentar e não tiver onde deixá-lo. </br></br>

## 6. Alternativas concorrentes

* **DogHero** o principal concorrente da plataforma, contando com serviços de hospedagem, creche, passeio, veterinário e pet sitter (um cuidador vai até a sua casa para ficar com o seu pet) https://www.doghero.com.br/ </br></br>

E a ambito regional, temos algumas opções como:    </br>

* **Prontocan: Hotel, Day Care e Clínica Veterinária** hotel para animais de estimação. R. Dr. Pedro Segundo de Araújo, 1801 - Capim Macio, Natal - RN, 59082-040 https://www.instagram.com/prontocan_/    </br>

* **Lar Dog Lar - Day Care e Hospedagem** hospedagem animal no bairro do Pitimbu - R. Serra do Tombador, 8098 - Pitimbú, Natal - RN, 59068-160 https://hotelzinhopetlardoglar.negocio.site/    </br>

## 7. Visão geral do produto

Uma plataforma que conecta pessoas com tempo, qualificação, um ambiente seguro, disposição, amor e carinho para acolher animais de estimação, com indivíduos em busca de cuidadores de confiança para garantir o bem-estar de seus amados animaizinhos nas horas de necessidade.  </br></br>

## 8. Requisitos funcionais

| Código |            Nome           |                                                                            Descrição                                                                            | Prioridade |
| :----: | :-----------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------: |
|  RF01  |    Cadastro de Usuários   | O sistema deve permitir o cadastro de tutores de pets e cuidadores, com perfis distintos e informações relevantes como nome, e-mail, telefone e tipo de perfil. |  Essencial |
|  RF02  |  Gerenciamento de Perfil  |             O usuário deve poder editar seus dados pessoais, preferências, adicionar fotos e atualizar informações do perfil de forma independente.             | Importante |
|  RF03  |    Busca de Cuidadores    |    O tutor deve poder buscar cuidadores com base em filtros como localização, datas disponíveis e preço, ordenando os resultados por avaliação ou distância.    |  Essencial |
|  RF04  | Solicitação de Hospedagem |                         O tutor deve poder solicitar uma hospedagem temporária para seu pet, indicando período desejado e preferências.                         |  Essencial |
|  RF05  | Confirmação e Agendamento |                       O cuidador deve poder aceitar ou recusar solicitações de hospedagem, com base em sua disponibilidade e preferências.                      |  Essencial |
|  RF06  |    Sistema de Mensagens   |                     A plataforma deve oferecer um canal interno de comunicação entre tutor e cuidador para alinhamentos antes da hospedagem.                    | Importante |
|  RF07  |   Avaliação e Reputação   |             Após o serviço, tutor e cuidador devem poder avaliar-se mutuamente, atribuindo notas e comentários que alimentam o sistema de reputação.            |  Essencial |
|  RF08  |        Notificações       |                 O sistema deve enviar notificações sobre novas mensagens, confirmações, avaliações e lembretes de hospedagem, via app ou e-mail.                |  Desejável |
|  RF09  |         Pagamentos        |                   O sistema deve permitir o pagamento online dos serviços de forma segura, com suporte a métodos como cartão de crédito e Pix.                  |  Essencial |
|  RF10  |   Histórico de Serviços   |                      O usuário deve poder visualizar o histórico de hospedagens realizadas (para tutores) ou oferecidas (para cuidadores).                      |  Desejável |


## 9. Requisitos não-funcionais

| Código |       Nome       |                                                                              Descrição                                                                             |    Categoria    | Classificação |
| :----: | :--------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------: | :-----------: |
|  RNF01 |    Usabilidade   | A interface deve ser intuitiva, acessível e adaptável a diferentes dispositivos (desktop, tablet e smartphone), garantindo boa experiência para todos os usuários. |   Usabilidade   |   Essencial   |
|  RNF02 |    Desempenho    |                                A busca por cuidadores deve retornar resultados em até 2 segundos, mesmo com grande volume de dados.                                |   Performance   |   Importante  |
|  RNF03 |  Disponibilidade |                                 A plataforma deve estar disponível 99,5% do tempo mensal, garantindo acesso contínuo aos serviços.                                 |  Confiabilidade |   Essencial   |
|  RNF04 |     Segurança    |                         Os dados pessoais e financeiros dos usuários devem ser criptografados e protegidos contra acessos não autorizados.                         |    Segurança    |   Essencial   |
|  RNF05 |  Escalabilidade  |                              O sistema deve ser capaz de lidar com o aumento do número de usuários sem perda de desempenho ou falhas.                              |   Arquitetura   |   Importante  |
|  RNF06 |  Confiabilidade  |                         O sistema deve garantir consistência nas operações realizadas, evitando perdas de dados ou falhas de processamento.                        |  Confiabilidade |   Essencial   |
|  RNF07 |  Compatibilidade |               A aplicação deve ser compatível com os principais navegadores (Chrome, Firefox, Safari) e sistemas operacionais móveis (Android, iOS).               | Compatibilidade |   Importante  |
|  RNF08 | Manutenibilidade |               O sistema deve ter arquitetura modular, facilitando futuras manutenções e evoluções da plataforma com baixo acoplamento entre módulos.               |   Arquitetura   |   Importante  |
## 10. Priorização dos Requisitos – Técnica MoSCoW
Legenda:
* Must – Essencial (deve ser implementado no MVP)
* Should – Importante (recomendado para a primeira versão completa)
* Could – Desejável (pode ser incluído se houver tempo/recurso)
* Won’t – Fora do escopo atual (não será implementado agora)

### Requisitos Funcionais
| Código |         Requisito         |             Descrição Resumida            | Prioridade |
| :----: | :-----------------------: | :---------------------------------------: | :--------: |
|  RF01  |    Cadastro de Usuários   | Permitir cadastro de tutores e cuidadores |    Must    |
|  RF02  |  Gerenciamento de Perfil  |     Permitir edição de dados do perfil    |   Should   |
|  RF03  |    Busca de Cuidadores    |       Buscar cuidadores com filtros       |    Must    |
|  RF04  | Solicitação de Hospedagem |      Solicitar hospedagem para o pet      |    Must    |
|  RF05  | Confirmação e Agendamento |   Cuidadores aceitam ou recusam pedidos   |    Must    |
|  RF06  |    Sistema de Mensagens   |    Canal de comunicação entre usuários    |   Should   |
|  RF07  |   Avaliação e Reputação   |       Avaliação mútua após o serviço      |    Must    |
|  RF08  |        Notificações       |     Alertas sobre eventos e mensagens     |    Could   |
|  RF09  |         Pagamentos        |   Pagamento seguro dentro da plataforma   |    Must    |
|  RF10  |   Histórico de Serviços   |   Visualização de hospedagens anteriores  |    Could   |
### Requisitos Não Funcionais
| Código |     Requisito    | Descrição Resumida                                          | Prioridade |
| :----: | :--------------: | :---------------------------------------------------------- | :--------: |
|  RNF01 |    Usabilidade   | Interface intuitiva e adaptável                             |    Must    |
|  RNF02 |    Desempenho    | Resultados de busca em até 2 segundos                       |   Should   |
|  RNF03 |  Disponibilidade | Disponível 99,5% do tempo mensal                            |    Must    |
|  RNF04 |     Segurança    | Criptografia de dados pessoais e financeiros                |    Must    |
|  RNF05 |  Escalabilidade  | Suporte ao crescimento da base de usuários                  |   Should   |
|  RNF06 |  Confiabilidade  | Garantia de consistência nas operações                      |    Must    |
|  RNF07 |  Compatibilidade | Funcionamento em navegadores e sistemas operacionais móveis |   Should   |
|  RNF08 | Manutenibilidade | Arquitetura modular para facilitar manutenções              |   Should   |
## 11. Restrições
* O MVP (Produto Mínimo Viável) deverá estar disponível para web e responsivo para dispositivos móveis.

* O sistema utilizará gateways de pagamento existentes (ex: Stripe, PayPal ou Pix).

* Os dados dos usuários deverão estar em conformidade com a LGPD.

## 12. Riscos Iniciais
* Atraso no desenvolvimento de funcionalidades críticas (ex: pagamentos)

* Baixa adesão inicial de cuidadores ou tutores

* Falhas na comunicação entre usuários

* Problemas relacionados à segurança dos dados

## 13. Critérios de Sucesso
* Lançamento do MVP com funcionalidades Must implementadas

* Pelo menos 100 usuários cadastrados no primeiro mês

* Avaliação de usabilidade mínima de 80% em testes com usuários

* Índice de disponibilidade mensal ≥ 99,5%
