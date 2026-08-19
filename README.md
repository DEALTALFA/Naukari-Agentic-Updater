# Naukri Agentic Updater

Automates Naukri profile updates using Playwright, triggered via GitHub Actions every 40 minutes. Keeps your profile "recently updated" to improve recruiter visibility.

---

## What it does

1. Launches a headful Chromium browser with a real user-agent
2. Injects encrypted session cookies to skip login
3. Navigates to Naukri homepage
4. Opens your profile and saves the Resume Headline (triggers "profile updated")
5. Clears the Expected Salary filter if visible
6. Uploads screenshots as artifacts for every run

---

## Project Structure

```
├── agent.js          # Main automation script
├── encrypt.js        # One-time script to encrypt cookies.json → cookies.enc
├── cookies.enc       # AES-256 encrypted session cookies (safe to commit)
├── .github/
│   └── workflows/
│       └── update.yml  # GitHub Actions workflow (runs every 40 min)
├── .env              # Local secrets (never commit)
├── .gitignore
└── package.json
```

---

## Security Model

Session cookies are encrypted using **AES-256-CBC** before being committed to the repo.

| File | Committed | Why |
|------|-----------|-----|
| `cookies.enc` | ✅ Yes | Encrypted — useless without password |
| `encrypt.js` | ✅ Yes | Encryption utility |
| `cookies.json` | ❌ No | Raw cookies — gitignored |
| `.env` | ❌ No | Plaintext secrets — gitignored |

The decryption password (`COOKIE_PASSWORD`) is stored only in GitHub Actions Secrets and never touches the codebase.

---

## Local Setup

**1. Install dependencies**
```bash
npm install
npx playwright install chromium
```

**2. Create `.env`**
```
COOKIE_PASSWORD=your_strong_password_here
```

**3. Export cookies from your browser**

Use a browser extension like [EditThisCookie](https://www.editthiscookie.com/) or [Cookie-Editor](https://cookie-editor.com/) to export Naukri cookies as JSON → save as `cookies.json`

**4. Encrypt cookies**
```bash
node encrypt.js
```

This creates `cookies.enc`. Delete `cookies.json` after.

**5. Run locally**
```bash
node agent.js
```

---

## GitHub Actions Setup

The workflow runs automatically every 40 minutes via cron.

**Add these secrets in GitHub → Repo → Settings → Secrets and variables → Actions:**

| Secret | Value |
|--------|-------|
| `COOKIE_PASSWORD` | Password used to encrypt `cookies.enc` |
| `NAUKRI_USER` | Your Naukri email |
| `NAUKRI_PASS` | Your Naukri password |

Screenshots from each run are uploaded as artifacts (`Naukri-screenshots`) for debugging.

---

## Re-encrypting Cookies

Naukri sessions expire periodically. When the script stops working:

1. Log in to Naukri manually
2. Export fresh cookies → `cookies.json`
3. Run `node encrypt.js`
4. Commit and push the new `cookies.enc`
5. Delete `cookies.json`

---

## Tech Stack

- [Playwright](https://playwright.dev/) — browser automation
- Node.js `crypto` — AES-256-CBC cookie encryption
- GitHub Actions — scheduled execution
- dotenv — local secret management

---

## Disclaimer

This project is for **educational purposes**. Naukri's ToS does not permit automation. Use at your own risk.
