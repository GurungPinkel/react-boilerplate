const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const isProduction = process.env.NODE_ENV === 'PRODUCTION';

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
          {
            test: /\.(tsx|mjs|jsx|ts|js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
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
          },
          {
            test: /\.(woff(2)?|eot|ttf|otf)$/,
            type: 'asset',
            generator: {
              filename: 'static/fonts/[name][ext]'
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
};
