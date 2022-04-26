const API_KEY = "b9fu18S0vUOGjRTpl8M5hzqAILFDhv3N";

const text = document.getElementById("abhinav");
const currLink = document.getElementById("currURL");

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  console.log(tabs[0].url);
  URL = tabs[0].url;
  const encodedURL = encodeURIComponent(URL);
  currLink.innerHTML = URL;
  getURLSafety(encodedURL);
});

const getURLSafety = (url) => {
  try {
    fetch(`https://ipqualityscore.com/api/json/url/${API_KEY}/${url}`)
      .then((response) => response.json())
      .then((result) => {
        const { unsafe, spamming, malware, phishing, suspicious } = result;
        if (unsafe || spamming || malware || phishing || suspicious) {
          text.innerHTML = "This site is unsafe";
        } else {
          text.innerHTML = "This site is safe";
        }
      });
  } catch (err) {
    console.log(err);
  }
};
