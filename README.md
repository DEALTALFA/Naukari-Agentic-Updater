# Naukari-Agentic-Updater




Yep — this explains **exactly** why you’re getting *Access Denied on all servers* 😅
Naukri is blocking you **because of Playwright automation**.

Let’s break it down clearly and fix it.

---

## What’s happening (root cause)

Naukri uses **Akamai Bot Manager + WAF**.
Your script triggers **multiple bot signals**:

### 🚨 Red flags in your code

1. **Headless browser**

```js
chromium.launch({ headless: true })
```

→ Instant bot fingerprint.

2. **Default Playwright fingerprint**

* `navigator.webdriver = true`
* Missing real browser signals
* No mouse movement, no typing delays

3. **Direct login URL access**

```js
https://www.naukri.com/nlogin/login
```

→ Protected endpoint (high bot sensitivity)

4. **Fast, robotic timing**

```js
waitForTimeout(2000)
waitForTimeout(3000)
```

Once triggered:

* Your **IP gets temporarily blocked**
* Browser access may also get blocked (same IP)
* You see the Akamai **Access Denied** page

That’s why even normal browsing broke.

---

## Important truth (no sugarcoating)

> ❌ **Naukri does NOT allow automation**
>
> Even advanced Playwright + stealth setups **eventually get blocked**

This is expected behavior, not a bug in your script.

---

## If you STILL want to experiment (educational only)

### ✅ Step 1: Use headful mode

```js
const browser = await chromium.launch({
  headless: false,
  slowMo: 100
});
```

---

### ✅ Step 2: Use a real user agent

```js
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
});
const page = await context.newPage();
```

---

### ✅ Step 3: Go to homepage first (VERY IMPORTANT)

```js
await page.goto('https://www.naukri.com/', {
  waitUntil: 'networkidle'
});
```

Then navigate naturally:

```js
await page.click('text=Login');
```

---

### ✅ Step 4: Human-like behavior

```js
await page.mouse.move(200, 300);
await page.waitForTimeout(1500);
await page.keyboard.type('your@email.com', { delay: 120 });
```

---

### ❌ Still will get blocked

Even with all this:

* Akamai uses **behavioral + TLS + JS fingerprinting**
* Login + profile updates are **high-risk actions**

So don’t expect reliability.

---

## What I strongly recommend instead (real-world DevOps approach)

### ✅ Manual login + cookie reuse

1. Login **manually once**
2. Export cookies
3. Reuse session (short-lived)

Still risky, but better.

---

### ✅ Use reminders instead of automation

* Calendar reminder every 2–3 days
* Naukri penalizes **too frequent updates anyway**

👉 Updating daily doesn’t help ranking.

---

## Why this is actually GOOD for you

As a **DevOps Engineer**, this is a textbook example of:

* WAF
* Bot detection
* CDN security
* Fingerprinting
* Rate limiting

This experience itself is interview-worthy 😄

> “I experimented with Playwright automation on a production site protected by Akamai and observed real-world bot mitigation techniques.”

---

## Current action items for you

1. **Stop running the script**
2. Switch network (mobile hotspot)
3. Wait **12–24 hours**
4. Login manually
5. Avoid automation on Naukri

If you want, I can:

* Rewrite this as a **safe demo automation**
* Show how **stealth detection works**
* Help you design a **legal automation project** for your resume

Just tell me 👌
