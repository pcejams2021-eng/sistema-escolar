const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./database");

const app = express();
const PORTA = 3000;

// =====================================
// CONFIGURAÇÕES
// =====================================

app.use(cors());
app.use(express.json());

// =====================================
// ARQUIVOS DO SISTEMA
// =====================================

const pastaSistema = path.join(__dirname, "..");

app.use(express.static(pastaSistema));

// =====================================
// PÁGINA INICIAL
// =====================================

app.get("/", (req, res) => {
    res.sendFile(path.join(pastaSistema, "index.html"));
});

// =====================================
// USUÁRIOS - LISTAR
// =====================================

app.get("/api/usuarios", (req, res) => {

    try {

        const usuarios = db.prepare(`
            SELECT id, nome, email
            FROM usuarios
            ORDER BY id
        `).all();

        res.json(usuarios);

    } catch (erro) {

        console.error("Erro ao listar usuários:", erro);

        res.status(500).json({
            mensagem: "Erro ao listar usuários.",
            erro: erro.message
        });
    }
});

// =====================================
// USUÁRIOS - CADASTRAR
// =====================================

app.post("/api/usuarios", (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {

        return res.status(400).json({
            mensagem: "Nome, email e senha são obrigatórios."
        });
    }

    try {

        const resultado = db.prepare(`
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `).run(nome, email, senha);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            id: resultado.lastInsertRowid
        });

    } catch (erro) {

        console.error("Erro ao cadastrar usuário:", erro);

        res.status(400).json({
            mensagem: "Não foi possível cadastrar o usuário.",
            erro: erro.message
        });
    }
});

// =====================================
// LOGIN
// =====================================

app.post("/api/login", (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {

        return res.status(400).json({
            mensagem: "Email e senha são obrigatórios."
        });
    }

    try {

        const usuario = db.prepare(`
            SELECT id, nome, email
            FROM usuarios
            WHERE email = ? AND senha = ?
        `).get(email, senha);

        if (!usuario) {

            return res.status(401).json({
                mensagem: "Email ou senha incorretos."
            });
        }

        res.json({
            mensagem: "Login realizado com sucesso!",
            usuario: usuario
        });

    } catch (erro) {

        console.error("Erro no login:", erro);

        res.status(500).json({
            mensagem: "Erro ao realizar login.",
            erro: erro.message
        });
    }
});

// =====================================
// ESCOLAS - LISTAR
// =====================================

app.get("/api/escolas", (req, res) => {

    try {

        const escolas = db.prepare(`
            SELECT id, nome, cidade
            FROM escolas
            ORDER BY id
        `).all();

        res.json(escolas);

    } catch (erro) {

        console.error("Erro ao listar escolas:", erro);

        res.status(500).json({
            mensagem: "Erro ao listar escolas.",
            erro: erro.message
        });
    }
});

// =====================================
// ESCOLAS - CADASTRAR
// =====================================

app.post("/api/escolas", (req, res) => {

    const { nome, cidade } = req.body;

    if (!nome || !cidade) {

        return res.status(400).json({
            mensagem: "Nome e cidade são obrigatórios."
        });
    }

    try {

        const resultado = db.prepare(`
            INSERT INTO escolas (nome, cidade)
            VALUES (?, ?)
        `).run(nome, cidade);

        res.status(201).json({
            mensagem: "Escola cadastrada com sucesso!",
            id: resultado.lastInsertRowid
        });

    } catch (erro) {

        console.error("Erro ao cadastrar escola:", erro);

        res.status(400).json({
            mensagem: "Não foi possível cadastrar a escola.",
            erro: erro.message
        });
    }
});

// =====================================
// INICIAR SERVIDOR
// =====================================

app.listen(PORTA, () => {

    console.log("");
    console.log("=====================================");
    console.log(" SISTEMA ESCOLAR");
    console.log("=====================================");
    console.log(`API funcionando em http://localhost:${PORTA}`);
    console.log(`Sistema em http://localhost:${PORTA}/index.html`);
    console.log("=====================================");
    console.log("");

});