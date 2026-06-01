# API de Autenticação MVC

Projeto resolvido do Módulo 09 com Express, MongoDB, Mongoose, bcryptjs, JWT e organização em camadas.

## O que este exemplo ensina

- Salvar `senhaHash` no banco em vez de senha pura.
- Fazer cadastro e login com bcrypt.
- Gerar token JWT no cadastro e no login.
- Proteger rotas usando middleware de autenticação.
- Separar responsabilidades em `routes`, `controllers`, `services`, `repositories`, `models`, `middlewares` e `config`.
- Preparar o projeto para deploy no Render.

## Como rodar

```bash
npm install
cp .env.example .env
npm start
```

Preencha o `.env` com sua connection string do MongoDB Atlas.

## Rotas

### Cadastro

`POST /api/auth/cadastro`

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "123456"
}
```

Retorna:

```json
{
  "usuario": {
    "_id": "...",
    "nome": "Maria Silva",
    "email": "maria@email.com"
  },
  "token": "..."
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "maria@email.com",
  "senha": "123456"
}
```

### Perfil protegido

`GET /api/usuarios/perfil`

Header:

```txt
Authorization: Bearer TOKEN_AQUI
```

### Atualizar perfil

`PATCH /api/usuarios/perfil`

```json
{
  "nome": "Maria Souza",
  "senha": "novaSenha123"
}
```

### Listar usuários

`GET /api/usuarios`

Rota protegida por JWT.

### Remover minha conta

`DELETE /api/usuarios/perfil`

Rota protegida por JWT.

## Variáveis de ambiente no Render

| Key                  | Value                              |
| -------------------- | ---------------------------------- |
| `MONGO_URI`          | Connection string do MongoDB Atlas |
| `JWT_SECRET`         | Chave grande e secreta             |
| `JWT_EXPIRES_IN`     | `1d`                               |
| `BCRYPT_SALT_ROUNDS` | `10`                               |
| `NODE_ENV`           | `production`                       |

Não configure `PORT` no Render. A plataforma define essa variável automaticamente.

## Checklist de segurança

- O banco guarda `senhaHash`, nunca `senha`.
- O campo `senhaHash` usa `select: false`.
- Login retorna mensagem genérica para email ou senha errados.
- Rotas protegidas exigem `Authorization: Bearer TOKEN`.
- `.env` fica no `.gitignore`.
- `JWT_SECRET` não aparece no código.
