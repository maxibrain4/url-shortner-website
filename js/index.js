const input = document.getElementById("link-input");
const linkForm = document.getElementById("link-form");
const errMsg = document.getElementById("err-msg");
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
const shortenContainer = document.getElementById("shortener");

linkForm.addEventListener("submit", formSubmit);
btn.addEventListener("click", navToggle);

function formSubmit(e) {
  e.preventDefault();
  function validURL(str) {
    let pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
  if (input.value === "") {
    errMsg.textContent = "Please enter something";
    input.classList.add("bordernew");
  } else if (!validURL(input.value)) {
    errMsg.textContent = "Please enter a valid URL";
    input.classList.add("bordernew");
  } else {
    errMsg.textContent = "";
    input.classList.remove("bordernew");
  }
  shortenData();
}
//toggle mobile menu
function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
}

const getshortenLink = function (data) {
  const html = `<div
          class="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row"
        >
          <p class="font-bold text-center text-veryDarkViolet md:text-left">
          ${data.result.original_link}
          </p>
          <div
            class="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0"
          >
            <div id="newlink" class="font-bold text-cyan"> ${data.result.full_short_link2}</div>
            <button id="btncopy"
              class="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none"
            >
              Copy
            </button>
          </div>
        </div>`;

  shortenContainer.insertAdjacentHTML("beforeend", html);
  const btnCopy = document.querySelectorAll("#btncopy");
  const newLink = document.querySelectorAll("#newlink");
  btnCopy.forEach(function (el) {
    el.addEventListener("click", function () {
      // Get the text field
      newLink.forEach(function () {
        //set local storage
        localStorage.setItem("shortenedLink", data.result.full_short_link2);
        const copyText = localStorage.getItem("shortenedLink");
        navigator.clipboard.writeText(copyText);
      });
      //changes on the button
      el.textContent = "Copied";
      el.style.backgroundColor = "hsl(260, 8%, 14%)";
    });
  });
};

// const clickbtn = function(){
//   shortenData();
// }

//adding api
const shortenData = async function () {
  try {
    const res =
      await fetch(` https://api.shrtco.de/v2/shorten?url=${input.value}
`);
    const data = await res.json();
    console.log(data);
    getshortenLink(data);
  } catch (err) {
    console.log(err);
  }
};

// shortenData();
