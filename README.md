# AQMoni

![AQMoni logo and banner][project-banner]

<!--Tecnologias Utilizadas e suas versões-->

> Status: 🏭 Em desenvolvimento

## Indíce :bookmark_tabs:

:cd: [Descrição](#descrição-clipboard) 

:cd: [Funcionalidades](#funcionalidades-gear)    

:cd: [Modelagem de Processos](#modelagem-de-processos-twisted_rightwards_arrows)

:cd: [UI Mockup](#ui-mockup-art)

:cd: [Backlog de Inovação](#backlog-de-inovação-white_check_mark)

:cd: [Instalação](#instalação-floppy_disk) 

:cd: [Contribuir](#contribuir-gift) 

## Descrição :clipboard:

<p style="text-align:justify">
O AQMoni é uma plataforma para coleta e apresentação de dados de monitoramento da qualidade água em áreas de interesse público (regiões de desastres, áreas litorâneas, áreas de conservação ambiental, etc). Contempla as interfaces e funcionalidades para cadastro de medições de qualidade da água, mapeamento dos pontos de medição e apresentação dos dados coletados para a população em geral.

Este protótipo foi desenvolvido em grupo como atividade avaliativa na FIAP, na turma do 3º ano de graduação à distância em Sistemas de Informação, e participou da [Global Solution 2024.1 (Blue Future)][gs2024]. Seu objetivo é apresentar uma solução para o desafio proposto pela ONU de monitoramento da qualidade da água nos Oceanos.

*AQMoni, monitorando o presente dos oceanos, preservando o futuro do planeta. 🌊🌍*
</p>

## Funcionalidades :gear:

### Arquitetura

Este protótipo é baseado na MSA (Microservices Architecture), onde cada segmento da aplicação representa um serviço independente, os quais são:

- **Gerenciamento de Credenciais de Acesso**
    - **Função:** Gerir o acesso dos agentes ao sistema de monitoramento, cadastrando e validando credenciais;
    - **Tecnologias:** Scripts Javascript e Firebase (cloud).
- **Mapeamento dos Pontos de Medição**
    - **Função:** Mapear os pontos de medição cadastrados e apresentá-los em um mapa para visualização dos usuários;
    - **Tecnologias:** Scripts Javascript e API REST (leaflet).
- **Gerenciamento das Medições**
    - **Função:** Cadastro e manutenção dos indicadores de qualidade da água para cada medição cadastrada em local e horário específicos;
    - **Tecnologias:** Classes Javascript e LocalStorage.
  
### Visão dos Usuários

#### Cidadão

- **Representa:** População ou Organizações buscando dados de qualidade para embasar projetos de conservação ambiental ou de promoção da qualidade de vida humana nas áreas de interesse.
- **Nível de acesso:** Público (não precisa de cadastro).
- **Telas de visíveis:**
    - Tela de Mapa
    - Tela de Estatísticas

#### Agente de Monitoramento

- **Representa:** Agentes capacitados com equipamentos de análise da qualidade da água pertencentes à Órgãos públicos, ONGs ou empresas. Pesquisadores científicos de instituições de pesquisa também estão aqui representados.
- **Nível de acesso:** Restrito (necessita de cadastro).
- **Telas de visíveis:**
    - Telas do Cidadão
    - Tela de Cadastro de Medição


## Modelagem de Processos :twisted_rightwards_arrows:


Além de atender requisitos técnicos, nosso projeto necessitava de uma modelagem baseada em processos de negócio para garantir a eficiência do sistema e seu alinhamento aos objetivos estratégicos em prol dos Oceanos. 

A modelagem de processos foi realizada com a notação BPMN (Business Process Model and Notation) e pode ser acessada através do [arquivo pdf de modelagem de processos][bpmn-pdf].

## UI Mockup :art:

Um protótipo de interface gráfica (UI Mockup) foi desenvolvido através do **Figma**, e pode ser acessado através do [arquivo pdf de UI Mockup][ui-mockup].

Uma paleta de cores acessível para pessoas com daltonismo foi utilizada, e a interface foi pensada para ser responsiva e acessível, com regras de contraste e tamanhos de fontes adequados.

### Paleta de Cores
| Dark Blue | Light Blue | Beige  | Mustard Yellow | Light Green | Dark Green | Dark Red |
| --- | --- | --- | --- | --- | --- | --- |
| #023E73 | #2DBDF7 | #F2E1AE | #E6A63E | #488E34 | #377027 | #B02502 |

![Paleta de Cores][color-palette]

## Backlog de Inovação :white_check_mark:

O backlog de inovação é uma lista de melhorias e novas funcionalidades que podem ser implementadas para desenvolver a versão de produção do AQMoni, a partir do protótipo apresentado.

| Inovação | Descrição | Prioridade | Tipo de Requisito |
| --- | --- | --- | --- |
| Validar e-mails institucionais | Implementar validação de e-mails institucionais para garantir que apenas agentes de monitoramento de organizações cadastradas possam acessar o sistema | Must have | Não-funcional |
| Autenticação de dois fatores | Implementar autenticação de dois fatores para garantir a segurança dos dados de medição | Must have | Não-funcional |
| Painel de Administração | Criar um painel de administração para que as organizações cadastradas possam gerenciar os agentes de monitoramento | Should have | Funcional |
| Análises Estatísticas | Implementar análises estatísticas para identificar tendências e padrões nos dados de medição e apresentá-los à população por meio de gráficos detalhados | Should have | Funcional |
| Alertas Inteligentes | Criar alertas inteligentes baseados na análise de múltiplos indicadores para notificar a população sobre possíveis ameaças iminentes às regiões de interesse (ex: aumento do nível do mar, risco de infecção, dano à ecosistemas marinhos) | Could have | Funcional |
| Integração com APIs de Previsão do Tempo | Integrar o sistema com APIs de previsão do tempo para indicar possíveis eventos climáticos que possam aumentar a propagação de contaminantes na água | Could have | Funcional |


## Instalação :floppy_disk:

### Pré-requisitos
- Node.js
- NPM
- Base de dados configurada no Firebase
- Acesso à Internet
    - O sistema utiliza a API do Leaflet para mapeamento dos pontos de medição
    - O sistema se conecta Firebase para autenticação e armazenamento de credenciais na nuvem

### Etapas

1. Clone o repositório do projeto e instale as dependências de cada serviço. 

```bash
git clone https://github.com/GustavoHerreroNunes/AQMoni.git

cd AQMoni

npm install
```

2. Atualize o arquivo `firebase-init.js`* na raiz do projeto com as suas credenciais de acesso ao Firebase.

```js
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};
```
*Obs: Este projeto já tem informações no arquivo `firebase-init.js` para validação e teste da solução pelos professores da FIAP durante o período de avaliação. Findo este período, as credênciais serão invalidadas.*

3. Para executar o projeto, utilize o comando `npm start` no diretório raiz.

```bash
npm start
```

4. Acesse o sistema através do navegador no endereço informado no terminal de comandos (default: `http://localhost:8080`).

![Endereço de Acesso apresentado no terminal de comandos][access-address]


## Contribuir :gift:

Se você tem alguma ideia, sugestão, ou viu algum erro, você pode nos contar [aqui (Issues)][issues].

<!---Links utilizados no documento-->

[issues]: https://github.com/GustavoHerreroNunes/AQMoni/issues

[gs2024]: https://www.fiap.com.br/graduacao/global-solution/

<!--Files-->
[bpmn-pdf]: https://github.com/GustavoHerreroNunes/AQMoni/blob/main/sistemaMonitoramentoAgua.pdf

[ui-mockup]: https://github.com/GustavoHerreroNunes/AQMoni/blob/main/Mockup.pdf

<!--Images-->

[project-banner]: https://github.com/GustavoHerreroNunes/AQMoni/blob/main/readme-src/banner.jpg
[access-address]: https://github.com/GustavoHerreroNunes/AQMoni/blob/main/readme-src/access-terminal.jpg
[color-palette]:  https://github.com/GustavoHerreroNunes/AQMoni/blob/main/readme-src/color-palette.png
