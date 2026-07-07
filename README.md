<div align="center">

<img src="./assets/nss-banner.svg" alt="NSS Team Repository" width="100%">

<br><br>

<img src="./assets/status-badge.svg" alt="Registrations open" width="230">

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
