# Madix Systems Website

This folder is ready for GitHub Pages. It uses plain HTML, CSS, and JavaScript, so there is no build command and no paid website builder required.

## Connect the name and email form

1. Create a free form at https://formspree.io/.
2. Copy the endpoint Formspree gives you. It looks like `https://formspree.io/f/abcdwxyz`.
3. Open `script.js`.
4. Paste the endpoint into `FORM_ENDPOINT`:

```js
const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
```

The form will then send name, email, business type, and selected plan to your Formspree inbox. The visitor receives the playbook download only after a successful submission.

## Publish with GitHub Pages

1. Create a new public GitHub repository named `madix-systems`.
2. Upload everything inside this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose `main` and `/root`, then save.
6. GitHub will display your public website URL after deployment.

## Change subscription prices

Edit the three `.plan` cards inside `index.html`. These buttons currently collect waitlist interest and do not charge visitors. Connect Stripe, Lemon Squeezy, Gumroad, PayMongo, or another provider only when you are ready to accept payments.

## Branding and claims

The moving strip uses text names rather than copied official logos. Keep only brands and systems you can truthfully say you worked with or used. The current disclaimer states that no endorsement or affiliation is implied.
