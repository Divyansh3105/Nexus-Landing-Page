# ⬡ nexus-landing-page — Responsive Landing Page with Interactive Navigation

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **Prodigy Infotech — Web Development Internship | Task 01**

A fully responsive, visually stunning personal portfolio landing page featuring an **interactive navigation menu** that dynamically changes style on scroll and hover — built with pure HTML, CSS, and Vanilla JavaScript.

---

## 🚀 Live Demo

> _Deploy to GitHub Pages and add your live link here._

---

## ✨ Features

- 🧭 **Interactive Navbar** — Transparent on top, frosted-glass on scroll with smooth transitions
- 🍔 **Mobile Hamburger Menu** — Animated toggle for small screens
- 🌊 **Hero Section** — Animated gradient orbs, live code card with typing cursor
- 📖 **About Section** — Floating badge, highlights grid
- 📊 **Skills Section** — Animated skill bars triggered on scroll via Intersection Observer
- 💼 **Work / Projects Section** — Mini project previews with tech tags
- 📬 **Contact Section** — Functional-looking contact form with hover effects
- ⬆️ **Scroll-to-Top Button** — Appears after scrolling down
- 🎨 **Dark, Premium Design** — HSL-based color palette, glassmorphism, subtle micro-animations
- 📱 **Fully Responsive** — Mobile-first, works on all screen sizes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, glassmorphism, responsive layout |
| Vanilla JavaScript | Scroll effects, Intersection Observer, hamburger menu |
| Google Fonts (Inter & Outfit) | Typography |

---

## 📁 Project Structure

```
nexus-landing-page/
├── index.html      # Main HTML file
├── style.css       # All styles (design system, layout, animations)
├── script.js       # JavaScript (scroll events, nav toggle, skill bars)
└── README.md       # Project documentation
```

---

## 🖥️ Getting Started

No build tools required — just open with your browser!

```bash
# Clone the repository
git clone https://github.com/<your-username>/nexus-landing-page.git

# Navigate into the project
cd nexus-landing-page

# Open in browser
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

---

## 📸 Screenshots

> _Add screenshots of your project here._

---

## 🧑‍💻 Key Implementation Details

### Scroll-Aware Navbar
```js
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});
```
The navbar transitions from fully transparent to a frosted-glass blurred background when the user scrolls past 50px.

### Skill Bar Animation (Intersection Observer)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate skill fill width to data-width value
    }
  });
}, { threshold: 0.3 });
```

### Mobile Menu Toggle
Hamburger icon animates into an X on click, and the nav links slide in with a smooth transition.

---

## 📋 Task Requirements (Prodigy Infotech)

| Requirement | Status |
|-------------|--------|
| Responsive navigation menu | ✅ |
| Color/style change on scroll | ✅ |
| Hover effects on nav links | ✅ |
| Mobile-friendly hamburger menu | ✅ |
| Clean, well-structured code | ✅ |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🤝 Acknowledgements

- **Prodigy Infotech** — For the internship opportunity and task guidelines
- **Google Fonts** — Inter & Outfit typefaces
- **Open Source Community** — For inspiration

---

<p align="center">Built with ❤️ as part of the <strong>Prodigy Infotech</strong> Web Development Internship</p>
