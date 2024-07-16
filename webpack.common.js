import HtmlWebpackPlugin from "html-webpack-plugin";

import path from "path";
import url from "url";
// Obtiene el directorio actual
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
	// Define el directorio base para el contexto del proyecto
	context: path.resolve(__dirname, "./src"),
	resolve: {
		// Especifica las extensiones de archivo que Webpack resolverá automáticamente
		extensions: [".js", ".ts", ".tsx"],
	},
	entry: {
		// Punto de entrada principal de la aplicación
		app: "./index.tsx",
	},
	output: {
		// Nombre del archivo de salida, usando nombre de chunk y hash para el cacheo
		filename: "[name].[chunkhash].js",
		// Limpia la carpeta de dist antes de cada build
		clean: true,
	},
	module: {
		rules: [
			{
				// Aplica babel-loader a archivos .ts y .tsx para transpilar TypeScript
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				// Maneja archivos de imagen (png y jpg) como recursos
				test: /\.(png|jpg)$/,
				type: "asset/resource",
			},
			{
				// Para poder llegar a recursos insertados en HTML
				test: /\.html$/,
				loader: "html-loader",
			},
		],
	},
	plugins: [
		// Genera un archivo HTML y lo inyecta en el bundle
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html",
			scriptLoading: "blocking",
		}),
	],
	// Configuración de rendimiento para evitar mensajes de advertencia
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};
