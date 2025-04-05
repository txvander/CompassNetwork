document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    let cookieCard = document.querySelector(".card");
    cookieCard.style.opacity = "1";
    cookieCard.style.visibility = "visible";
  }, 1000); 

  document.querySelectorAll(".acceptButton, .declineButton").forEach(button => {
    button.addEventListener("click", () => {
      let cookieCard = document.querySelector(".card");
      cookieCard.style.opacity = "0";
      cookieCard.style.visibility = "hidden";
    });
  });
});