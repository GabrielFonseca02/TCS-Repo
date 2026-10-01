/* ClimaQC — Etapa 04
 * Funcionalidades:
 * 1. Pesquisa de conjuntos.
 * 2. Validação de cadastro.
 * 3. Validação do formulário de novo conjunto.
 *
 * Os formulários apenas validam: não salvam nem enviam dados.
 */

"use strict";

// Cria uma área para apresentar mensagens na página.
function criarMensagem(elemento) {
  const mensagem = document.createElement("p");

  mensagem.setAttribute("role", "status");
  mensagem.setAttribute("aria-live", "polite");

  elemento.append(mensagem);

  return mensagem;
}

// Permite pesquisar sem distinguir maiúsculas e acentos.
function normalizarTexto(texto) {
  return texto
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// 1. Pesquisa na tabela de conjuntos.
function iniciarPesquisa() {
  const tabela = document.querySelector("main > table");
  const linkNovoConjunto = document.querySelector(
    'main > p > a[href="novo-conjunto.html"]'
  );

  // Executa apenas quando os elementos da página existem.
  if (!tabela || !linkNovoConjunto) return;

  const campoPesquisa = document.createElement("section");
  campoPesquisa.setAttribute("aria-label", "Pesquisa de conjuntos");

  const label = document.createElement("label");
  label.htmlFor = "pesquisa-conjuntos";
  label.textContent = "Pesquisar conjuntos";

  const input = document.createElement("input");
  input.id = "pesquisa-conjuntos";
  input.type = "search";
  input.placeholder = "Nome, estação, variável ou status";

  campoPesquisa.append(label, input);

  const mensagem = criarMensagem(campoPesquisa);

  tabela.before(campoPesquisa);

  // Converte as linhas da tabela em um array de objetos.
  const registros = Array.from(
    tabela.querySelectorAll("tbody tr")
  ).map(function (linha) {
    const texto = Array.from(linha.cells)
      .slice(0, 4)
      .map(function (celula) {
        return celula.textContent;
      })
      .join(" ");

    return {
      linha: linha,
      texto: normalizarTexto(texto)
    };
  });

  function filtrarConjuntos() {
    const termo = normalizarTexto(input.value);

    const encontrados = registros.filter(function (registro) {
      return registro.texto.includes(termo);
    });

    registros.forEach(function (registro) {
      registro.linha.hidden = !encontrados.includes(registro);
    });

    if (encontrados.length === 0) {
      mensagem.textContent =
        "Nenhum conjunto encontrado. Altere ou limpe a pesquisa.";
    } else {
      mensagem.textContent =
        `${encontrados.length} de ${registros.length} conjuntos encontrados.`;
    }
  }

  input.addEventListener("input", filtrarConjuntos);

  filtrarConjuntos();
}

// Configura os eventos e as mensagens dos formulários.
function prepararFormulario(formulario, validar, textoSucesso) {
  const mensagem = criarMensagem(formulario);

  // A validação nativa será acionada pelo reportValidity().
  formulario.noValidate = true;

  function atualizarValidacao() {
    mensagem.textContent = "";
    validar();
  }

  formulario.addEventListener("input", atualizarValidacao);
  formulario.addEventListener("change", atualizarValidacao);

  formulario.addEventListener("submit", function (evento) {
    // Evita enviar o formulário ou recarregar a página.
    evento.preventDefault();

    validar();

    if (!formulario.reportValidity()) {
      mensagem.textContent =
        "Revise os campos indicados antes de continuar.";
      return;
    }

    mensagem.textContent = textoSucesso;
  });
}

// 2. Validação do cadastro.
function iniciarCadastro() {
  const confirmacao = document.getElementById("confirmar-senha");

  if (!confirmacao) return;

  const formulario = confirmacao.form;
  const nome = formulario.elements.namedItem("nome");
  const email = formulario.elements.namedItem("email");
  const senha = formulario.elements.namedItem("senha");

  function validarCadastro() {
    nome.setCustomValidity(
      nome.value.trim() ? "" : "Informe seu nome."
    );

    email.value = email.value.trim();

    senha.setCustomValidity(
      senha.value.trim()
        ? ""
        : "Informe uma senha que não contenha apenas espaços."
    );

    confirmacao.setCustomValidity(
      confirmacao.value === senha.value
        ? ""
        : "As senhas não coincidem."
    );

    // Os atributos required e type="email" do HTML
    // também são verificados pelo reportValidity().
  }

  prepararFormulario(
    formulario,
    validarCadastro,
    "Dados de cadastro válidos. Nesta etapa, nenhuma conta foi criada."
  );
}

// 3. Validação do formulário de novo conjunto.
function iniciarNovoConjunto() {
  const arquivo = document.getElementById("arquivo");

  if (!arquivo) return;

  const formulario = arquivo.form;
  const nome = formulario.elements.namedItem("nome");

  function validarConjunto() {
    nome.setCustomValidity(
      nome.value.trim() ? "" : "Informe o nome do conjunto."
    );

    // Remove possíveis erros anteriores.
    arquivo.setCustomValidity("");

    const selecionado = arquivo.files[0];

    if (selecionado) {
      if (!selecionado.name.toLowerCase().endsWith(".csv")) {
        arquivo.setCustomValidity(
          "Selecione um arquivo com extensão .csv."
        );
      } else if (selecionado.size === 0) {
        arquivo.setCustomValidity(
          "O arquivo está vazio. Selecione um CSV com dados."
        );
      }
    }

    // O required do HTML verifica estação, variável
    // e ausência de arquivo.
    // Esta função não verifica o conteúdo interno do CSV.
  }

  prepararFormulario(
    formulario,
    validarConjunto,
    "Formulário válido. O arquivo não foi enviado nem processado nesta etapa."
  );
}

function iniciarEtapa04() {
  iniciarPesquisa();
  iniciarCadastro();
  iniciarNovoConjunto();
}

// Aguarda o HTML estar disponível antes de acessar os elementos.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarEtapa04);
} else {
  iniciarEtapa04();
}