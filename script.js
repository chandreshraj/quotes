const quoteContainer = document.getElementById("qoute-container");
const quotesText = document.getElementById("quote");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

const getQuote = async () => {
  showLoadingSpinner();
  const apiurl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiurl);
    let Quotes = [];
    Quotes = await res.json();
    const data = Quotes[Math.floor(Math.random() * Quotes.length)];
    authorName.innerText =
      data.author != null ? "- " + data.author : " - Unkown";
    if (data.text.length > 120) {
      quotesText.classList.add("long-quote");
    } else {
      quotesText.classList.remove("long-quote");
    }
    quotesText.innerText = data.text;
    hideLoadingSpinner();
  } catch (error) {
    if (error) {
      getQuote();
    }
  }
};

// to tweet the quote
function tweetQuote() {
  const quote = quotesText.innerText;
  const author = authorName.innerText;
  const twitterurl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterurl, "_blank");
}

// Inital Point
getQuote();

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
