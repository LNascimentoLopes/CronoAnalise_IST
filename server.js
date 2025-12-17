require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// -----------  REGISTRO  -----------
app.post("/register", (req, res) => {
    const { usuario, email, senha } = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err });

        const sql = "INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)";
        db.query(sql, [usuario, email, hash], (err) => {
            if (err) return res.status(400).json({ error: err.sqlMessage });
            res.json({ message: "Usuário registrado com sucesso!" });
        });
    });
});

// -----------  LOGIN  -----------
app.post("/login", (req, res) => {
    const { usuario, senha } = req.body;

    db.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario], (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        if (rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

        const user = rows[0];

        bcrypt.compare(senha, user.senha, (err, ok) => {
            if (!ok) return res.status(401).json({ error: "Senha incorreta" });

            // cria token
            const token = jwt.sign(
                { id: user.id, usuario: user.usuario },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.json({ message: "Logado!", token, usuario: user.usuario });
        });
    });
});

// ----------- VERIFICAR TOKEN (opcional) -----------
app.get("/verify", (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.json({ logged: false });

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.json({ logged: false });
        res.json({ logged: true, usuario: data.usuario });
    });
});

app.listen(16908, () => console.log("Servidor rodando na porta 16908"));
