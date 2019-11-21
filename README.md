### BOTICARIO API

# Run

Para iniciar esta aplicação é necessário:

    - Configurar uma base de dados (MYSQL);
    - Editar o arquivo `ormconfig.json` adicionando as suas credencias do banco;
    - Criar o arquivo .env  `cp .env.example .env`
    - No arquivo `.env` adicionar um valor para a variável `SECRET_KEY`
    - Por fim, executar `npm start`


# Rotas

    - GET `/orders`
    - GET `/orders/id`
    - POST `/orders`
    - PUT `/orders/id`
    - DELETE `/orders/id`
    - POST `/orders/approved/:id`
    - POST `/orders/refused/:id`

    - GET `/users`
    - POST `/users`

    - POST `/login`

# Regras

Algumas regras que se faz necessário compreender:

    - Enquanto uma compra está "Em avaliação" não é possível adicionar novas compras. 
    - O cashback é aplicado em cima de créditos oriundos de compras aprovadas;
    - Para compras recusadas, o valor do credit gerado não é aplicado em compras futuras e, caso um débito tenha sido registrado, o mesmo não é mais válido.
    - Para manter histórico dos cashbacks, as tabelas `cashbacks` e `orders` usam o conceito de soft delete: os dados são removidos de forma lógica e não física, assim o registro permance no banco de dados;