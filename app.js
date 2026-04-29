// --- SERA 1 VERİLERİNİ DİNLE ---
onValue(ref(db, 'sera1'), (snapshot) => {
    const data = snapshot.val();
    console.log("Sera 1 Gelen Veri:", data); // Tarayıcı konsolunda ne geldiğini gör
    if(data) {
        // ESP32'deki isimler: temp, hum, soil, ldr
        document.getElementById('temp1').innerText = data.temp !== undefined ? data.temp : "--";
        document.getElementById('hum1').innerText = data.hum !== undefined ? data.hum : "--";
        document.getElementById('soil1').innerText = data.soil !== undefined ? data.soil : "--";
        // LDR verisi için de bir yer eklemek istersen:
        console.log("Sera 1 Işık:", data.ldr);
    }
});

// --- SERA 2 VERİLERİNİ DİNLE ---
onValue(ref(db, 'sera2'), (snapshot) => {
    const data = snapshot.val();
    console.log("Sera 2 Gelen Veri:", data);
    if(data) {
        // DİKKAT: ESP32 hem sera1 hem sera2 için "temp" ismini kullanıyor.
        // Biz burada sera2 yolunda olduğumuz için yine data.temp diyoruz.
        document.getElementById('temp2').innerText = data.temp !== undefined ? data.temp : "--";
        document.getElementById('hum2').innerText = data.hum !== undefined ? data.hum : "--";
        document.getElementById('soil2').innerText = data.soil !== undefined ? data.soil : "--";
    }
});
