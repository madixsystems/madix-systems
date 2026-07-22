// Paste your free Formspree endpoint between the quotation marks.
// Example: const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
// The same endpoint receives playbook requests, waitlist interest, and reviews.
const FORM_ENDPOINT = "";

const leadForm = document.querySelector("#lead-form");
const leadSuccess = document.querySelector("#success");
const leadNote = document.querySelector("#form-note");
const reviewForm = document.querySelector("#review-form");
const reviewSuccess = document.querySelector("#review-success");
const reviewNote = document.querySelector("#review-note");
const planField = document.querySelector("#plan-field");
const planLabel = document.querySelector("#plan-label");

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    planField.value = plan;
    planLabel.textContent = plan;
    document.querySelector("#playbook").scrollIntoView({ behavior: "smooth" });
  });
});

async function submitForm({ form, success, note }) {
  if (!FORM_ENDPOINT) {
    note.textContent = "This form is designed and ready, but the inbox is not connected yet. Add your Formspree endpoint in script.js.";
    note.classList.add("error");
    return;
  }

  const button = form.querySelector("button[type='submit']");
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "Sending…";
  note.textContent = "";
  note.classList.remove("error");

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Submission failed");
    form.hidden = true;
    success.hidden = false;
  } catch {
    note.textContent = "We could not send this form. Please check your connection and try again.";
    note.classList.add("error");
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm({ form: leadForm, success: leadSuccess, note: leadNote });
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm({ form: reviewForm, success: reviewSuccess, note: reviewNote });
});

const copyReviewLink = document.querySelector("#copy-review-link");
const copyStatus = document.querySelector("#copy-status");

copyReviewLink.addEventListener("click", async () => {
  const reviewUrl = `${window.location.origin}${window.location.pathname}#leave-review`;
  try {
    await navigator.clipboard.writeText(reviewUrl);
    copyStatus.textContent = "Review link copied. You can send it to a former client.";
  } catch {
    copyStatus.textContent = `Copy this link: ${reviewUrl}`;
  }
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    const icon = item.querySelector("summary span");
    icon.textContent = item.open ? "−" : "+";
  });
});
