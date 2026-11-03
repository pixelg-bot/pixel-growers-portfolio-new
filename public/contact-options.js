(() => {
  const contactDialog = document.querySelector('.contact-dialog');
  if (!contactDialog) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/contact-options.css';
  document.head.append(stylesheet);

  contactDialog.classList.add('contact-options-dialog');
  contactDialog.setAttribute('aria-labelledby', 'contact-title');
  contactDialog.innerHTML = `
    <button class="close-contact" aria-label="Close contact options">×</button>
    <div class="contact-options-content">
      <div class="contact-options-brand"><img src="/branding/logo.png" alt="Pixel Growers"></div>
      <h2 id="contact-title">Let’s Grow Our Local <span class="contact-options-accent">Business Community!</span></h2>
      <p class="contact-options-intro">Choose how you’d like to connect with us for your free business check-up.</p>
      <div class="contact-options-list">
        <div class="contact-options-call">
          <a class="contact-options-button contact-options-button-primary" href="tel:+19059243063">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>Call Us</span>
          </a>
        </div>
        <a class="contact-options-button" href="mailto:admin@pixelgrowers.com">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
          <span>Send an Email</span>
        </a>
        <a class="contact-options-button" href="https://calendly.com/atul-das/free-consultation" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
          <span>Book a Free Consultation</span>
        </a>
      </div>
      <p class="contact-options-footnote">100% Free <span aria-hidden="true">·</span> No Obligation <span aria-hidden="true">·</span> Local Support</p>
    </div>`;
})();
