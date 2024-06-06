# AQMoni

<!--Tecnologias Utilizadas e suas versões-->

> Status: 🏭 Em desenvolvimento

## Indíce :bookmark_tabs:

:cd: [Descrição](#descrição-clipboard) 

:cd: [Funcionalidade](#funcionalidade-gear)    

:cd: [Contribuir](#contribuir-gift) 

## Descrição :clipboard:

<p style="text-align:justify">
O AQMoni é uma plataforma para coleta e apresentação de dados de monitoramento da qualidade água em áreas de interesse público (regiões de desastres, áreas litorâneas, áreas de conservação ambiental, etc).
</p>

## Funcionalidades :gear:

### Arquitetura

Este protótipo é baseado na MSA (Microservices Architecture), onde cada segmento da aplicação representa um serviço independente, os quais são:

- Gerenciamento de Credenciais de Acesso
    - Função: Gerir o acesso dos agentes ao sistema de monitoramento, cadastrando e validando credenciais;
    - Tecnologias: Classes Javascript e Firebase (cloud).
- Mapeamento dos Pontos de Medição
    - Função: Mapear os pontos de medição cadastrados e apresentá-los em um mapa para visualização dos usuários;
    - Tecnologias: Classes Javascript e API REST (mapa).
- Gerenciamento das Medições
    - Função: Cadastro e manutenção dos indicadores de qualidade da água para cada medição cadastrada em local e horário específicos;
    - Tecnologias: Classes Javascript e arquivo JSON
  
### Visão dos Usuários

#### Cidadão

- Representa: População ou Organizações buscando dados de qualidade para embasar projetos de conservação ambiental ou de promoção da qualidade de vida humana nas áreas de interesse
- Não precisa se cadastrar no sistema
- Tem acesso à:
    - Tela de Mapa
    - Tela de Estatísticas

#### Agente de Monitoramento

- Representa: Agentes capacitados com equipamentos de análise da qualidade da água pertencentes à Órgãos públicos, ONGs, empresas. Pesquisadores científicos de instituições de pesquisa também estão aqui representados.
- Precisa se cadastrar no sistema
- Tem acesso à:
    - Telas do Cidadão
    - Tela de Cadastro de Medição


## Contribuir :gift:

Se você tem alguma ideia, sugestão, ou viu algum erro, você pode me contar [aqui (Issues)][issues].

<!---Links utilizados no documento-->



[issues]: https://github.com/GustavoHerreroNunes/AQMoni/issues
