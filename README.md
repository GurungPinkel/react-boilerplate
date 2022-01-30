# react-boilerplate
Production quality custom REACT application using webpack5

## How to use


## Features


## Upcomming features



## Steps to recreate this project.
The steps have been broken down in multiple phases to add support for different features.

## Phase 1
In Phase 1, We set up only the bare essentials for webpack, typescript and react.

1. Initalize package.json

            ```npm init --y```

---

---

1. Add packages (react / typescript/ webpack) 
    ```@babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @types/node @types/react @types/react-dom babel-loader copy-webpack-plugin html-webpack-plugin terser-webpack-plugin typescript webpack webpack-cli webpack-dev-server webpack-merge```

    ```npm i react react-dom```

1. Create `.babelrc` file with the following content

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

1. Set up Typescript

    ```./node_modules/typescript/bin/tsc --init```

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
1. Create the following files and edit as needed:

    * [public/index.html](./public/index.html)
    * [public/favicon.ico](./public/favicon.ico)
    * [public/manifest.json](./public/manifest.json)
    * [public/robots.txt](./public/robots.txt)


1. Create simple react components:
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
    1.  [src/App.tsx](./src/App.tsx)
        ```
            const App = ():JSX.Element => {
                return (
                    <>
                        React Boilerplate 
                    </>
                )
            }

            export {App}
        ```

1. Create local and common webpack config for development:
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
        ],
        output: {
            path: path.resolve(__dirname, '..', './dist'),
            publicPath: '/',
            filename: 'bundle.[contenthash:8].js'
        }
        };

        module.exports = merge(commonConfig, localConfig);

        ```