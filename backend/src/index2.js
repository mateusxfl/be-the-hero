const express = require('express'); 

const app = express();

app.use(express.json()); // Informa pro express que as requisições serão enviadas em JSON;

/*
    Rota - URL completa
    Recurso - Em grande parte, uma identidade que queremos buscar na URL

    Abrir console: Ctrl + '
*/

/**
 * Metodos HTTP:
 * 
 * GET: Listar uma informação do back-end.
 * POST: Criar uma informação no back-end.
 * PUT: Alterar uma informação no back-end.
 * DELETE: Deletar uma informação no back-end.
 */

/**
 * Tipos de PARAMETROS:
 * 
 * Query Params: Parametros NOMEADAS enviados na rota apos o simbolo de ?, normalmente
 * servem para filtros, paginação.
 * 
 * Route Params: Parametros não NOMEADOSutilizados para identificar 
 * recursos (users/:id), quer dizer que queremos buscar um usuario pelo
 * id ~> (users/1)
 * 
 * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
 * ex: criar ou alterar usuário.
 */

 /**
  * Request: Guarda todos os dados que vieram por meio da requisição.
  * 
  * Response: Responsavel por retornar uma resposta para o usuário.
  */

  /**
   * Bancos de dados: SQLite
   * 
   * Driver: SELECT * FROM users
   * Query Builder: table('user).select('*').where(), se adapta a diferentes bancos
   * 
   */

app.post('/users', (request, response) => {
    // const params = request.query; // Acessa todos os parametros que vem atraves do querys.
    
    // const params = request.params; // Acessa o parametro que vem atraves do URL

    const body = request.body;

    // console.log(params);

    console.log(body);

    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Mateus Fonseca Lima',
        professor: 'Diego Fernandes',
    });
});

app.listen(3333); 

// Executar a aplicação no terminal do VS code com: node index.js

