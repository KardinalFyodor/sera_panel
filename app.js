import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Senin Firebase Bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyC8fZJy0OQHOwyz3waOxjVYOnT8S9EJOVM",
  authDomain: "greenhouse-ecbe0.firebaseapp.com",
  databaseURL: "https://greenhouse-ecbe0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "greenhouse-ecbe0",
  storageBucket: "greenhouse-ecbe0.firebasestorage.app",
  messagingSenderId: "991514715635",
  appId: "1:991514715635:web:8094bd359201617c4c1e86"
};

// Firebase'i Başlat
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- VERİLERİ ANLIK ÇEKME ---

// Sera 1 Verilerini Dinle
onValue(ref(db, 'sera1'), (snapshot) => {
    const data = snapshot.val();
    if(data) {
        document.getElementById('temp1').innerText = data.temp || "--";
        document.getElementById('hum1').innerText = data.hum || "--";
        document.getElementById('soil1').innerText = data.soil || "--";
        // Klima/Işık durumu veritabanında varsa buton yazısını güncelle
        if(data.klima) document.getElementById('klima1-durum').innerText = data.klima;
        if(data.isik) document.getElementById('isik1-durum').innerText = data.isik;
    }
});

// Sera 2 Verilerini Dinle
onValue(ref(db, 'sera2'), (snapshot) => {
    const data = snapshot.val();
    if(data) {
        document.getElementById('temp2').innerText = data.temp2 || "--"; // ESP kodunda temp2 olabilir, kontrol et
        document.getElementById('hum2').innerText = data.hum2 || "--";
        document.getElementById('soil2').innerText = data.soil2 || "--";
        if(data.klima) document.getElementById('klima2-durum').innerText = data.klima;
        if(data.isik) document.getElementById('isik2-durum').innerText = data.isik;
    }
});

// --- BUTON KONTROL FONKSİYONU ---
window.kontrolEt = function(seraYolu, cihaz) {
    const suAnkiDurum = document.getElementById(cihaz + (seraYolu === 'sera1' ? '1' : '2') + '-durum').innerText;
    const yeniDurum = suAnkiDurum === "AÇIK" ? "KAPALI" : "AÇIK";

    // Firebase'e gönder (Örn: sera1/klima -> "AÇIK")
    update(ref(db, seraYolu), {
        [cihaz]: yeniDurum
    }).then(() => {
        console.log(cihaz + " durumu güncellendi: " + yeniDurum);
    });
}