let model;

async function cargarModelo() {
    model = await use.load();
}

async function responder() {
    const pregunta = document.getElementById("input").value.trim().toLowerCase();
    const chatLog = document.getElementById("chat-log");

    if (pregunta === "") {
        return;
    }

    // Generar vectores de embeddings para la pregunta
    const embeddings = await model.embed(pregunta);
    
    // Similitud de coseno entre la pregunta y respuestas predefinidas
    let similitudMaxima = -1;
    let respuestaTexto = "Hmm, no estoy seguro de eso. ¿Puedes preguntarme otra cosa?";
    for (const [preguntaPredefinida, respuestaPredefinida] of Object.entries(cerebro)) {
        const embeddingsPredefinido = await model.embed(preguntaPredefinida);
        const similitud = tf.dot(embeddings, embeddingsPredefinido).dataSync()[0];
        if (similitud > similitudMaxima) {
            similitudMaxima = similitud;
            respuestaTexto = respuestaPredefinida;
        }
    }

    // Mostrar la respuesta en el chat
    const respuestaHTML = `<div><strong>Tú:</strong> ${pregunta}</div><div><strong>Asistente:</strong> ${respuestaTexto}</div>`;
    chatLog.innerHTML += respuestaHTML;
    chatLog.scrollTop = chatLog.scrollHeight;

    // Limpiar el campo de entrada
    document.getElementById("input").value = "";
}

// "Cerebro" del asistente: preguntas y respuestas predefinidas
const cerebro = {
    "hola": "¡Hola! ¿En qué puedo ayudarte?",
    "¿cómo estás?": "¡Estoy bien, gracias! ¿Y tú?",
    "¿quién eres?": "Soy un asistente de conversación con conocimientos limitados a lo que está en Wikipedia.",
    "adiós": "¡Hasta luego! Si necesitas algo más, aquí estaré."
    // Agrega más preguntas y respuestas según sea necesario
};

// Inicializar el modelo al cargar la página
cargarModelo();
