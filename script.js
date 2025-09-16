const responses = {
  "hello": "Hi there! How can I help you?",
  "how are you?": "I'm just a bot, but I'm doing great!",
  "bye": "Goodbye! Have a nice day."
};

function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();

  if (!userText) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = "You: " + userText;
  chatBox.appendChild(userMsg);

  // Bot response
  const botMsg = document.createElement("div");
  botMsg.classList.add("message", "bot");
  botMsg.textContent = "Bot: " + (responses[userText.toLowerCase()] || "Sorry, I don't understand.");
  chatBox.appendChild(botMsg);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}
