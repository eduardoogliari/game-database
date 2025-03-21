## Objetivo
- Um simples website para aprender sobre Docker, React, Express.js, SQL, REST e HTML/CSS/Javascript. 

## Descrição
- GameDB é um website que lista informações sobre os seus jogos favoritos.
- Informações de jogos consistem de: capa, nome, data de lançamento, plataformas, desenvolvedoras, publicadoras e gêneros.
- Existem três contêineres: `web` para a API REST, `db` para armazenar os dados dos jogos e `frontend` para hospedar o website.

## Como rodar
- Execute os comandos `docker compose build` seguido por `docker compose up` na pasta raíz
- Por padrão, o website ficará acessível no endereço http://localhost:8080

## Considerações
- Como é um website criado para fins de aprendizado, a senha e usuário do banco de dados estão inclusas no arquivo Docker Compose por conveniência.
