const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PAGES_PATH = path.resolve(__dirname, './src/templates/pages');
const BUILD_PATH = path.resolve(__dirname, './build');
const APP_PATH = fs.realpathSync(process.cwd());
const IMAGE_INLINE_SIZE_LIMIT = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT, 10) || 8192;

function pagesList(pagesPath = path.resolve(APP_PATH, PAGES_PATH), filePaths = [])
{
  const pages = fs.readdirSync(pagesPath);

  pages.forEach((page) => {
    const filePath = `${pagesPath}/${page}`;
    const fsStat = fs.statSync(filePath);

    if(fsStat.isDirectory()) {
      pagesList(filePath, filePaths);
    } else if(fsStat.isFile() && /\.ejs/.test(filePath)) {
      filePaths.push(
        `${path.parse(filePath).dir}/${path.parse(filePath).name}`
      );
    }
  });

  return filePaths;
}

function addHtmlPlugin(pages) {
  const result = pages.map((page) => {
    const generateHtmlPages = new HtmlWebpackPlugin({
      filename: `${page.replace(PAGES_PATH, BUILD_PATH)}.html`,
      template: `${page}.ejs`,
      minify: {
        collapseWhitespace: false,
        removeComments: false,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: false,
        useShortDoctype: false
      }
    });

    return generateHtmlPages;
  });

  return result;
}

module.exports = (env, args) => {
  return {
    entry: path.resolve(__dirname, './src/main.ts'),
    output: {
      path: BUILD_PATH,
      filename: 'script/main.js'
    },
    devtool: args.mode === 'development' && 'source-map',
    resolve: {
      extensions: ['.js', '.ts']
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: {
                  caseSensitive: true,
                  collapseWhitespace: false,
                  conservativeCollapse: true,
                  keepClosingSlash: true,
                  minifyCSS: false,
                  minifyJS: false,
                  removeComments: true,
                  removeRedundantAttributes: true,
                  removeScriptTypeAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                }
              }
            },
            'template-ejs-loader'
          ]
        },
        {
          test: /\.s?(c|a)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    autoprefixer({
                      overrideBrowserslist: ['ie >= 8', 'last 4 version']
                    })
                  ]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.[tj]sx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            },
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|bmp|svg|ico)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: IMAGE_INLINE_SIZE_LIMIT,
            },
          },
          generator: {
            filename: 'image/[name].[contenthash:8][ext]',
          },
        },
        {
          test: /\.(eot|ttf|woff2?)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[contenthash:8][ext]',
          },
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
    ].concat(addHtmlPlugin(pagesList())),
  };
}