document.querySelector('#buscar').addEventListener('click', async (e) => {
    e.preventDefault()
    const titulo = document.querySelector('#titulo').value

    if(!titulo) {
        alert("Por favor, digite o título do filme!")
        return
    }
    try {
        const resposta = await axios.get('/filme', {
            params: {titulo}
        })
        const dados = resposta.data
        console.log(dados)

        const div = document.querySelector("#resultado")
        div.innerHTML = `<div class='card-filme'>
                        <h2>${dados.titulo}</h2>
                        <img src="${dados.poster}" alt = "Pôster de ${dados.titulo}">
                        <p><b>Ano:</b> ${dados.ano}</p>
                        <p><b>Diretor:</b> ${dados.diretor}</p>
                        <p><b>Gênero:</b> ${dados.genero}</p><p><b>Duração:</b> ${dados.duracao}</p>
                        </div>`
    } catch(error) {
        alert("Erro ao buscar o filme. Verifique o nome e tente novamente")
    }

})