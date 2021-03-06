# react-boilerplate

Custom REACT application using webpack5

# Features

This project is intended to serve as a boilerplate when creating a new react-application. Currently this project provide the following tools/features:

1. TypeScript
1. dotenv
1. webpack
   1. optimized for production build
1. eslint
1. prettier
1. lint-staged

# Upcomming features

1. N/A

# Steps to recreate this project.

The steps have been broken down in multiple phases to add support for different features.

## Phase 1

In Phase 1, We set up only the bare essentials for webpack, typescript and react.

1.  Initalize package.json

    `npm init --y`

1.  Add packages (react / typescript/ webpack)

    ```
    npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/node @types/react @types/react-dom babel-loader copy-webpack-plugin html-webpack-plugin terser-webpack-plugin typescript webpack webpack-cli webpack-dev-server webpack-merge
    ```

    ```
    npm i react react-dom
    ```

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
        "lib": [
            "dom",
            "dom.iterable",
            "esnext"
        ],
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

## Phase 3

1. Add webpack support for dotenv

   1. Create 3 different dotenv files.
      1. .env.production - Used for production environment
      2. .env.development - Used for dev environment
      3. .env.development.local - Used for local development. Do not commit to git. Add this file in .gitignore
   1. Install dotenv

      `npm i dotenv`

   1. Update [webpack/local.js](./webpack/local.js)

      1. Add the following:

         ```
             const dotenv = require('dotenv');
         ```

         ```
             const env = dotenv.config( {
             path: path.join(__dirname, '..', '.env.development.local')
             } ).parsed;

             const envKeys = Object.keys(env).reduce((prev, next) => {
             // eslint-disable-next-line no-param-reassign
             prev[`process.env.${next}`] = JSON.stringify(env[next])

             return prev
             }, {})
         ```

         ```
             plugins: [
                 .....
                 ...
                 new webpack.DefinePlugin(envKeys)
             ]
         ```

## Phase 4

1. Add support for types which are not supported by default.

   1. Create a file [src/declarations.d.ts](./src/declarations.d.ts)

1. Add webpack loaders for:

   1. images : Add the following in [webpack/common.js](./webpack/common.js):

      ```
      module: {
          rules: [
          {
              oneOf: [
              ....
              ...
              .
                  {
                      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                      type: 'asset',
                      parser: {
                        dataUrlCondition: {
                            maxSize: 5 * 1024 // Images less than 5kb will be inline
                        }
                    },
                      generator: {
                      filename: 'static/images/[name].[hash:8][ext]'
                      }
                  },
                  {
                      test: /\.svg/,
                      type: 'asset/inline'
                  },
              ]
          }
          ]
      }
      ```

   1. css, scss, css modules:

      1. Add the following dependencies:

         `npm i -D mini-css-extract-plugin style-loader css-loader postcss-loader postcss-flexbugs-fixes postcss-preset-env autoprefixer postcss-normalize resolve-url-loader sass-loader node-sass`

      1. Add the following in [webpack/common.js](./webpack/common.js):

      ```
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        const postcssNormalize = require('postcss-normalize');

        const cssRegex = /\.css$/;
        const cssModuleRegex = /\.module\.css$/;
        const sassRegex = /\.(scss|sass)$/;
        const sassModuleRegex = /\.module\.(scss|sass)$/;
        const isProduction = process.env.NODE_ENV === 'PRODUCTION';
      ```

      ```
        module: {
            rules: [
            {
                oneOf: [
                ....
                ...
                .
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                            importLoaders: 1,
                            sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                            postcssOptions: {
                                plugins: [
                                ['postcss-flexbugs-fixes'],
                                [
                                    'postcss-preset-env',
                                    {
                                    autoprefixer: {
                                        flexbox: 'no-2009'
                                    },
                                    stage: 3
                                    }
                                ],
                                postcssNormalize()
                                ]
                            },
                            sourceMap: isProduction
                            }
                        }
                        ],
                        // Don't consider CSS imports dead code even if the
                        // containing package claims to have no side effects.
                        // Remove this when webpack adds a warning or an error for this.
                        // See https://github.com/webpack/webpack/issues/6571
                        sideEffects: true
                    },
                    {
                        test: cssModuleRegex,
                        use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                            importLoaders: 1,
                            sourceMap: isProduction,
                            modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                            postcssOptions: {
                                plugins: [
                                ['postcss-flexbugs-fixes'],
                                [
                                    'postcss-preset-env',
                                    {
                                    autoprefixer: {
                                        flexbox: 'no-2009'
                                    },
                                    stage: 3
                                    }
                                ],
                                postcssNormalize()
                                ]
                            },
                            sourceMap: isProduction
                            }
                        }
                        ]
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                            importLoaders: 2,
                            sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                            postcssOptions: {
                                plugins: [
                                ['postcss-flexbugs-fixes'],
                                [
                                    'postcss-preset-env',
                                    {
                                    autoprefixer: {
                                        flexbox: 'no-2009'
                                    },
                                    stage: 3
                                    }
                                ],
                                postcssNormalize()
                                ]
                            },
                            sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                            sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                            sourceMap: true
                            }
                        }
                        ],
                        // Don't consider CSS imports dead code even if the
                        // containing package claims to have no side effects.
                        // Remove this when webpack adds a warning or an error for this.
                        // See https://github.com/webpack/webpack/issues/6571
                        sideEffects: true
                    },
                    {
                        test: sassModuleRegex,
                        use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                            importLoaders: 3,
                            sourceMap: isProduction,
                            modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                            postcssOptions: {
                                plugins: [
                                ['postcss-flexbugs-fixes'],
                                [
                                    'postcss-preset-env',
                                    {
                                    autoprefixer: {
                                        flexbox: 'no-2009'
                                    },
                                    stage: 3
                                    }
                                ],
                                postcssNormalize()
                                ]
                            },
                            sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                            sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                            sourceMap: true
                            }
                        }
                        ]
                    }
                ]
            }
            ]
        }
      ```

   1. Fonts: Add the following in [webpack/common.js](./webpack/common.js)

      ```
      module: {
        rules: [
            {
                oneOf: [
                    ....
                    ...
                    .
                    {
                        test: /\.(woff(2)?|eot|ttf|otf)$/,
                        type: 'asset/resource',
                        generator: {
                        filename: 'static/fonts/[name][ext]'
                        }
                    }
                ]
            }
        ]
      }

      ```

## Phase 5

Add support for webpack production config and docker.

1. Install the following dependencies:

   `npm i -D css-minimizer-webpack-plugin postcss-safe-parser webpack-bundle-analyzer postcss-safe-parser`

1. create a file [webpack.production.js](./webpack/production.js)

1. update script section in [package.json](./package.json)

   ```
   "scripts": {
       ....
       ..
       "start": "NODE_ENV=development webpack serve --config webpack/local.js",
       "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
       "lint:fix": "npm run lint -- --fix",
       "prettier": "prettier --write .",
       "prepare": "husky install",
       "build": "NODE_ENV=PRODUCTION webpack --config webpack/production.js",
       "analyze": "webpack-bundle-analyzer --port 8888 dist/stats.json",
   },
   ```

1. Create [Dockerfile](./Dockerfile) file
1. Create [docker-compose.yml](./docker-compose.yml) file
1. update [package.json](./package.json) script section to include the following:
   ```
    scripts{
        ....
        ..
        "docker:build": "docker-compose up --build",
        "docker": "docker-compose up"
    }
   ```
