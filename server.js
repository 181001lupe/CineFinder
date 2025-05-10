require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const porta = 3000
app.use(express.static('public'))

app.get('/filme', async (req, res) => {
    const {titulo} = req.query

    if(!titulo) {
        return res.status(400).json({error: "Por favor, informe título do filme"})
    }
    try {
        const resposta = await axios.get('http://www.omdbapi.com/', {
            params: {
                t: titulo,
                apiKey: process.env.OMDB_API_KEY
            }
        })

        const filme = resposta.data

        if (filme.Response === "False") {
            return res.status(404).json({error: "Filme ão encontrado"})
        }
        res.json ({
            titulo: filme.Title,
            ano: filme.Year,
            diretor: filme.Director,
            genero: filme.Genre,
            enredo: filme.Plot,
            poster: filme.Poster,
            duracao: filme.Runtime
        })
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar filme"})
    }
})

app.listen(porta, () => {
    console.log("Servidor rodando na porta 3000")
})