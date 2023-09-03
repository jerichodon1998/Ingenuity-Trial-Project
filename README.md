# How to run the project

yarn version - 1.22.19

create .env file in the root DIR and input this:
VITE_API_KEY=AIzaSyBDubLHo0AOzo3iMYf_G9lByh9F9thqSzY
VITE_AUTH_DOMAIN=inguenity-trial.firebaseapp.com
VITE_PROJECT_ID=inguenity-trial
VITE_STORAGE_BUCKET=inguenity-trial.appspot.com
VITE_MESSENGING_SENDER_ID=551720848624
VITE_APP_ID=1:551720848624:web:ddc15e91dbb1a3d3b54635
VITE_MEASUREMENT_ID=G-1F73ELBVV0
VITE_TotalUserIdRef=g1Z5ZqKtNCJ2JsNUSgdi

Install dependencies run:
yarn add
OR
npm install

Run the project:
yarn dev
OR
npm run dev

# Tech Stack

- React+Vite with Firebase

# Admin account

email: mark@email.com
pass: 123123

# Objective

You will be creating a project for adding, viewing, and managing recipes. This project can be created on any development side being focused-on (backend, web, mobile, or even full-stack). Feel free to utilize any kind of programming language/framework at your disposal, unless a specific request is indicated in the email. The following sections will provide details about the expected requirements for this project.

As an admin

- Can view the admin dashboard
- Can view the list of all recipes
- Can add a recipe
- Can edit any of the recipes
- Can delete any of the recipes
- Can view and use the recipe dashboard like a basic user

As a user

- Can view the recipe dashboard
- Can view the list of recipes
- Can view the instructions and ingredients of a recipe
- Can add my own recipe with instructions and ingredients
- Can edit my own recipe
- Can delete my own recipe

# Authentication

As an admin

- Can login using my email address and password
- Can logout
  As a user
- Can register for the recipe blog with my email address and password
- Can login using my email address and password
- Can logout

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
