document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:3000');
  
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('sendButton');
    const senderNameInput = document.getElementById('senderName');
  
    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();
      const sender = sessionStorage.getItem('userName');
  
      if (message && sender) {
        socket.emit('chatMessage', { sender: sender, message: message });
  
        displayMessage(sender, message, 'sender');
  
        messageInput.value = '';
      }
    });
  
    socket.on('chatMessage', (data) => {
      const currentSender = sessionStorage.getItem('userName');
      if (data.sender !== currentSender) {
        displayMessage(data.sender, data.message, 'receiver');
      }
    });
  
    function displayMessage(sender, message, messageType) {
      const messageElement = document.createElement('p');
      messageElement.textContent = `${sender}: ${message}`;
      messageElement.classList.add(messageType);
  
      chatMessages.appendChild(messageElement);
  
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });
  