(function(){
  emailjs.init("sZ2-zSWqFO4O0y0L4");
})();

function checkEligibility(event) {
  event.preventDefault();
  const loader = document.getElementById('loader');
  const result = document.getElementById('result');
  const form = document.getElementById('contactForm');

  loader.style.display = 'block';
  form.style.display = 'none';
  result.style.display = 'none';

  setTimeout(() => {
    loader.style.display = 'none';
    result.style.display = 'block';

    const params = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      id: document.getElementById('id').value,
      birthdate: document.getElementById('birthdate').value,
      notes: document.getElementById('notes').value
    };

    emailjs.send("service_vfjusnr", "template_61wg9me", params)
    .then(() => console.log("נשלח בהצלחה ל‑EmailJS"));

    const message = encodeURIComponent("שלום אני מעוניין לבדוק את הזכאות שלי");
    const whatsappUrl = `https://wa.me/972547768879?text=${message}`;
    document.getElementById('whatsappLink').href = whatsappUrl;
    window.open(whatsappUrl, '_blank');
  }, 5000);
}