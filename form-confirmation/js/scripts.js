const myInfo = new URLSearchParams(window.location.search);

document.querySelector("#results").innerHTML = `<h2>Thank you for your submission, ${myInfo.get("first")}!</h2>
<p>We have received your request for an appointment at ${myInfo.get("location")}.</p>
<p>We will contact you at ${myInfo.get("email")} to confirm your appointment.</p>
`;