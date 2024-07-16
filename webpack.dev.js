import { merge } from "webpack-merge"; // Importa la función merge de webpack-merge
import common from "./webpack.common.js";
import path from "path";
import url from "url";
import Dotenv from "dotenv-webpack";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Mezclamos con la configuración common
export default merge(common, {
	// Define el modo de desarrollo
	mode: "development",
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				// Utiliza style-loader para inyectar CSS con JS
				use: [
					"style-loader",
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
		new Dotenv({
			path: "./dev.env",
		}),
	],
	// Habilita el source map para depuración
	devtool: "eval-source-map",
	devServer: {
		port: 8080,
		open: true,
		hot: true, // Habilita Hot Module Replacement
		static: {
			directory: path.join(__dirname, "src"),
		},
		// Elimina verbosidad y muestra solo mensajes de errores durante el build
		devMiddleware: { stats: "errors-only" },
	},
});
