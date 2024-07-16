import { merge } from "webpack-merge"; // Importa la función merge de webpack-merge
import common from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from "dotenv-webpack";

// Mezclamos con la configuración common
export default merge(common, {
	// Define el modo de desarrollo
	mode: "production",
	// Configuración para generar carpetas de salida
	output: {
		filename: "js/[name].[chunkhash].js",
		assetModuleFilename: "images/[hash][ext][query]",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					// Utilizamos MiniCssExtractPlugin.loader para extraer CSS a archivos separados
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							// Configuración CSS Modules
							modules: {
								exportLocalsConvention: "camelCase",
								localIdentName: "[path][name]__[local]--[hash:base64:5]",
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Nombre del archivo de salida, usando nombre, hash y agrupando en carpeta css
			filename: "css/[name].[chunkhash].css",
			chunkFilename: "[id].css",
		}),
		new Dotenv({
			path: "./prod.env",
		}),
	],
	// Agrupa los vendors en diferentes ficheros
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: "all",
					name: (module) => {
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)?.[1];
						return packageName ? `vendor/${packageName.replace("@", "")}` : null;
					},
					test: /[\\/]node_modules[\\/]/,
					enforce: true,
				},
			},
		},
	},
});
