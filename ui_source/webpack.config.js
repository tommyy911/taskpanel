
module.exports = {
    entry: ["./js/uiApp.js",'file?name=index.html!jade-html!./index.jade'],
    output: {
        path: '/',
        filename: "./js/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8000
    },
    node: {
        fs: "empty"
    }

};