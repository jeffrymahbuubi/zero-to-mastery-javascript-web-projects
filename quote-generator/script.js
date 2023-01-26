// Get Quotes From API

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// The reason we use let instead a constant, because in the beginning we're setting it as
// an empty array, but he're we actually changing the value of it to pass in the quote.
let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unkown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// An asynchronous function can run at any time independently and it
// won't stop the browser from completing the loading of the page.

// Try and Catch allow us to attemt to complete a request. But if it doesn't work
// we can catch the error and do something with it.

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    // const response will not be populated until it has some data fetched from the API
    // Only setup the const response when we get the data
    const response = await fetch(apiURL);
    // apiQuotes turning the data fetched into a JSON object from a Web Serer
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes);
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - 
  ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
