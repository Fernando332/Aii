async function responder() {
    const pregunta = document.getElementById("input").value.trim();

    if (pregunta === "") {
        return;
    }

    try {
        const respuesta = await obtenerRespuesta(pregunta);
        mostrarRespuesta(pregunta, respuesta);
    } catch (error) {
        console.error("Error al obtener la respuesta:", error);
        mostrarRespuesta(pregunta, "Hmm, parece que hay un problema. ¿Puedes intentar nuevamente?");
    }

    // Limpiar el campo de entrada
    document.getElementById("input").value = "";
}

async function obtenerRespuesta(pregunta) {
    const respuesta = await fetch('/api/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Tu API Key de OpenAI
        },
        body: JSON.stringify({ pregunta: pregunta })
    });

    if (!respuesta.ok) {
        throw new Error('No se pudo obtener una respuesta de la API');
    }

    return respuesta.json();
}

function mostrarRespuesta(pregunta, respuesta) {
    const chatLog = document.getElementById("chat-log");
    const respuestaHTML = `<div><strong>Tú:</strong> ${pregunta}</div><div><strong>Asistente:</strong> ${respuesta}</div>`;
    chatLog.innerHTML += respuestaHTML;
    chatLog.scrollTop = chatLog.scrollHeight;
}
