class Constants {
    //API
       static get APISecretKey() { return "todo:changekey" }
    
    // API CODES
        static get successCode()        { return 0 }
        static get errorCodeSequelize() { return 1 }
        static get errorCodeAuth()      { return 2 }
    
    // API DESCRIPTION CODES
        static get successDesc()          { return "Success"                     }
        static get valueNotFound()        { return "Registro não encontrado."    }
        static get authenticationFailed() { return "Usuário ou senha inválidos." }
        static get invalidToken()         { return "Token inválido."             }
        static get tokenNotFound()        { return "Token inválido."             }
    
    // Actions AC
        static get create() { return "create" }
        static get read()   { return "read"   }
        static get update() { return "update" }
        static get delete() { return "delete" }
    
    // General constants
        static get minRandomNumber() { return 100000000000 }
        static get maxRandomNumber() { return 999999999999 }
        static get sessionTime()     { return '1h'         }
    }
    
    module.exports = Constants    