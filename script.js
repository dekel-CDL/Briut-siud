// === הגדרת EmailJS ===
(function() {
  emailjs.init("sZ2-zSWqFO4O0y0L4"); // public key
})();

function checkEligibility(event) {
  event.preventDefault();

  const loader = document.getElementById("loader");
  const result = document.getElementById("result");
  const whatsappLink = document.getElementById("whatsappLink");

  loader.style.display = "block";
  result.style.display = "none";

  // שליפת הנתונים מהטופס
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const id = document.getElementById("id").value;
  const birthdate = document.getElementById("birthdate").value;
  const notes = document.getElementById("notes").value;

  // בניית אובייקט הנתונים ל־EmailJS
  const templateParams = {
    full_name: name,
    phone: phone,
    id_number: id,
    birth_date: birthdate,
    medical_description: notes,
    source: "דף נחיתה – בריאות וסיעוד",
    page_url: window.location.href,
    submitted_at: new Date().toLocaleString('he-IL'),
    referrer: document.referrer || ""
  };

  // שליחה ל־EmailJS
  emailjs.send("service_vfjusnr", "template_0d2pkml", templateParams)
    .then(() => {
      loader.style.display = "none";
      result.style.display = "block";
      // קישור וואטסאפ עם הודעה מוכנה
      const encodedMsg = encodeURIComponent(`שלום, בדקתי זכאות באתר ואני מעוניין/ת להמשיך בתהליך. שמי ${name}, טלפון ${phone}.`);
      whatsappLink.href = `https://wa.me/972547768879?text=${encodedMsg}`;
    })
    .catch((error) => {
      loader.style.display = "none";
      alert("קרתה שגיאה בשליחה. נסה שוב בעוד רגע.");
      console.error("EmailJS error:", error);
    });

  return false;
}
