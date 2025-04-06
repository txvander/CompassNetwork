document.addEventListener("DOMContentLoaded", function () {
  const cookieCard = document.querySelector(".card");


  cookieCard.style.opacity = "0";
  cookieCard.style.visibility = "hidden";
  cookieCard.style.transition = "opacity 0.3s ease";


  if (!sessionStorage.getItem("cookieClosed")) {
    setTimeout(() => {
      cookieCard.style.opacity = "1";
      cookieCard.style.visibility = "visible";
    }, 1000);
  }

  document.querySelectorAll(".acceptButton, .declineButton").forEach(button => {
    button.addEventListener("click", () => {
      cookieCard.style.opacity = "0";
      cookieCard.style.visibility = "hidden";
      sessionStorage.setItem("cookieClosed", "true");
    });
  });
});
