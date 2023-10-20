// JavaScript code to switch content between index.html and about.html

const contentSwitchButton = document.getElementById("content-switch-button");
let isAboutPage = false;
const container = document.querySelector(".container");
let originalContent = container.innerHTML; // Store the original content

contentSwitchButton.addEventListener("click", function () {
    if (isAboutPage) {
        // Switch back to the original content (index.html)
        container.innerHTML = originalContent;
        isAboutPage = false;
    } else {
        // Switch to the about.html content
        loadContent("about.html");
        isAboutPage = true;
    }
});

function loadContent(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            container.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}
