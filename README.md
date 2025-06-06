# Buren voor Buren Tienen

**Buren voor Buren Tienen** is an open source digital platform for neighborhood help, solidarity, and community care in Tienen, Belgium. The project connects volunteers and people in need, strengthening social cohesion and providing accessible, local support.

---

## Table of Contents

- [Project Vision](#project-vision)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Development](#installation--development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Partners](#partners)
- [Sources & Further Reading](#sources--further-reading)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Contact](#contact)
- [Author](#author)

---

## Project Vision

Buren voor Buren Tienen aims to:
- Lower the threshold for asking and offering help in the neighborhood.
- Foster solidarity and social cohesion.
- Provide a modern, accessible, and user-friendly platform for both volunteers and people in need.
- Serve as a replicable model for other communities.

---

## Features

- **Help Request Form:** Residents can submit requests for help (e.g., groceries, transport, social contact).
- **Volunteer Registration:** Volunteers can sign up and indicate their motivation and contact details.
- **Feedback System:** Users can leave feedback, which is displayed in a carousel on the help page.
- **Contact Form:** Direct contact with the organization, with regional contacts listed.
- **Responsive Design:** Optimized for desktop, tablet, and mobile.
- **Accessibility:** Includes screen reader support and keyboard navigation.
- **Partner Overview:** Visual display of all partner organizations.
- **News Feed:** Updates and news items from the community.
- **Open Source:** MIT licensed, with clear contribution guidelines.

---


## Technology Stack

- **Frontend:** React, Vite, Emotion, MUI, Heroicons
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas)
- **Other:** ESLint, Dotenv, Concurrently

---

## Project Structure

```
Burenvoorburen/
  backend/           # Node.js/Express API, MongoDB logic
    routes/          # Modular route handlers (e.g., streets)
    server.js        # Main server file
  src/
    components/      # React components (Help, Contact, Feedback, etc.)
    assets/          # Images, fonts, partner logos
    styles/          # CSS/Emotion styles
  public/            # Static files
  index.html         # Main HTML entry
  package.json       # Project metadata and scripts
  README.md          # Project documentation
```

---

## Installation & Development

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KobeBerckmans/Burenvoorburen.git
   cd Burenvoorburen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in the `backend/` directory.
   - Set your `MONGODB_PASSWORD` and any other required variables.

4. **Run the app (frontend + backend concurrently):**
   ```bash
   npm run dev:full
   ```
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3001](http://localhost:3001)

---

## Deployment

- **Frontend:** Can be deployed to Vercel, Netlify, or any static host.
- **Backend:** Deploy to platforms like Heroku, Railway, or your own server.
- **Environment:** Set environment variables for production (e.g., MongoDB credentials).

---

## API Documentation

### Main Endpoints

- `POST /api/help-requests`  
  Submit a new help request.  
  **Body:** `{ naam, soort, bericht, datum, straat, nummer, telefoon, contrei, uur }`

- `POST /api/volunteers`  
  Register as a volunteer.  
  **Body:** `{ naam, voornaam, adres, tel, mail, motivatie }`

- `POST /api/contact`  
  Send a contact message.  
  **Body:** `{ email, subject, message }`

- `POST /api/feedback`  
  Submit feedback.  
  **Body:** `{ naam, boodschap }`

- `GET /api/feedback`  
  Retrieve all feedback.

- `GET /api/news`  
  Get all news items.

- `GET /api/streets`  
  Get all street names (for address autocomplete).

---

## Partners

The project is supported by a network of local organizations, including:
- Stad Tienen
- Samana
- Curieus
- Huis van de Mens
- Okra
- Landelijke Gilden
- Fietsersbond
- Kumtich Comité
- Vissenaken
- Solidair Tienen
- Taalinpraktijk
- De Koepel
- Burgers aan Zet
- ...and more

*(Logos and links are visible on the Partners page in the app.)*

---

## Sources & Further Reading

### Books & Articles

- Bekaert, A. et al. (2016). *Buurtgerichte Zorg. De actief zorgzame buurt als toekomstmodel voor Vlaanderen en Brussel.* [Visietekst Buurtgerichte Zorg (kenniscentrumwwz.be)](https://www.kenniscentrumwwz.be/sites/default/files/atoms/files/Visietekst%20Buurtgerichte%20Zorg.pdf)
- Bloemen, R., Caymax, K., Vande Woestyne, L., & Derutter, R. (2022). *Minder mazen, meer net. Aan de slag met zorgzame buurten.* [SAAMO](https://www.saamo.be/wp-content/uploads/2022/06/2022_SALI001_e-pub_zorgzame-buurt.pdf)
- Decorte, A. et al. (2017). *Sociaal vernieuwen met burenhulp. Zesdelige reeks van VIEWZ.*
- De Donder, L. et al. (2021). *Lokaal samenwerken in zorgzame buurten.* [kbs-frb.be](https://www.kbs-frb.be/nl/Activities/Publications/2021/20210413PP)
- Dewulf, D. & Verlinden, E. (2019). *Aan de slag met buurtgerichte zorg.*
- Dierinck, P. (2020). *Handboek kwartiermaken.*
- Heylen, L., Van Damme, W., & Coussement, J. (2021). *Ondersteuningspakket zorgzame buurtanalyse.* [thomasmore.be](https://www.thomasmore.be/ondersteuningspakket-zorgzame-buurtanalyse)
- Pareit, L. (2015). *Draaiboek zorgnetwerken.* [ontknoop.be](https://www.ontknoop.be/)
- Plovie, E. & Heylen, L. (2020). *Buurtzorg in crisistijd: Wie al heeft, zal nog meer krijgen.*
- Pless, S. (2023). *Samenwerken rond zorgzame buurten.*

### Websites

- [Burennetwerk Amsterdam](https://www.burennetwerk.nl/) — Inspiration from the Netherlands

---

### Consulted Online Sources

- OpenAI ChatGPT (for code review, best practices, and troubleshooting)
- Stack Overflow (for community Q&A, code examples, and debugging):
  - [What I wish I had known about single page applications (SPA)](https://stackoverflow.blog/2021/12/28/what-i-wish-i-had-known-about-single-page-applications/)
  - [Stack Overflow Clone with React, Node.js, MongoDB (fab-c14/StackOverFlowClone)](https://github.com/fab-c14/StackOverFlowClone)
  - [IITG Stack Overflow (joat28/iitg-stack-overflow)](https://github.com/joat28/iitg-stack-overflow)
  - [How to connect React with Node.js backend?](https://stackoverflow.com/questions/48433783/how-to-connect-react-with-node-js-backend)
  - [Best practices for structuring a Node.js/Express project](https://stackoverflow.com/questions/37426848/best-practices-for-express-structure)
  

---

## Contributing

Contributions are welcome! Please read the [Code of Conduct](CODE_OF_CONDUCT.md) and open an issue or pull request. For major changes, discuss them first via an issue.

---

## Code of Conduct

We follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Please help us create a welcoming and respectful community.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

**Usage Restriction:**

Only the organization "Buren voor Buren" is permitted to use, adapt, and deploy this project. Any use must always credit the original author, KobeBerckmans. Use by other organizations or individuals is not allowed without explicit written permission from the author.

---

## Contact

- General contact: See the Contact page in the app for a list of regional coordinators.
- Email: [Add your email or contact form link here]
- Facebook: [Buren voor Buren Tienen Facebook](https://www.facebook.com/burenvoorburentienen)

---

## Author

- KobeBerckmans
