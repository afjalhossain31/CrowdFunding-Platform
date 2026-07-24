# 🚀 CROWDFUND — Crowdfunding Platform

# About
A full-stack crowdfunding platform where creators launch campaigns, supporters back them with credits, and admins manage the ecosystem. Built with Next.js, JavaScript, Express, MongoDB & Firebase Auth — role-based dashboards, Stripe payments, real-time notifications.

🔗 **Live Site:** [your-live-site-url-here](#)   
🔗 **Client / Server Repo:** [github.com/your-username/fundrise-client](#)  

### 🔑 Admin Credentials
- **Email:** admin@fundrise.com
- **Password:** Admin@123

---

## ✨ Key Features

- 🔐 Secure authentication with Firebase (email/password + Google Sign-In), with role-based access control (Supporter, Creator, Admin) enforced via JWT-verified middleware on the server.
- 🎯 Creators can launch campaigns with title, story, category, funding goal, deadline, and reward info — every new campaign starts as "pending" until admin approval.
- 💳 Supporters browse approved campaigns and contribute platform credits, with each contribution held as "pending" until the creator approves or rejects it.
- 💰 Automatic credit system — Supporters get 50 credits and Creators get 20 credits on registration, granted exactly once.
- 🏧 Built-in withdrawal system for creators (20 credits = $1) with a minimum threshold of 200 credits, supporting multiple payment methods (Stripe, Bkash, Rocket, Nagad).
- 🔔 Real-time notification system that alerts users on contribution approval/rejection, campaign approval/rejection, and withdrawal processing.
- 🖼️ Image uploads handled through ImgBB for both user profile pictures and campaign cover images — no broken links or local storage dependency.
- 📊 Role-specific dashboards with live stats — total campaigns, active campaigns, amount raised, pending contributions, and more.
- 📄 Paginated "My Contributions" page for Supporters to track every credit they've pledged, with clear status highlighting.
- 🛡️ Admin control center to approve/reject campaigns, manage user roles, process withdrawal requests, and resolve reports on suspicious campaigns.
- 📱 Fully responsive design across mobile, tablet, and desktop — including the dashboard layouts.
- 🔄 Persistent login — reloading any private/dashboard route never kicks the user back to the login page.
- 🎨 Consistent, animated UI built with Tailwind CSS, Framer Motion, and Swiper sliders for the hero and testimonial sections.

---

## 🛠️ Tech Stack

**Client:** JavaScript, Next.js (App Router), React, Tailwind CSS, Firebase Auth, Axios, Swiper, Framer Motion
**Server:** Node.js, Express.js, MongoDB, Firebase Admin SDK
**Payments:** Stripe
**Image Hosting:** ImgBB
**Deployment:** Vercel (client + server)

---

## 📁 Environment Variables

**Client (`.env.local`):**
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FB_API_KEY=
NEXT_PUBLIC_FB_AUTH_DOMAIN=
NEXT_PUBLIC_FB_PROJECT_ID=
NEXT_PUBLIC_FB_STORAGE_BUCKET=
NEXT_PUBLIC_FB_MESSAGING_ID=
NEXT_PUBLIC_FB_APP_ID=
NEXT_PUBLIC_IMGBB_KEY=
```

**Server (`.env`):**
```
PORT=5000
DB_USER=
DB_PASS=
DB_NAME=
STRIPE_SECRET_KEY=
FB_SERVICE_KEY=
CLIENT_URL=
```

---

## ⚙️ Run Locally

```bash
# Server
cd server
npm install
npm run dev

# Client
cd client
npm install
npm run dev
```
