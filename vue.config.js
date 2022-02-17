module.exports = {
    devServer : {
        // 백엔드 주소를 짧게 사용하기 위해서
        // 원래는 http://localhost:3000/board/select => board/select로 쓰기 위해
        proxy : {
            '/board':{
                target : 'http://localhost:3000',
                changeOrigin : true,
                logLevel : 'debug'
            },

        },
        // port 번호 바꿀 수 있음
        port : 8080
    }

}