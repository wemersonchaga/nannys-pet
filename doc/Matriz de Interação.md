# Matriz de Interação dos Requisitos Funcionais
|                                    | RF01 | RF02 | RF03 | RF04 | RF05 | RF06 | RF07 | RF08 | RF09 | RF10 |
| ---------------------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| **RF01** Cadastro de Usuários      | 0    | 1000 | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    |
| **RF02** Gerenciamento de Perfil   | 1000 | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    |
| **RF03** Busca de Cuidadores       | 0    | 0    | 0    | 1000 | 1000 | 0    | 0    | 0    | 0    | 0    |
| **RF04** Solicitação de Hospedagem | 0    | 0    | 1000 | 0    | 1000 | 1000 | 0    | 0    | 1000 | 1000 |
| **RF05** Confirmação e Agendamento | 0    | 0    | 1000 | 1000 | 0    | 1000 | 0    | 0    | 1000 | 1000 |
| **RF06** Sistema de Mensagens      | 0    | 0    | 0    | 1000 | 1000 | 0    | 0    | 0    | 0    | 0    |
| **RF07** Avaliação e Reputação     | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 1000 |
| **RF08** Notificações              | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 1000 | 1000 |
| **RF09** Pagamentos                | 0    | 0    | 0    | 1000 | 1000 | 0    | 0    | 1000 | 0    | 0    |
| **RF10** Histórico de Serviços     | 0    | 0    | 0    | 1000 | 1000 | 0    | 1000 | 1000 | 0    | 0    |
## Interpretação rápida:
* Sobreposição (1000):

RF04 (Solicitação) e RF05 (Confirmação): precisam existir em conjunto para o processo de hospedagem.

RF01 e RF02: dependem da estrutura do cadastro do usuário.

* Independentes (0):

RF01 (Cadastro) é independente de mensagens, histórico, etc.

RF07 (Avaliação) não interfere diretamente na busca, mensagens ou agendamento, embora venha depois no fluxo.

* Nenhum conflito direto (1):

Como os requisitos foram bem definidos e estruturados, não foi identificado conflito funcional direto entre eles.

# Matriz Cruzada de Interação RF × RNF
Como são tipos distintos de requisitos, o ideal foi usar uma matriz cruzada, onde:

* As linhas representam os Requisitos Funcionais (RF)

* As colunas representam os Requisitos Não Funcionais (RNF)

Preenchimento da matriz:

* 1000 → O RNF sobrepõe-se fortemente ao RF (há dependência ou vínculo direto)

* 1 → O RNF conflita com o RF (há necessidade de reformulação, ajustes ou risco técnico)

* 0 → São independentes

| RF / RNF                           | RNF01<br>Usabilidade | RNF02<br>Desempenho | RNF03<br>Disponibilidade | RNF04<br>Segurança | RNF05<br>Escalabilidade | RNF06<br>Confiabilidade | RNF07<br>Compatibilidade | RNF08<br>Manutenibilidade |
| ---------------------------------- | -------------------- | ------------------- | ------------------------ | ------------------ | ----------------------- | ----------------------- | ------------------------ | ------------------------- |
| **RF01** Cadastro de Usuários      | 1000                 | 0                   | 0                        | 1000               | 0                       | 1000                    | 1000                     | 0                         |
| **RF02** Gerenciamento de Perfil   | 1000                 | 0                   | 0                        | 1000               | 0                       | 1000                    | 1000                     | 1000                      |
| **RF03** Busca de Cuidadores       | 1000                 | 1000                | 0                        | 0                  | 1000                    | 1000                    | 1000                     | 0                         |
| **RF04** Solicitação de Hospedagem | 1000                 | 0                   | 0                        | 1000               | 1000                    | 1000                    | 0                        | 0                         |
| **RF05** Confirmação e Agendamento | 1000                 | 0                   | 0                        | 1000               | 1000                    | 1000                    | 0                        | 0                         |
| **RF06** Sistema de Mensagens      | 1000                 | 0                   | 0                        | 0                  | 0                       | 1000                    | 1000                     | 0                         |
| **RF07** Avaliação e Reputação     | 1000                 | 0                   | 0                        | 0                  | 0                       | 1000                    | 0                        | 0                         |
| **RF08** Notificações              | 1000                 | 0                   | 0                        | 0                  | 0                       | 1000                    | 1000                     | 0                         |
| **RF09** Pagamentos                | 1000                 | 1000                | 0                        | 1000               | 1000                    | 1000                    | 1000                     | 1000                      |
| **RF10** Histórico de Serviços     | 1000                 | 0                   | 0                        | 0                  | 1000                    | 1000                    | 0                        | 1000                      |
## Análise rápida:
**Requisitos com maior dependência de RNFs:** RF01, RF02 e RF09 são fortemente impactados por segurança, compatibilidade e confiabilidade.

**RNF04 (Segurança)** afeta diretamente cadastro, pagamento, perfil e agendamento – qualquer falha aqui é crítica.

**RNF08 (Manutenibilidade)** é mais relevante para funcionalidades que demandam evolução futura (perfil, pagamento, histórico).
# Conflitos e Riscos Técnicos Identificados
## 1. RF09 – Pagamentos × RNF04 – Segurança
**Risco:** Transações financeiras lidam com dados sensíveis (cartão, Pix, CPF). Qualquer falha em criptografia, armazenamento ou comunicação expõe usuários a fraudes e o projeto a penalidades (LGPD).

**Impacto:** Alto. Prejudica a confiança e pode inviabilizar o sistema legalmente.

**Mitigação:** Implementar gateways de pagamento consolidados (ex: Stripe, Mercado Pago); uso de HTTPS; tokenização.

## 2. RF01 e RF02 – Cadastro e Perfil × RNF04 – Segurança e RNF06 – Confiabilidade
**Risco:** Inconsistência ou falha na proteção dos dados cadastrais dos usuários pode gerar vazamentos, sequestros de contas ou desinformação.

**Impacto:** Alto. Dados pessoais são protegidos por lei.

**Mitigação:** Validação de entrada, criptografia de senha, autenticação forte (2FA), logs de auditoria.

## 3. RF03 – Busca de Cuidadores × RNF02 – Desempenho e RNF05 – Escalabilidade
**Risco:** À medida que a base de cuidadores cresce, buscas mal otimizadas podem se tornar lentas.

**Impacto:** Médio a alto. Reduz usabilidade e frustra o usuário.

**Mitigação:** Uso de índices geográficos, filtros server-side, paginação e cache inteligente.

## 4. RF06 – Sistema de Mensagens × RNF06 – Confiabilidade
**Risco:** Mensagens perdidas ou não entregues podem gerar falhas de comunicação entre tutor e cuidador.

**Impacto:** Médio. Pode causar desentendimentos, perda de clientes.

**Mitigação:** Persistência imediata no banco de dados, notificações em tempo real com fallback, marcação de status (entregue/lido).

## 5. RF10 – Histórico de Serviços × RNF08 – Manutenibilidade
**Risco:** Com o tempo, acúmulo de registros pode gerar complexidade para manutenções futuras ou migrações de dados.

**Impacto:** Médio. A longo prazo, pode dificultar evolução do sistema.

**Mitigação:** Projetar arquitetura com repositórios separados, uso de logs arquivados e estrutura modular.

## 6. RNF03 – Disponibilidade × Vários RFs
**Risco:** O sistema precisa estar online 99,5% do tempo. Se a infraestrutura não for bem escolhida (ex: hospedagem instável), até mesmo funcionalidades básicas como login, mensagens e busca se tornam inacessíveis.

**Impacto:** Alto. Afeta a operação completa.

**Mitigação:** Hospedagem em nuvem confiável (ex: AWS, Azure), monitoramento contínuo, redundância e backups automáticos.
## Tabela de Riscos Técnicos – FMEA Simplificada
| ID | Requisito Envolvido | Tipo de Risco               | Descrição do Risco                                                            | Impacto | Probabilidade | Severidade | Mitigação Proposta                                                                          |
| -- | ------------------- | --------------------------- | ----------------------------------------------------------------------------- | ------- | ------------- | ---------- | ------------------------------------------------------------------------------------------- |
| R1 | RF09 × RNF04        | **Segurança**               | Vazamento de dados financeiros ou uso indevido de informações pessoais        | Alto    | Alta          | Crítico    | Gateways confiáveis (Stripe, PayPal), HTTPS, criptografia, logs e autenticação forte        |
| R2 | RF03 × RNF02/RNF05  | **Desempenho**              | Lentidão nas buscas com aumento de usuários                                   | Médio   | Alta          | Alto       | Indexação geográfica, cache, paginação, filtros server-side                                 |
| R3 | RF06 × RNF06        | **Confiabilidade**          | Perda de mensagens entre usuários (tutor/cuidador)                            | Médio   | Média         | Alto       | Salvar mensagens no banco, confirmação de leitura, alertas de entrega                       |
| R4 | RF01/RF02 × RNF04   | **Privacidade / LGPD**      | Exposição de dados pessoais de cadastro                                       | Alto    | Média         | Crítico    | Criptografia de senhas, acesso restrito, logs e adequação à LGPD                            |
| R5 | RF10 × RNF08        | **Manutenibilidade**        | Crescimento excessivo do histórico dificulta manutenção futura                | Médio   | Alta          | Médio      | Arquivamento por períodos, repositórios dedicados, segmentação de dados                     |
| R6 | Todos × RNF03       | **Disponibilidade**         | Sistema indisponível impede operações críticas (login, mensagens, pagamentos) | Alto    | Alta          | Crítico    | Infraestrutura em nuvem escalável, redundância, monitoramento e backups                     |
| R7 | RF09 × RNF06        | **Transações falhas**       | Pagamento efetuado mas não registrado corretamente                            | Alto    | Média         | Alto       | Uso de transações atômicas, verificação de callbacks, confirmação dupla (backend + gateway) |
| R8 | RF07 × RNF06        | **Reputação inconsistente** | Avaliações perdidas ou mal associadas após o serviço                          | Médio   | Baixa         | Médio      | Validar avaliações com referência direta ao histórico e usuário logado                      |
## Legenda:
* **Impacto:** Consequência da falha (Baixo / Médio / Alto)

* **Probabilidade:** Chances de ocorrer (Baixa / Média / Alta)

* **Severidade:** Resultado combinado (baixo: ≤4, médio: 5-6, crítico: ≥7)

   * Severidade = Fator ponderado de (Impacto × Probabilidade)

* **Mitigação Proposta:** Estratégia de prevenção ou correção
### A tabela de riscos com estilo semáforo,que classifica visualmente a severidade de cada risco com cores:

| ID | Descrição do Risco               | Impacto | Probabilidade | Severidade (Semáforo) |
| -- | -------------------------------- | ------- | ------------- | --------------------- |
| R1 | Segurança em pagamentos          | Alto    | Alta          | 🔴 Alto               |
| R2 | Lentidão na busca de cuidadores  | Médio   | Alta          | 🟡 Médio              |
| R3 | Mensagens não entregues          | Médio   | Média         | 🟡 Médio              |
| R4 | Privacidade de dados pessoais    | Alto    | Média         | 🟡 Médio              |
| R5 | Crescimento do histórico         | Médio   | Alta          | 🟡 Médio              |
| R6 | Sistema fora do ar               | Alto    | Alta          | 🔴 Alto               |
| R7 | Falhas no registro de pagamentos | Alto    | Média         | 🟡 Médio              |
| R8 | Avaliações inconsistentes        | Médio   | Baixa         | 🟢 Baixo              |


# Recomendações Gerais
Implementar testes automatizados focados em segurança e desempenho.

Utilizar logs estruturados e ferramentas de observabilidade (ex: Sentry, Datadog).

Estabelecer critérios de aceitos técnicos para requisitos críticos (como tempo de resposta da busca ou taxa de falhas permitida nos pagamentos).

Invistir cedo em arquitetura modular para facilitar manutenções e escalar sem retrabalho.
