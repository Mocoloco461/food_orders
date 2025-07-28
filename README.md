# 📷 Barcode Scanner Web App

מערכת Web לזיהוי ברקודים באמצעות מצלמה באייפד, ללא התקנות – רק להריץ עם Docker.

---

## 🚀 הרצה מהירה

```bash
# clone
 git clone https://github.com/YOUR_USERNAME/barcode-scanner
 cd barcode-scanner
 docker-compose up --build
```

גלוש לכתובת:
http://<כתובת ה־IP של המחשב שלך>:3000

לדוגמה: http://192.168.1.42:3000 באייפד (חייב להיות באותה רשת Wi-Fi)

---

🛠 טכנולוגיות
 * Node.js + Express
 * Socket.IO
 * @zxing/browser
 * Docker + docker-compose

---

📁 מבנה הפרויקט

```
.
├── Dockerfile
├── docker-compose.yml
├── server.js
├── package.json
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
└── README.md
```
