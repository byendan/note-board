module.exports = {
    entry: {
        app: {
            import: './src/index.js',
        },
        main: {
            import: './public/main.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            { 
                exclude: ['node_modules'], 
                loader: 'babel', 
                test: /\.jsx?$/ 
            },
        ]
    }
}