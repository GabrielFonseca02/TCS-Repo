# ClimaQC

## Qualidade e Preparação de Dados Climáticos

Aplicação Web para auditoria, tratamento e documentação da qualidade de séries temporais meteorológicas das estações do INMET.

**Status:** Projeto em desenvolvimento

## Sobre o projeto

O **ClimaQC** tem como objetivo auxiliar estudantes e pesquisadores a preparar séries temporais de precipitação e temperatura obtidas nas estações do INMET, transformando dados brutos em séries tratadas e auditadas.

A aplicação permitirá carregar os dados de uma estação e utilizar essas informações para identificar automaticamente as inconsistências presentes na série.

A partir dos dados carregados, o sistema deverá apresentar:

composição das inconsistências;
percentual de completude da série;
histórico de processamentos;
indicadores de qualidade;
relatórios;
informações sobre a distribuição das falhas ao longo do tempo e por variável.

O projeto será desenvolvido de forma incremental ao longo da disciplina de Desenvolvimento Web.

## Problema

Dados meteorológicos brutos raramente estão prontos para análise. À medida que uma série temporal é utilizada em estudos, torna-se necessário garantir sua consistência e continuidade.

Informações como valores faltantes, medições fisicamente impossíveis, registros duplicados e lacunas temporais podem comprometer análises posteriores e ficam dispersas ou pouco documentadas quando o tratamento é feito manualmente em planilhas.

O ClimaQC pretende centralizar esse tratamento e transformá-lo em uma visão organizada e rastreável da qualidade dos dados do usuário.

## Objetivo

Permitir que o usuário carregue séries temporais de precipitação e temperatura das estações do INMET e acompanhe, a partir delas, a qualidade, a completude e as inconsistências dos dados.

O sistema também deverá disponibilizar indicadores e relatórios que auxiliem o usuário na análise da qualidade das próprias séries antes de utilizá-las em estudos.

O ClimaQC é uma ferramenta de organização e análise da qualidade de dados. Seus indicadores não substituem a validação metodológica de responsabilidade do pesquisador.

## Principais funcionalidades

### Conjuntos de dados

Upload de arquivos CSV do INMET;
Consulta dos conjuntos carregados;
Visualização dos registros;
Edição de metadados do conjunto;
Exclusão de conjuntos;
Filtros por estação e período.

### Qualidade e auditoria

Detecção de valores faltantes;
Detecção de valores fisicamente impossíveis;
Detecção de registros duplicados;
Detecção de lacunas temporais;
Classificação de cada ocorrência por motivo;
Marcação dos registros afetados.

### Relatórios

Composição das ocorrências por motivo;
Distribuição das falhas por variável;
Distribuição das falhas por período;
Percentual de completude da série;
Histórico de processamentos;
Exportação da série tratada e do relatório.

### Indicadores

A aplicação poderá identificar situações relevantes, como:

baixa completude de uma variável;
concentração de falhas em determinado período;
estações com qualidade de dados insuficiente.

## Domínio

Os principais conceitos do sistema são:

```
Usuário
   │
   └── possui
          │
          ▼
   Conjunto de Dados
          │
          └── contém
                 │
                 ▼
             Registros
                 │
                 └── pertencem a
                        │
                        ▼
                     Estação
```

```
Conjunto de Dados
   │
   └── gera
          │
          ▼
   Relatório de Auditoria
          │
          └── agrupa
                 │
                 ▼
            Ocorrências
                 │
                 └── classificadas por
                        │
                        ▼
                 Regra de Qualidade
```

### Entidades principais

Usuário — pessoa que utiliza o sistema.
Estação — estação meteorológica do INMET, origem das medições.
Conjunto de Dados — série temporal carregada a partir de um arquivo do INMET.
Registro — medição individual (data/hora, precipitação, temperatura).
Regra de Qualidade — critério de validação aplicado aos registros.
Ocorrência — inconsistência detectada em um registro, com o motivo associado.
Relatório de Auditoria — consolidação das ocorrências de um conjunto de dados.

## Tecnologias

### Front-end

Tecnologias inicialmente previstas:

HTML5;
CSS3;
JavaScript;
React.

### Back-end

Tecnologias inicialmente previstas:

Python;
FastAPI;
pandas;
API REST;
JSON.

### Banco de dados

Será utilizado um banco de dados relacional.
A tecnologia específica será definida durante a implementação.

## Arquitetura inicial

A visão inicial da aplicação é:

```
┌─────────────────────┐
│      Front-end      │
│                     │
│ React / HTML / CSS  │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│       API REST      │
│                     │
│ Python / FastAPI    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Regras de negócio │
│                     │
│ Leitura de dados    │
│ Regras de qualidade │
│ Auditoria           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Banco de dados   │
└─────────────────────┘
```

A arquitetura será refinada conforme o projeto evoluir.

## Estrutura prevista do projeto

A estrutura poderá evoluir ao longo das etapas. Inicialmente, será adotada uma organização semelhante a:

```
climaqc/
│
├── docs/
│   ├── proposta.md
│   └── diagrama-inicial.*
│
├── client/
│
├── server/
│
├── README.md
│
└── .gitignore
```

A estrutura definitiva será definida conforme as tecnologias e decisões arquiteturais adotadas durante o desenvolvimento.

## Escopo inicial

### Incluído

upload de séries do INMET;
leitura e normalização dos dados;
detecção de valores faltantes;
detecção de valores impossíveis;
detecção de duplicatas;
detecção de lacunas temporais;
classificação das ocorrências por motivo;
relatório de auditoria;
dashboard;
exportação da série tratada;
indicadores de completude.

### Não incluído inicialmente

preenchimento de falhas com dados de reanálise (ERA5);
correção de viés entre estação e reanálise;
leitura de arquivos NetCDF/GRIB;
cálculo de evapotranspiração potencial (PET);
cálculo dos índices SPI e SPEI;
análise comparativa entre métricas de seca;
suporte inicial a todas as variáveis meteorológicas.

## Desenvolvimento por etapas

O projeto será desenvolvido incrementalmente.

| Etapa | Objetivo |
|-------|----------|
| 01 | Proposta e especificação |
| 02 | Protótipo estrutural com HTML semântico |
| 03 | Interface responsiva com CSS |
| 04 | Interatividade com JavaScript |
| 05 | Modularização e comunicação assíncrona |
| 06 | API REST |
| 07 | Persistência e CRUD com banco de dados |
| 08 | Organização arquitetural |
| 09 | Aplicação com framework front-end |
| 10 | Qualidade, versionamento e release candidate |

Cada etapa deverá representar uma evolução do mesmo projeto.

## Versionamento

O projeto utilizará Git durante todo o desenvolvimento.
As versões das etapas serão identificadas preferencialmente por tags:

etapa-01
etapa-02
etapa-03
etapa-04
etapa-05
etapa-06
etapa-07
etapa-08
etapa-09
etapa-10
final

## Documentação

A documentação do projeto será mantida no diretório:

/docs

A documentação inicial inclui:

/docs/proposta.md

Novos documentos serão adicionados conforme as etapas do projeto forem concluídas.

## Execução

As instruções de instalação e execução serão adicionadas e atualizadas conforme as tecnologias forem implementadas.

A versão inicial do projeto ainda não possui uma aplicação executável completa.

Quando o front-end e o back-end forem implementados, esta seção deverá conter:

pré-requisitos;
instalação das dependências;
configuração das variáveis de ambiente;
configuração do banco de dados;
inicialização do servidor;
inicialização do cliente;
instruções para utilização da aplicação.

## Testes

Os procedimentos e evidências de testes serão documentados conforme as funcionalidades forem implementadas.

A aplicação deverá evoluir para possuir mecanismos que permitam verificar principalmente:

leitura e normalização dos dados;
detecção das inconsistências;
classificação das ocorrências;
cálculos de completude;
operações da API;
persistência;
integração entre front-end e back-end.

## Decisões e limitações

Algumas decisões ainda serão tomadas durante o desenvolvimento, incluindo:

tecnologia específica do banco de dados;
fonte de dados externos para preenchimento de falhas;
estratégia para integração com dados de reanálise (ERA5);
fórmula dos indicadores de qualidade;
mecanismo de autenticação;
arquitetura definitiva do servidor.

Essas decisões deverão ser registradas na documentação do projeto conforme forem tomadas.

## Responsabilidade sobre as informações

O ClimaQC tem finalidade exclusivamente educacional e de organização e análise da qualidade de informações fornecidas pelo usuário.

Os indicadores e relatórios apresentados pela aplicação dependem da qualidade dos dados de entrada e não substituem a validação metodológica nem a interpretação científica, que são de responsabilidade do pesquisador.

## Licença

A licença do projeto será definida posteriormente.
