<div align="center">

<img src="./assets/nss-banner.svg" alt="NSS Team Repository" width="100%">
<svg width="900" height="220" viewBox="0 0 900 220" xmlns="http://www.w3.org/2000/svg" font-family="Trebuchet MS, Verdana, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#253253"/>
      <stop offset="50%" stop-color="#1C2541"/>
      <stop offset="100%" stop-color="#12182B"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E8A33D" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#E8A33D" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clip"><rect width="900" height="220" rx="20"/></clipPath>
  </defs>

  <rect width="900" height="220" rx="20" fill="url(#bg)"/>

  <g clip-path="url(#clip)">
    <circle cx="770" cy="50" r="240" fill="url(#glow)">
      <animate attributeName="r" values="230;255;230" dur="6s" repeatCount="indefinite"/>
    </circle>

    <g transform="translate(770,50)">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="70s" repeatCount="indefinite"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(0)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(30)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(60)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(90)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(120)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(150)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(180)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(210)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(240)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(270)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(300)"/>
        <rect x="-1.4" y="-210" width="2.8" height="80" fill="#E8A33D" opacity="0.45" transform="rotate(330)"/>
      </g>
    </g>
  </g>

  <!-- crest mark -->
  <rect x="50" y="42" width="34" height="34" rx="9" fill="none" stroke="#E8A33D" stroke-width="1.8" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.1s" fill="freeze"/>
  </rect>
  <text x="67" y="65" font-size="16" font-weight="700" fill="#E8A33D" text-anchor="middle" opacity="0">N
    <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.1s" fill="freeze"/>
  </text>

  <!-- title -->
  <text x="98" y="72" font-size="34" font-weight="800" fill="#EDE6D6" letter-spacing="0.5" opacity="0">NSS TEAM REPOSITORY
    <animate attributeName="opacity" from="0" to="1" dur="0.9s" begin="0.3s" fill="freeze"/>
  </text>

  <!-- underline draw-in -->
  <line x1="50" y1="90" x2="50" y2="90" stroke="#E8A33D" stroke-width="2">
    <animate attributeName="x2" from="50" to="560" dur="1s" begin="0.9s" fill="freeze"/>
  </line>

  <!-- subtitle -->
  <text x="50" y="122" font-size="16" fill="#a9b2c9" opacity="0">M.G.R. College, Hosur &#183; NSS Volunteer Digital ID &amp; Registration System
    <animate attributeName="opacity" from="0" to="1" dur="0.9s" begin="1.3s" fill="freeze"/>
  </text>

  <!-- tagline -->
  <text x="50" y="160" font-size="20" font-style="italic" font-weight="600" fill="#4B6B53" opacity="0">"Not Me, But You"
    <animate attributeName="opacity" from="0" to="1" dur="1s" begin="1.9s" fill="freeze"/>
  </text>

  <!-- year pill -->
  <rect x="50" y="178" width="120" height="26" rx="13" fill="#E8A33D" opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="0.7s" begin="2.3s" fill="freeze"/>
  </rect>
  <text x="110" y="195" font-size="12" font-weight="700" fill="#12182B" text-anchor="middle" opacity="0">BATCH 2025&#8211;2026
    <animate attributeName="opacity" from="0" to="1" dur="0.7s" begin="2.3s" fill="freeze"/>
  </text>
</svg>

<br><br>

<img src="./assets/status-badge.svg" alt="Registrations open" width="230">
<img width="230" height="34" alt="image" src="https://github.com/user-attachments/assets/1c0b2bc7-abd1-4b0c-b0bc-a86978345746" />
</div>

<br>

## About

This repository powers the **NSS Volunteer Digital ID & Registration System** for the
National Service Scheme unit at M.G.R. College, Hosur. Students register once, and the
system takes care of the rest — a unique volunteer ID, a printable ID card, and a
confirmation email — without any manual data entry on the NSS office's side.

Built entirely on a zero-cost stack: **GitHub Pages** for hosting, **Google Apps Script**
for the backend, and a **Google Sheet** as the database.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | The registration wizard students fill out — collects volunteer details, captures a photo (camera or upload), and renders the ID card client-side |
| `Code.gs` | Google Apps Script backend — assigns sequential volunteer IDs, writes to the Sheet, stores photos in Drive, and emails the finished ID card |
| `README.md` | You're reading it |

> `Code.gs` is kept here for version history. The **live** copy that actually runs lives
> inside the Apps Script editor attached to the registration Google Sheet — that's the one
> that needs the real Sheet ID and Drive folder IDs filled in, not this file.

## How it works

1. A student opens the site and fills in their details step by step — name, gender, DOB,
   class, subject, mobile, email, Aadhaar, community, blood group, and a photo.
2. On submit, the backend checks the registration cap, validates the data, and assigns the
   next volunteer ID in sequence: `C26UG111NSS001`, `C26UG111NSS002`, and so on.
3. The browser renders the front and back of the ID card (photo, name, QR code) and sends
   the finished PNG + PDF back to the backend.
4. The backend emails the finished card to the student and a notification copy to the NSS
   office, and logs everything in the master Google Sheet.
5. Anyone who's already registered can retrieve their card again later using their
   volunteer ID or the email they registered with.

## Design system

| Token | Hex | Used for |
|---|---|---|
| Indigo Dusk | `#1C2541` | Base background |
| Marigold | `#E8A33D` | Primary accent / calls to action |
| Banyan Green | `#4B6B53` | Success states, secondary accent |
| Parchment | `#EDE6D6` | Card text on dark surfaces |

Fonts: **Syne** (display), **Plus Jakarta Sans** (body), **JetBrains Mono** (ID numbers).

## Live site

**[srikumarm8248-droid.github.io/NSS-Team-Repository](https://srikumarm8248-droid.github.io/NSS-Team-Repository/)**

## Maintained by

NSS Unit, M.G.R. College, Hosur — Sri Kumar M, Programme Officer

<div align="center">
<sub>Not Me, But You</sub>
</div>
