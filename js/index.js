const input = document.getElementById("link-input");
const linkForm = document.getElementById("link-form");
const errMsg = document.getElementById("err-msg");
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
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
}
//toggle mobile menu
function navToggle() {
  btn.classList.toggle("open");
  menu.classList.toggle("flex");
  menu.classList.toggle("hidden");
}
