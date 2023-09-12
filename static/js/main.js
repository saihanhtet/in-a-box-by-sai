$(window).scroll(function () {
  $("nav").toggleClass("scrolled", $(this).scrollTop() > 0);
  $(".footer").toggleClass("scrolled", $(this).scrollTop() > 0);
});

const current_section_hash = window.location.hash;

if (current_section_hash) {
  const sectionElement = document.querySelector(current_section_hash);
  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: "smooth" });
  }
}
const linksWithHash = document.querySelectorAll('a[href^="#"]');

linksWithHash.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    // console.log(targetId, targetElement);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); 
  const recipient = document.getElementById("email-field").value;
  const subject = document.getElementById("reason-to-contact").value;
  const gmailComposeUrl = `https://mail.google.com/mail/u/0/?fs=1&to=${recipient}&su=${subject}&tf=cm`;
  window.open(gmailComposeUrl, "_blank");
});
