# cadastro-de-livro
## Técnologias usadas
Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Docker
## Instalando Dependências
> Backend
```bash
cd cadastro-de-livro
npm install
npm start
``` 
## Executando aplicação
* Para rodar o back-end vá em seu terminal:
  ```bash
  docker run -p 3306:3306 --name ph_mysql -e MYSQL_ROOT_PASSWORD=sua_senha -d mysql:5.7
  docker container start ph_mysql
  *A aplicação estará rodando na porta 3000: http://localhost:3000/ do navegador
  ```
