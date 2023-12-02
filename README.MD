# Documentação da API GymPassStyleAppApi

Bem-vindo à documentação oficial da GymPassStyleAppApi, uma API REST para uma aplicação inspirada em plataformas como GymPass e TotalPass. Esta API foi desenvolvida em Node.js e possui funcionalidades relacionadas a usuários, academias e check-ins. A seguir, você encontrará informações detalhadas sobre os endpoints, parâmetros de requisição, respostas e outras considerações importantes.

## Índice

1. [Autenticação](#autenticação)
   - [Registrar Usuário](#1-registrar-usuário)
   - [Autenticar Usuário](#2-autenticar-usuário)
   - [Renovar Token de Acesso](#3-renovar-token-de-acesso)
   - [Obter Perfil do Usuário](#4-obter-perfil-do-usuário)
2. [Academias](#academias)
   - [Buscar Academias por Nome](#1-buscar-academias-por-nome)
   - [Buscar Academias Próximas](#2-buscar-academias-próximas)
   - [Criar Nova Academia (Apenas para Administradores)](#3-criar-nova-academia-apenas-para-administradores)
3. [Check-ins](#check-ins)
   - [Criar Check-in](#1-criar-check-in)
   - [Validar Check-in (Apenas para Administradores)](#2-validar-check-in-apenas-para-administradores)
   - [Histórico de Check-ins](#3-histórico-de-check-ins)
   - [Métricas de Check-ins](#4-métricas-de-check-ins)

## Autenticação

### 1. Registrar Usuário

- **Método:** `POST`
- **Rota:** `/users/register`
- **Descrição:** Permite que novos usuários se registrem na aplicação.

**Parâmetros da Requisição:**
- `name` (String): Nome do usuário.
- `email` (String): Endereço de e-mail do usuário.
- `password` (String): Senha do usuário (mínimo de 6 caracteres).

**Exemplo de Requisição:**
```json
POST /users/register
{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**
- **Código:** 201 Created
- **Corpo da Resposta:** Nenhum conteúdo no corpo da resposta.

**Respostas de Erro:**
- **Código:** 409 Conflict
  - **Corpo da Resposta:** Indica que o endereço de e-mail já está em uso.
- **Código:** 500 Internal Server Error
  - **Corpo da Resposta:** Mensagem genérica indicando um erro interno do servidor.

### 2. Autenticar Usuário

- **Método:** `POST`
- **Rota:** `/auth/authenticate`
- **Descrição:** Permite que usuários autentiquem-se na aplicação.

**Parâmetros da Requisição:**
- `email` (String): Endereço de e-mail do usuário.
- `password` (String): Senha do usuário (mínimo de 6 caracteres).

**Exemplo de Requisição:**
```json
POST /auth/authenticate
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**
- **Código:** 200 OK
- **Corpo da Resposta:**
  ```json
  {
    "token": "JSON_WEB_TOKEN"
  }
  ```

**Respostas de Erro:**
- **Código:** 400 Bad Request
  - **Corpo da Resposta:** Descrição do erro, por exemplo, se as credenciais fornecidas forem inválidas.
- **Código:** 500 Internal Server Error
  - **Corpo da Resposta:** Mensagem genérica indicando um erro interno do servidor.

### 3. Renovar Token de Acesso

- **Método:** `PATCH`
- **Rota:** `/auth/refresh`
- **Descrição:** Permite a renovação do token de acesso usando um token de atualização (refresh token) previamente obtido.

**Parâmetros da Requisição:**
- Este endpoint utiliza a autenticação JWT com o token de atualização (refresh token) presente nos cookies.

**Exemplo de Requisição:**
```json
PATCH /auth/refresh
```

**Resposta de Sucesso:**
- **Código:** 200 OK
- **Corpo da Resposta:**
  ```json
  {
    "token": "NOVO_JSON_WEB_TOKEN"
  }
  ```

**Respostas de Erro:**
- **Código:** 401 Unauthorized
  - **Corpo da Resposta:** Mensagem indicando que a autenticação falhou ou o token de atualização (refresh token) é inválido.
- **Código:** 500 Internal Server Error
  - **Corpo da Resposta:** Mensagem genérica indicando um erro interno do servidor.

### 4. Obter Perfil do Usuário

- **Método:** `GET`
- **Rota:** `/users/profile`
- **Descrição:** Permite que usuários autenticados obtenham informações do seu próprio perfil.

**Parâmetros da Requisição:**
- Este endpoint utiliza a autenticação JWT, e as informações do usuário são obtidas a partir do token.

**Exemplo de Requisição:**
```json
GET /users/profile
```

**Resposta de Sucesso:**
- **Código:** 200 OK
- **Corpo da Resposta:**
  ```json
  {
    "user": {
      "userId": "UUID",
      "name": "Nome do Usuário",
      "email":
