const conocimiento = {};

function sendMessage(event) {
    if (event.key === "Enter") {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;

        const chatBox = document.getElementById("chat-box");
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = userInput;
        chatBox.appendChild(userMessage);

        const botResponse = getBotResponse(userInput);
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = botResponse;
        chatBox.appendChild(botMessage);

        document.getElementById("user-input").value = "";
    }
}

function getBotResponse(userInput) {
    if (conocimiento[userInput]) {
        return conocimiento[userInput];
    } else {
        return "Lo siento, no sé qué responder a eso. ¿Me enseñas?";
    }
}

function teachBot() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    const respuesta = prompt("¿Qué debo responder a eso?");
    if (respuesta) {
        conocimiento[userInput] = respuesta;
    }
}
