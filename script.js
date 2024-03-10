let datosX = [];
let datosY = [];

function entrenar() {
    const x = parseFloat(document.getElementById('input-x').value);
    const y = parseFloat(document.getElementById('input-y').value);
    
    datosX.push(x);
    datosY.push(y);

    // Entrenar modelo (aquí podrías realizar el entrenamiento real con los datos)
    const modeloEntrenado = entrenarModelo(datosX, datosY);

    // Realizar predicción con el último dato ingresado
    const prediccion = predecir(modeloEntrenado, x);

    mostrarResultado(prediccion);
}

function entrenarModelo(x, y) {
    // Aquí iría el código para entrenar el modelo con los datos proporcionados
    // Por simplicidad, devolvemos una función lineal básica
    const pendiente = calcularPendiente(x, y);
    const intercepto = calcularIntercepto(x, y);
    return { pendiente, intercepto };
}

function predecir(modelo, x) {
    // Aquí iría el código para realizar una predicción con el modelo entrenado
    // Por simplicidad, utilizamos una función lineal básica
    return modelo.pendiente * x + modelo.intercepto;
}

function calcularPendiente(x, y) {
    // Calcula la pendiente de la línea de regresión
