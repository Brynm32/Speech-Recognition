const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

const greetings = [
  "I'm fine, now leave me alone",
  "Doing good thank you",
  "Why do you want to know?"
];

const weather = [
  "Why do you care? Not like you ever leave the house anyway!",
  "Just look out the window and leave me alone",
  "The weather is as gloomy as your hopes and dreams"
];

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
  console.log("Voice is activated! You can now speak into microphone...");
};

recognition.onresult = function(event) {
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
};

btn.addEventListener("click", () => {
  recognition.start();
});

function readOutLoud(message) {
  const speech = new SpeechSynthesisUtterance();

  if (message.includes("weather")) {
    const finalText = weather[Math.floor(Math.random() * weather.length)];
    speech.text = finalText;
  } else if (message.includes("how are you")) {
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  } else {
    speech.text = "I don't know what you just said";
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
