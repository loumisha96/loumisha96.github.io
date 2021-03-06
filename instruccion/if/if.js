var if_ = /** @class */ (function () {
    function if_(condiciones, instrucciones, elses, linea, column, tipo) {
        
        this.condiciones = condiciones;
        this.instrucciones = instrucciones;
        this.elses = elses;
        this.linea = linea;
        this.column = column;
        this.tipo = tipo;
        
    };
    
    if_.prototype.ejecutar = function(entorno, ast){
        var retorna=-1
        this.condiciones.forEach(cond => {
            var valor = cond.getValorImplicito(entorno,ast)
            if (typeof valor == 'boolean'){
                if(valor){
                    
                    try {
                        this.instrucciones.forEach(instruccion => {
                            if(instruccion.tipo != tipoInstr.ReturnE && instruccion.tipo != tipoInstr.Call)
                                retorna =instruccion.ejecutar(entorno,ast)
                            else{
                                retorna = instruccion.ejecutar(entorno,ast)
                                
                              /*  if(fn.tipoFuncion==Primitivo.int && typeof retorna =="number"){
                                    retorna = re
                                }else if(fn.tipo==Primitivo.String && typeof retorna =="string")
                                    retorna = re
                                else if(fn.tipo==Primitivo.boolean && typeof retorna =="boolean")
                                    retorna = re*/
                                    throw BreakException;
                            }
                        });
                    } catch (error) {
                        
                    }
                    
                }else{
                     const nuevoEnt = new Entorno(entorno)
                     this.elses.forEach(els => {
                       retorna= els.ejecutar(nuevoEnt, ast)
                    });
                }
            }else{
                Errores.push(new nodoError("Tipo Semántico", "condición no booleana: " +valor, this.linea, this.column))
            }
        });
        return retorna
    }
    return if_;
}());