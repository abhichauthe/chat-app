document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chatMessages");
    const userInput = document.getElementById("userInput");

    function addMessageToChat(message, isUser = false) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.style.textAlign = isUser ? "right" : "left";
        messageElement.style.margin = "5px 0";
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function fetchNews() {
        fetch("https://feeds.ndtv.com/ndtvnews-top-stories")
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                items.forEach(item => {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    addMessageToChat(`${title} - ${link}`);
                });
            })
            .catch(error => console.error("Error fetching the RSS feed:", error));
    }

    window.sendMessage = function() {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            addMessageToChat(userMessage, true);
            userInput.value = "";
            if (userMessage.toLowerCase() === "news") {
                fetchNews();
            }
        }
    };
});
