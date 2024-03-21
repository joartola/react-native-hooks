import { terser } from "rollup-plugin-terser"
const devMode = process.env.NODE_ENV !== 'production'
export default [
    {
        input: 'src/index.js',
        output: {
            file: "dist/index.js",
            format: 'es',
            plugins: [terser(
                {
                    compress: {
                        module: true,
                        toplevel: true,
                        unsafe_arrows: true,
                        drop_console: !devMode,
                        drop_debugger: !devMode,
                    }
                }
            )]
        }
    }
]