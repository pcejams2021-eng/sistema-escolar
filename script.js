// ===============================
// CONFIGURAÇÃO DA API
// ===============================

const API = "http://localhost:3000";


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const senha =
            document.getElementById("senha").value.trim();

        if (email === "" || senha === "") {
            alert("Preencha todos os campos.");
            return;
        }

        try {

            const resposta = await fetch(
                `${API}/api/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {

                alert(
                    dados.mensagem ||
                    "Erro ao realizar login."
                );

                return;
            }

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(dados.usuario)
            );

            alert("Login realizado com sucesso!");

            window.location.href = "dashboard.html";

        } catch (erro) {

            console.error(erro);

            alert(
                "Não foi possível conectar com a API. " +
                "Verifique se o servidor está funcionando."
            );
        }

    });

}


// ===============================
// SAIR
// ===============================

function sair() {

    localStorage.removeItem("usuarioLogado");

    window.location.href = "index.html";

}


// ===============================
// USUÁRIOS
// ===============================

function novoUsuario() {

    window.location.href = "cadastro-usuario.html";

}


function pesquisarUsuario() {

    const campo =
        document.getElementById("pesquisa");

    if (!campo) return;

    const pesquisa =
        campo.value.toLowerCase();

    const linhas =
        document.querySelectorAll("#tabelaUsuarios tr");

    linhas.forEach(function(linha) {

        const texto =
            linha.textContent.toLowerCase();

        linha.style.display =
            texto.includes(pesquisa)
                ? ""
                : "none";

    });

}


// ===============================
// CADASTRO DE USUÁRIO
// ===============================

const cadastroForm =
    document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const nome =
                document.getElementById("nome").value.trim();

            const email =
                document.getElementById("emailUsuario").value.trim();

            const cpf =
                document.getElementById("cpf").value.trim();

            const telefone =
                document.getElementById("telefone").value.trim();

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


            if (!nome || !email || !senha) {

                alert(
                    "Nome, e-mail e senha são obrigatórios."
                );

                return;

            }


            try {

                const resposta = await fetch(
                    `${API}/api/usuarios`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            nome: nome,
                            email: email,
                            senha: senha

                        })

                    }
                );


                const dados =
                    await resposta.json();


                if (!resposta.ok) {

                    alert(
                        dados.mensagem ||
                        "Não foi possível cadastrar o usuário."
                    );

                    return;

                }


                const usuario = {

                    id: dados.id,

                    nome: nome,

                    email: email,

                    cpf: cpf,

                    telefone: telefone,

                    perfil: perfil,

                    escola: escola

                };


                let usuarios =
                    JSON.parse(
                        localStorage.getItem("usuarios")
                    ) || [];


                usuarios.push(usuario);


                localStorage.setItem(
                    "usuarios",
                    JSON.stringify(usuarios)
                );


                alert(
                    dados.mensagem ||
                    "Usuário cadastrado com sucesso!"
                );


                window.location.href =
                    "usuarios.html";


            } catch (erro) {

                console.error(erro);

                alert(
                    "Não foi possível conectar com a API."
                );

            }

        }
    );

}


// ===============================
// VOLTAR PARA USUÁRIOS
// ===============================

function voltarUsuarios() {

    window.location.href =
        "usuarios.html";

}


// ===============================
// ESCOLAS
// ===============================

function novaEscola() {

    window.location.href =
        "cadastro-escola.html";

}


function voltarEscolas() {

    window.location.href =
        "escolas.html";

}


// ===============================
// CADASTRO DE ESCOLA
// ===============================

const cadastroEscolaForm =
    document.getElementById(
        "cadastroEscolaForm"
    );


if (cadastroEscolaForm) {

    cadastroEscolaForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const nome =
                document.getElementById(
                    "nomeEscola"
                ).value.trim();


            const codigo =
                document.getElementById(
                    "codigoEscola"
                ).value.trim();


            const endereco =
                document.getElementById(
                    "enderecoEscola"
                ).value.trim();


            const telefone =
                document.getElementById(
                    "telefoneEscola"
                ).value.trim();


            const diretor =
                document.getElementById(
                    "diretorEscola"
                ).value.trim();


            const status =
                document.getElementById(
                    "statusEscola"
                ).value;


            if (!nome) {

                alert(
                    "Digite o nome da escola."
                );

                return;

            }


            try {

                const resposta =
                    await fetch(
                        `${API}/api/escolas`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                nome: nome,

                                cidade:
                                    endereco ||
                                    "Não informado"

                            })

                        }
                    );


                const dados =
                    await resposta.json();


                if (!resposta.ok) {

                    alert(
                        dados.mensagem ||
                        "Não foi possível cadastrar a escola."
                    );

                    return;

                }


                const escola = {

                    id: dados.id,

                    nome: nome,

                    codigo: codigo,

                    endereco: endereco,

                    telefone: telefone,

                    diretor: diretor,

                    status: status

                };


                let escolas =
                    JSON.parse(
                        localStorage.getItem(
                            "escolas"
                        )
                    ) || [];


                escolas.push(escola);


                localStorage.setItem(
                    "escolas",
                    JSON.stringify(escolas)
                );


                alert(
                    dados.mensagem ||
                    "Escola cadastrada com sucesso!"
                );


                window.location.href =
                    "escolas.html";


            } catch (erro) {

                console.error(erro);

                alert(
                    "Não foi possível conectar com a API."
                );

            }

        }
    );

}


// ===============================
// PESQUISA DE ESCOLAS
// ===============================

function pesquisarEscola() {

    const campo =
        document.getElementById(
            "pesquisaEscola"
        );


    if (!campo) return;


    const pesquisa =
        campo.value.toLowerCase();


    const linhas =
        document.querySelectorAll(
            "#tabelaEscolas tr"
        );


    linhas.forEach(function(linha) {

        const texto =
            linha.textContent.toLowerCase();


        linha.style.display =
            texto.includes(pesquisa)
                ? ""
                : "none";

    });

}


// ===============================
// CONFIGURAÇÕES
// ===============================

function salvarConfiguracoes() {

    const nome =
        document.getElementById(
            "nomeSistema"
        ).value;


    const email =
        document.getElementById(
            "emailSistema"
        ).value;


    const tema =
        document.getElementById(
            "temaSistema"
        ).value;


    const notificacoes =
        document.getElementById(
            "notificacoes"
        ).value;


    if (nome === "") {

        alert(
            "Digite o nome do sistema."
        );

        return;

    }


    if (email === "") {

        alert(
            "Digite o e-mail administrativo."
        );

        return;

    }


    const configuracoes = {

        nome: nome,

        email: email,

        tema: tema,

        notificacoes: notificacoes

    };


    localStorage.setItem(
        "configuracoes",
        JSON.stringify(configuracoes)
    );


    alert(
        "Configurações salvas com sucesso!"
    );

}


// ===============================
// RELATÓRIOS
// ===============================

function gerarRelatorio() {

    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


    const escolas =
        JSON.parse(
            localStorage.getItem("escolas")
        ) || [];


    const usuariosAtivos =
        usuarios.length;


    const escolasAtivas =
        escolas.filter(
            function(escola) {

                return escola.status &&
                    escola.status.toLowerCase() ===
                    "ativa";

            }
        ).length;


    alert(

        "Relatório gerado com sucesso!\n\n" +

        "Total de Usuários: " +
        usuarios.length +

        "\nTotal de Escolas: " +
        escolas.length +

        "\nUsuários Ativos: " +
        usuariosAtivos +

        "\nEscolas Ativas: " +
        escolasAtivas

    );

}