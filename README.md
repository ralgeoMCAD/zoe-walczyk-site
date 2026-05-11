# zoe-walczyk-site

This repo holds two versions of Zoe's portfolio site:

- **`old/`** — the original CodePen export, copied here as-is so we have a record of the starting point. Don't edit this; it's just for reference.
- **`public/`** — the cleaned-up, working version. The contents of this folder are what you'd drop onto a webserver (or open `index.html` directly in a browser).

This README explains the bigger changes that went from `old/` to `public/`.

---

## 1. The HTML, CSS, and JavaScript live in separate files

In the original, everything was crammed into one HTML file: the page content, the styles, and the interactive code were all mixed together. We split them into three kinds of files:

- `.html` files describe **what's on the page** (the headings, links, images).
- `style.css` describes **how it looks** (colors, sizes, layout).
- `main.js` describes **how it behaves** (the lightbox, the menu toggle).

**Why this matters:** When everything's in one file, changing one thing means hunting through hundreds of lines to find it. Separating them means when you want to change a color, you only open the CSS file. When you wants to add a page, you only touches HTML. It also means the *same* stylesheet is shared by every page — change one color in one place and all six pages update.

## 2. The HTML uses "semantic" tags

The old HTML used a lot of generic `<div>` boxes. We swapped many of them for tags that actually describe what they are:

- `<header>` wraps the site title and navigation at the top.
- `<nav>` wraps the menu of links (instead of `<div class="navbar">`).
- `<main>` wraps the page's main content.
- `<section>` wraps the image gallery.
- The hamburger button is a real `<button>` instead of a fake link that pretended to be a button.

**Why this matters:** Browsers, screen readers (used by people with visual impairments), and search engines all understand these tags. A screen reader can tell a visually-impaired visitor "this is the main navigation" automatically. Search engines like Google use these to figure out what the page is about. And it makes the code easier to read for any future developer.

## 3. Every page that the menu links to actually exists

The original only had one real page (`index.html` — the illustration page). The menu linked to `child_ill.html`, `design.html`, `comics.html`, `about.html`, and `contact.html`, but those files didn't exist, so clicking any of them showed a "file not found" error.

We created placeholder ("stub") versions of all five missing pages. They share the same header, nav, and footer as the illustration page, but their main content just says "Content coming soon." When you're ready to build out the children's illustration page, just open `child_ill.html` and replace the placeholder text with you real content.

**Why this matters:** The site now feels complete, no broken links, and adding real content later is easy because the scaffolding is already there.

## 4. The current page is highlighted in the menu

On each page, the menu link for that page has a `class="active"` attribute, which the stylesheet uses to color it differently. So when a visitor is on the "Design" page, the "Design" link in the menu is shaded so they know where they are.

## 5. The gallery uses a same-height "justified rows" layout

The original gallery was two columns of images with equal *widths*. We rebuilt it so all images share the same *height*, and each row stretches edge-to-edge across the page. Because of this, **landscape images naturally take up more horizontal space than portrait ones**.

This is done with a CSS feature called Flexbox. The short version: we tell each image "be this tall, but you can grow wider to fill space in your row." Tall portrait images naturally end up narrower; wide landscapes end up wider. The browser figures out how many images fit per row automatically based on the window size.

We also use `object-fit: cover`, which means images crop very slightly at their edges to make rows line up perfectly. The trade-off is that images may lose a few pixels around their borders, but the rows look much tidier.

## 6. The site resizes itself for smaller screens (phones, tablets)

We used a CSS function called `clamp()` to make the image heights scale smoothly with the window size: smaller on a phone, larger on a desktop, with sensible minimums and maximums. We also have rules that kick in below 600px wide (roughly phone-sized) that swap the full horizontal menu for a hamburger button.

## 7. The mobile menu doesn't jump around anymore

In the original version, when you opened the hamburger menu on a small screen, the hamburger icon visibly jumped to a different position. We rebuilt the menu so that:

- The active page name stays pinned to the left.
- The hamburger button stays pinned to the right.
- When you tap the hamburger, the extra menu items just drop down underneath that first row — nothing in the top row moves.

## 8. The hamburger icon is drawn with pure CSS

The original used a library called Font Awesome, which is a big collection of icon graphics, just to display a single three-line hamburger icon. We replaced it with three lines drawn directly in CSS.

**Why this matters:** Two reasons. First, the page loads faster because it doesn't have to download Font Awesome's files just for one icon. Second, the CSS-drawn icon is bigger, crisper, and inherits the same color as the rest of the menu automatically — if you change the menu color, the hamburger updates too, with no extra work.

## 9. No `onclick="..."` or inline `style="..."` attributes in the HTML

The original sprinkled little bits of code and styling inside the HTML tags themselves, like `onclick="myFunction()"` and `style="text-align:center"`. We moved all of those into the proper CSS and JavaScript files.

**Why this matters:** It's the same principle as #1 — keeping the three kinds of files separate. When the JavaScript is all in one place (`main.js`), it's much easier to find and fix.

## 10. Bonus keyboard support in the lightbox

While we were refactoring the lightbox JavaScript, we added a few quality-of-life improvements:

- Press **Esc** to close the lightbox.
- Press **← / →** arrow keys to navigate between images.

The mouse-click behavior is unchanged; this is purely additive.

---

## How to deploy

The contents of `public/` are a complete static website — no server-side code, no build step, no dependencies. To put it online:

1. Sign up with any static hosting service (Neocities, Netlify, GitHub Pages, etc.).
2. Upload everything inside the `public/` folder.
3. That's it.

To preview locally, just double-click `public/index.html` and it'll open in your browser.
