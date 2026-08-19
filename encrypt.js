const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

if (!process.env.COOKIE_PASSWORD) {
  console.error('COOKIE_PASSWORD not set in .env');
  process.exit(1);
}

const key = crypto.scryptSync(process.env.COOKIE_PASSWORD, 'salt', 32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

const data = fs.readFileSync('cookies.json', 'utf8');
const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

fs.writeFileSync('cookies.enc', iv.toString('hex') + ':' + encrypted);
console.log('Done! cookies.json encrypted to cookies.enc — now delete cookies.json');
