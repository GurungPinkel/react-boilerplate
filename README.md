# react-boilerplate

Production quality custom REACT application using webpack5

## How to use

## Features

## Upcomming features

## Steps to recreate this project.

The steps have been broken down in multiple phases to add support for different features.

## Phase 1

In Phase 1, We set up only the bare essentials for webpack, typescript and react.

1.  Initalize package.json

            ```npm init --y```

1.  Add packages (react / typescript/ webpack)
    `@babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/node @types/react @types/react-dom babel-loader copy-webpack-plugin html-webpack-plugin terser-webpack-plugin typescript webpack webpack-cli webpack-dev-server webpack-merge`

    `npm i react react-dom`

1.  Create `.babelrc` file with the following content

    ```
    {
        "presets": [
        "@babel/preset-env",
        [
            "@babel/preset-react",
            {
            "runtime": "automatic"
            }
        ],
        "@babel/preset-typescript"
        ]
    }

    ```

1.  Set up Typescript

    `./node_modules/typescript/bin/tsc --init`

    Update tsconfig to match below or use your own desired configuration:

    ```
    "compilerOptions": {
        "target": "es2016",
        "jsx": "react-jsx",
        "module": "commonjs",
        "resolveJsonModule": true,
        "noEmit": true,
        "isolatedModules": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    },
    "include": [
        "src"
    ],
    "exclude": [
        "node_modues"
    ]
    ```

1.  Create the following files and edit as needed:

    - [public/index.html](./public/index.html)
    - [public/favicon.ico](./public/favicon.ico)
    - [public/manifest.json](./public/manifest.json)
    - [public/robots.txt](./public/robots.txt)

1.  Create simple react components:

    1. [src/index.tsx](./scr/index.tsx)

       ```
           import React from 'react';
           import ReactDOM from 'react-dom';
           import { App } from './App';

           ReactDOM.render(
           <React.StrictMode>
               <App />
           </React.StrictMode>,
           document.getElementById('root')
           );


       ```

    1. [src/App.tsx](./src/App.tsx)

       ```
           const App = ():JSX.Element => (
               <>
                   React Boilerplate
               </>
           )

           export {App}
       ```

1.  Create local and common webpack config for development:

    1. [webpack/common.js](./webpack/common.js)

       ```
           const path = require('path');
           const CopyWebpackPlugin = require('copy-webpack-plugin');

           module.exports = {
               entry: path.resolve(__dirname, '..', './src/index.tsx'),
               resolve: {
               extensions: ['.tsx', '.ts', '.js']
               },
               module: {
                   rules: [
                   {
                       oneOf: [
                           {
                               test: /\.(tsx|mjs|jsx|ts|js)$/,
                               exclude: /node_modules/,
                               use: {
                               loader: "babel-loader"
                               }
                           }
                       ]
                   }
               ]
               },
               plugins: [
                   new CopyWebpackPlugin({
                   patterns: [
                       {
                       from: path.resolve(__dirname, '../public'),
                       globOptions: {
                           ignore: ['**/*.html']
                       },
                       to: './'
                       }
                   ]
                   })
               ]
           }
       ```

    1. [webpack/local.js](./webpack/local.js)

       ```
       const { merge } = require('webpack-merge');
       const HtmlWebpackPlugin = require('html-webpack-plugin');
       const path = require('path');
       const commonConfig = require('./common');

       const localConfig = {
           mode: 'development',
           devtool: 'source-map',
           devServer: {
               open: true,
               port: 5000,
               liveReload: true,
               hot: true,
               http2: true,
               historyApiFallback: true // support for react-router
           },
           plugins: [
               new HtmlWebpackPlugin({
               template: path.resolve(__dirname, '..', './public/index.html')
               })
           ]
       };

       module.exports = merge(commonConfig, localConfig);

       ```

## Phase 2

In Phase 2, We will add and configure prettier, eslint(airbnb) and lint-staged.

1. Install and configure prettier

   1. Install prettier dependencies
      `npm i -D prettier eslint-config-prettier`
   1. Create [.prettierrc.json](.prettierrc.json) file
   1. Create [.prettierignore][.prettierignore] file

1. Install and configure eslint

   1. Install eslint dependencies

      ```
      npm init @eslint/config
      How would you like to use ESLint? -> To check syntax, find problems, and enforce code style
      What type of modules does your project use? -> JavaScript modules (import/export)
      Which framework does your project use? -> React
      Does your project use TypeScript? -> Yes
      Where does your code run? -> Browser
      How would you like to define a style for your project? -> Use a popular style guide
      Which style guide do you want to follow? -> Airbnb
      What format do you want your config file to be in? -> JavaScript
      Would you like to install them now with npm? -> Yes
      ```

   1. Update [eslint](./.eslintrc.js) to include prettier

      ```
          module.exports = {
              env: {
                  browser: true,
                  es2021: true,
                  jest: true
              },
              extends: [
                  'plugin:react/recommended',
                  'airbnb',
                  'prettier'
              ],
              parser: '@typescript-eslint/parser',
              parserOptions: {
                  ecmaFeatures: {
                  jsx: true,
                  },
                  ecmaVersion: 'latest',
                  sourceType: 'module',
              },
              settings: {
                  react: { version: 'detect' },
                  'import/resolver': {
                  node: {
                      extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
                  }
                  }
              },
              plugins: [
                  'react',
                  '@typescript-eslint',
                  'react-hooks'
              ],
              rules: {
                  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
                  // https://reactjs.org/docs/hooks-rules.html#eslint-plugin
                  'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
                  'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
                  // note you must disable the base rule as it can report incorrect errors. (https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use)
                  'no-use-before-define': 'off',
                  // allow jsx in tsx.
                  'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
                  // eslint airbnb requires file extension
                  'import/extensions': [
                  'error',
                  'ignorePackages',
                  {
                      js: 'never',
                      jsx: 'never',
                      ts: 'never',
                      tsx: 'never'
                  }
                  ],
                  // https://github.com/microsoft/TypeScript/issues/41882#issuecomment-849849503
                  'react/jsx-uses-react': 'off',
                  'react/react-in-jsx-scope': 'off',
                  'import/prefer-default-export': 'off',
                  // use @typescript-eslint/no-unused-vars instead of no-unused-vars
                  'no-unused-vars': 'off',
                  '@typescript-eslint/no-unused-vars': ['error'],
                  // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
                  'no-shadow': 'off',
                  '@typescript-eslint/no-shadow': ['error'],
                  'no-undef': 'off',
                  'react/function-component-definition': [
                  'error',
                  {
                      namedComponents: 'arrow-function',
                      unnamedComponents: 'arrow-function'
                  }
                  ],
                  curly: ['error', 'all'],
                  'padding-line-between-statements': [
                  'error',
                  { blankLine: 'always', prev: 'block-like', next: 'block-like' },
                  { blankLine: 'always', prev: '*', next: 'return' },
                  { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
                  { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                  { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
                  ]
              },
          };

      ```

   1. Create [.eslintignore](./.eslintignore) file

1. Install and configure lint-staged

   1. Install dependencies:

      `npx mrm@2 lint-staged`

   1. Update `lint-staged` Object in package.json to below:

      ```
          "lint-staged": {
              "*.{js,jsx,ts,tsx}": "eslint --cache --fix",
              "*.{js,jsx,ts,tsx,css,scss,md}": "prettier --write"
          }
      ```
