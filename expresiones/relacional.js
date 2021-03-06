var relacional = /** @class */ (function () {
    function relacional(expr1, operador, expr2, linea, column ) {
        
        this.expr1 = expr1;
        this.operador = operador;
        this.expr2 = expr2;
        this.linea = linea;
        this.column = column;
       // this.tipo = tipo;
      //  this.entorno = entorno;
    };
    relacional.prototype.getValor = function(entorno, ast, expr){
        var val =-1
        if(expr.tipo == tipoInstr.Call){
            val = expr.ejecutar(entorno,ast)
        }else {
            if(expr.length>0){
                expr.forEach(e => {
                    val = e.getValorImplicito(entorno,ast)
                });
            }else{
                val = expr.getValorImplicito(entorno,ast)
            }
        }
        if(typeof val == "object" ){
            
            if(entorno.existe(val)){
                var simAux2 = entorno.getSimbolo(val)
                return simAux2.getValorImplicito(entorno, ast)
            }else{
                Errores.push(new nodoError("Tipo Semántico", "Variable no creada: "+val, "", this.linea, this.column))
            }
            
        }
        return val
    }

    relacional.prototype.getValorImplicito = function(entorno, ast){
        
        var valor1 =this.getValor(entorno, ast, this.expr1)
        var valor2 = this.getValor(entorno, ast, this.expr2)
        if (typeof valor1 == 'number' && typeof valor2 == 'number'){
            
            switch (this.operador) {
                case operador.mayor:
                    return  (valor1 > valor2)? this.valor = true :  this.valor =false
                case operador.menor:
                    return  (valor1 < valor2)? this.valor = true :  this.valor =false
                case operador.menorIgual:
                    return  (valor1 <= valor2)? this.valor = true :  this.valor =false
                case operador.mayorIgual:
                    return  (valor1 >= valor2)? this.valor = true :  this.valor =false
                case operador.equalEqual:
                    return  (valor1 == valor2)? this.valor = true :  this.valor =false
                case operador.diferente:
                    return  (valor1 != valor2)? this.valor = true :  this.valor =false
                default:
                    return null;
                
            }
   
        }else if (typeof valor1 == 'string' && typeof valor2 == 'string'){
            switch (this.operador) {
                case operador.equalEqual:
                    return  (valor1 == valor2)? this.valor = true :  this.valor =false
                case operador.diferente:
                    return  (valor1 != valor2)? this.valor = true :  this.valor =false
                default:
                    return null;
            }
        }else{
            Errores.push(new nodoError("Tipo Semántico", "Tipado no válido", "", this.linea, this.column))
        }
    }
        return relacional;
}());