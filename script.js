// Paste your free Formspree endpoint between the quotation marks.
// Example: const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
const FORM_ENDPOINT = "https://formspree.io/f/mnjezevy";

const form = document.querySelector("#lead-form");
const success = document.querySelector("#success");
const note = document.querySelector("#form-note");
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!FORM_ENDPOINT) {
    note.textContent = "Your page is ready, but the email inbox is not connected yet. Add your Formspree endpoint in script.js.";
    note.classList.add("error");
    return;
  }

  const button = form.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Saving your spot…";
  note.textContent = "";
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
    note.textContent = "We could not save your request. Please try again.";
    note.classList.add("error");
    button.disabled = false;
    button.textContent = "Send my free playbook →";
  }
});
