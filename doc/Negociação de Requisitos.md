## Negociação de Requisitos – Projeto *Nanny’s Pet*

### 1. **Identificação de Conflitos entre Requisitos**

A partir da **Matriz de Interações** e dos requisitos definidos, identificamos os seguintes conflitos:

| Conflito ID | Requisitos Envolvidos                                              | Descrição do Conflito                                                                  |
| ----------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| C1          | RF08 (Sistema de Avaliação), RNF03 (Privacidade de dados)          | A exibição de avaliações pode comprometer a privacidade dos cuidadores/tutores.        |
| C2          | RF03 (Busca geolocalizada), RNF02 (Desempenho)                     | O uso de geolocalização pode afetar negativamente o desempenho em dispositivos móveis. |
| C3          | RF07 (Mensagens entre usuários), RNF03 (Privacidade de dados)      | A troca livre de mensagens pode permitir compartilhamento de dados sensíveis.          |
| C4          | RF04 (Confirmação de pagamento automática), RNF01 (Confiabilidade) | O sistema automático pode falhar em reconhecer pagamentos reais ou gerar duplicidade.  |

---

### 2. **Análise dos Conflitos**

De acordo com o livro-texto base ("Engenharia de Requisitos – Sommerville" ou similar), os conflitos podem ser:

* **Conflito de requisitos funcionais × não funcionais** – Quando a funcionalidade entra em choque com atributos de qualidade.
* **Conflito de privacidade ou segurança** – Um requisito funcional ameaça a confidencialidade ou segurança.
* **Conflito técnico** – A implementação de uma funcionalidade compromete desempenho, escalabilidade ou integridade.

Classificando:

| Conflito ID | Tipo de Conflito                           |
| ----------- | ------------------------------------------ |
| C1          | Funcional × Não Funcional (Privacidade)    |
| C2          | Funcional × Não Funcional (Desempenho)     |
| C3          | Funcional × Não Funcional (Privacidade)    |
| C4          | Funcional × Não Funcional (Confiabilidade) |

---

### 3. **Resolução dos Conflitos**

Usaremos técnicas de **priorização + negociação baseada em stakeholders** e **compensação com salvaguardas técnicas**:

| Conflito ID | Estratégia de Resolução                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| C1          | Tornar a avaliação pública apenas de forma agregada (ex: nota geral) e permitir anonimato na avaliação.   |
| C2          | Implementar cache local e limitar a área de busca por padrão (ex: raio de 5 km) para reduzir carga.       |
| C3          | Restringir envio de dados pessoais no chat por meio de filtros e termos de uso com alerta automático.     |
| C4          | Adicionar mecanismo de verificação dupla nos pagamentos (ex: webhook + validação manual em caso de erro). |

---

### 4. **Documentação do Raciocínio Empregado**

Durante a análise dos conflitos, seguimos o seguinte processo:

1. **Mapeamos os requisitos funcionais e não funcionais**.
2. **Geramos uma matriz de interação** para detectar sobreposições e conflitos.
3. **Classificamos o tipo de conflito com base na origem (funcional × qualidade)**.
4. **Consultamos prioridades definidas pela técnica MoSCoW** e realizamos **negociação simulada** entre os interesses do usuário (funcionalidade) e os interesses técnicos (qualidade e segurança).
5. **Aplicamos salvaguardas técnicas** (ex: anonimato, cache, filtros automáticos, dupla verificação) em vez de suprimir funcionalidades desejadas pelo cliente.

### 5. **tabela formatada do Raciocínio Empregado**

| Conflito ID | Requisitos Envolvidos | Tipo de Conflito                           | Descrição do Conflito                                         | Resolução                                                           |
| ----------- | --------------------- | ------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| C1          | RF08 / RNF03          | Funcional × Não Funcional (Privacidade)    | Avaliações podem comprometer a privacidade dos usuários.      | Exibir apenas nota agregada e permitir anonimato nas avaliações.    |
| C2          | RF03 / RNF02          | Funcional × Não Funcional (Desempenho)     | Geolocalização pode afetar desempenho em dispositivos móveis. | Implementar cache e limitar área de busca padrão (ex: 5 km).        |
| C3          | RF07 / RNF03          | Funcional × Não Funcional (Privacidade)    | Mensagens podem conter dados sensíveis dos usuários.          | Inserir filtros de conteúdo e alertas de compartilhamento de dados. |
| C4          | RF04 / RNF01          | Funcional × Não Funcional (Confiabilidade) | Confirmação automática pode gerar falhas ou duplicidades.     | Usar verificação dupla (webhook + fallback manual).                 |
