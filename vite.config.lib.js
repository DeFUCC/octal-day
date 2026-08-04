

export default {
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'parse',
            fileName: 'index',
            formats: ['es']
        },
        emptyOutDir: false,
        publicDir: false,
        target: 'es2020',
        outDir: 'dist',
        minify: false,
        sourcemap: false,
    }
}