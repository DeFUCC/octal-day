

export default {
    build: {
        lib: {
            entry: 'README.md',
            name: 'parse',
            fileName: 'index',
            formats: ['es']
        },
        emptyOutDir: false,
        publicDir: false,
        target: 'es2020',
        outDir: 'dist',
        minify: true,
        sourcemap: false,
    }
}