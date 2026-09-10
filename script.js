// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (email === "" || senha === "") {

            alert("Preencha todos os campos.");

            return;
        }

        window.location.href = "dashboard.html";

    });

}


// ===============================
// SAIR
// ===============================

function sair() {

    window.location.href = "index.html";

}


// ===============================
// USUÁRIOS
// ===============================

function novoUsuario() {

    window.location.href = "cadastro-usuario.html";

}


function editarUsuario(nome) {

    alert("Editando o usuário: " + nome);

}


function pesquisarUsuario() {

    const campo = document.getElementById("pesquisa");

    if (!campo) {
        return;
    }

    const pesquisa = campo.value.toLowerCase();

    const linhas =
        document.querySelectorAll("#tabelaUsuarios tr");

    linhas.forEach(function(linha) {

        const texto =
            linha.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {

            linha.style.display = "";

        } else {

            linha.style.display = "none";

        }

    });

}


// ===============================
// CADASTRO DE USUÁRIO
// ===============================

const cadastroForm =
    document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome =
            document.getElementById("nome").value;

        const email =
            document.getElementById("emailUsuario").value;

        const cpf =
            document.getElementById("cpf").value;

        const telefone =
            document.getElementById("telefone").value;

        const perfil =
            document.getElementById("perfil").value;

        const escola =
            document.getElementById("escola").value;

        const senha =
            document.getElementById("senhaUsuario").value;

        const confirmarSenha =
            document.getElementById("confirmarSenha").value;


        if (senha !== confirmarSenha) {

            alert("As senhas não são iguais.");

            return;

        }


        const usuario = {

            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            perfil: perfil,
            escola: escola

        };


        let usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];


        usuarios.push(usuario);


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        alert("Usuário cadastrado com sucesso!");


        window.location.href = "usuarios.html";

    });

}


function voltarUsuarios() {

    window.location.href = "usuarios.html";

}


// ===============================
// ESCOLAS
// ===============================

function novaEscola() {

    window.location.href = "cadastro-escola.html";

}


function voltarEscolas() {

    window.location.href = "escolas.html";

}


// ===============================
// CADASTRO DE ESCOLA
// ===============================

const cadastroEscolaForm =
    document.getElementById("cadastroEscolaForm");

if (cadastroEscolaForm) {

    cadastroEscolaForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const nome =
            document.getElementById("nomeEscola").value;

        const codigo =
            document.getElementById("codigoEscola").value;

        const endereco =
            document.getElementById("enderecoEscola").value;

        const telefone =
            document.getElementById("telefoneEscola").value;

        const diretor =
            document.getElementById("diretorEscola").value;

        const status =
            document.getElementById("statusEscola").value;


        const escola = {

            nome: nome,
            codigo: codigo,
            endereco: endereco,
            telefone: telefone,
            diretor: diretor,
            status: status

        };


        let escolas =
            JSON.parse(localStorage.getItem("escolas")) || [];


        escolas.push(escola);


        localStorage.setItem(
            "escolas",
            JSON.stringify(escolas)
        );


        alert("Escola cadastrada com sucesso!");


        window.location.href = "escolas.html";

    });

}


// ===============================
// PESQUISA DE ESCOLAS
// ===============================

function pesquisarEscola() {

    const campo =
        document.getElementById("pesquisaEscola");

    if (!campo) {
        return;
    }

    const pesquisa =
        campo.value.toLowerCase();

    const linhas =
        document.querySelectorAll("#tabelaEscolas tr");


    linhas.forEach(function(linha) {

        const texto =
            linha.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {

            linha.style.display = "";

        } else {

            linha.style.display = "none";

        }

    });

}


// ===============================
// CONFIGURAÇÕES
// ===============================

function salvarConfiguracoes() {

    const nome =
        document.getElementById("nomeSistema").value;

    const email =
        document.getElementById("emailSistema").value;

    const tema =
        document.getElementById("temaSistema").value;

    const notificacoes =
        document.getElementById("notificacoes").value;


    if (nome === "") {

        alert("Digite o nome do sistema.");

        return;

    }


    if (email === "") {

        alert("Digite o e-mail administrativo.");

        return;

    }


    alert(
        "Configurações salvas com sucesso!\n\n" +
        "Sistema: " + nome +
        "\nE-mail: " + email +
        "\nTema: " + tema +
        "\nNotificações: " + notificacoes
    );

}


// ===============================
// RELATÓRIOS
// ===============================

function gerarRelatorio() {

    alert(
        "Relatório gerado com sucesso!\n\n" +
        "Total de Usuários: 120\n" +
        "Total de Escolas: 15\n" +
        "Usuários Ativos: 112\n" +
        "Escolas Ativas: 14"
    );

}