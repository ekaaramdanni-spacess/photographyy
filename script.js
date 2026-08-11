// 1. Lazy Loading Gambar & Lightbox Setup
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".gallery-item img");
    
    // Memuat gambar asli saat halaman siap
    images.forEach(img => {
        if(img.getAttribute('data-src')) {
            img.setAttribute('src', img.getAttribute('data-src'));
        }
        
        // Pasang fungsi klik untuk membuka Lightbox
        img.parentElement.addEventListener("click", function() {
            openLightbox(img.getAttribute('src'));
        });
    });
});

// 2. Fungsi Kontrol Lightbox (Pop-up foto)
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// 3. Filter Kategori Portofolio
function filterGallery(category) {
    const items = document.querySelectorAll(".gallery-item");
    const buttons = document.querySelectorAll(".filter-btn");
    
    // Ubah status aktif tombol filter
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    // Sembunyikan atau tampilkan foto sesuai kategori
    items.forEach(item => {
        if (category === "all" || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// 4. Fitur Keamanan: Disable Klik Kanan dengan Notifikasi Kustom
let toastTimeout;

document.addEventListener("contextmenu", function(e) {
    if (e.target.tagName === "IMG") {
        e.preventDefault(); // Matikan fungsi klik kanan bawaan browser
        
        const toast = document.getElementById("custom-toast");
        
        if (toast) {
            // Bersihkan timeout sebelumnya jika user klik kanan berkali-kali
            clearTimeout(toastTimeout);
            
            // Munculkan notifikasi
            toast.classList.add("show");
            
            // Sembunyikan otomatis setelah 3 detik (3000 milidetik)
            toastTimeout = setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }
    }
});

// 5. Fitur: Navigasi Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Hanya jalankan jika targetnya adalah internal link (diawali #)
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Fitur: Before/After Gambar Slider yang Presisi
const sliderInput = document.getElementById('slider-input');
const beforeWrapper = document.getElementById('before-wrapper');
const sliderHandle = document.getElementById('slider-handle');
const imgBefore = document.querySelector('.img-before');

if (sliderInput && beforeWrapper && sliderHandle) {
    // Fungsi untuk memperbarui posisi geser
    const updateSlider = (value) => {
        beforeWrapper.style.width = `${value}%`;
        sliderHandle.style.left = `${value}%`;
    };

    // Jalankan fungsi setiap kali slider digeser
    sliderInput.addEventListener('input', (e) => {
        updateSlider(e.target.value);
    });

    // Menjaga ukuran foto "before" tetap pas saat ukuran browser berubah
    const resizeImage = () => {
        const containerWidth = beforeWrapper.parentElement.offsetWidth;
        imgBefore.style.width = `${containerWidth}px`;
    };

    window.addEventListener('resize', resizeImage);
    resizeImage(); // Jalankan sekali saat pertama dimuat
}
 // https://discord.com/api/webhooks/1536731197869265036/I2OOrJLKkZJ7W5mq3kE_Dm0l8dzCwjBXi0Ju8CFF2508ykc8mowTg6h2WJkKtnwwgHdB

// Fitur: Kirim Form Kontak ke Discord Webhook (Versi Bersih Tanpa Moodboard)
document.getElementById('discord-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // GANTI JADI URL WEBHOOK DISCORD ANDA
    const webhookURL = "https://discord.com/api/webhooks/1536731197869265036/I2OOrJLKkZJ7W5mq3kE_Dm0l8dzCwjBXi0Ju8CFF2508ykc8mowTg6h2WJkKtnwwgHdB";
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    const submitBtn = document.getElementById('submit-btn');
    const formContent = document.getElementById('form-content');
    const formSuccess = document.getElementById('form-success');

    // Ubah status tombol menjadi loading
    submitBtn.innerText = "TRANSMITTING...";
    submitBtn.disabled = true;

    // Struktur data ringkas hanya berisi informasi formulir kontak
    const discordData = {
        embeds: [{
            title: "📸 PESAN KOLABORASI BARU",
            color: 0x00ff66, /* Strip warna hijau neon radar */
            fields: [
                { name: "👤 Nama Pengirim", value: name, inline: true },
                { name: "✉️ Email", value: email, inline: true },
                { name: "💬 Isi Pesan", value: message }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    // Mengirim data ke server Discord
    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordData)
    })
    .then(response => {
        if (response.ok) {
            // Jalankan animasi sukses sinematik memudar
            formContent.classList.add("fade-out");
            
            setTimeout(() => {
                formContent.style.display = "none";
                formSuccess.classList.add("fade-in");
            }, 500);

            document.getElementById('discord-form').reset(); // Kosongkan form kembali
        } else {
            if (typeof showCustomToast === "function") showCustomToast("❌ Gagal mengirim pesan.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        if (typeof showCustomToast === "function") showCustomToast("⚠️ Kesalahan jaringan.");
    })
    .finally(() => {
        submitBtn.innerText = "Kirim Pesan";
        submitBtn.disabled = false;
    });
});

// 3. Filter Kategori Portofolio dengan Efek Animasi Mulus
function filterGallery(category) {
    const items = document.querySelectorAll(".gallery-grid .gallery-item");
    const buttons = document.querySelectorAll(".filter-container .filter-btn");
    
    // 1. Ubah status aktif pada tombol filter yang diklik
    buttons.forEach(btn => btn.classList.remove("active"));
    if (event && event.target) {
        event.target.classList.add("active");
    }

    // 2. Berikan efek memudar keluar (fade-out) ke SEMUA foto terlebih dahulu
    items.forEach(item => {
        item.classList.add("fade-out");
        item.classList.remove("fade-in");
    });

    // 3. Beri jeda 300 milidetik agar animasi fade-out selesai, baru pilah kategori
    setTimeout(() => {
        items.forEach(item => {
            // Periksa apakah kategori cocok atau tombol 'all' yang diklik
            if (category === "all" || item.classList.contains(category)) {
                item.style.display = "block"; // Tampilkan di struktur grid
                
                // Beri jeda mikro agar browser sempat merespons perubahan display sebelum fade-in
                setTimeout(() => {
                    item.classList.remove("fade-out");
                    item.classList.add("fade-in");
                }, 10);
            } else {
                item.style.display = "none"; // Sembunyikan total dari grid
            }
        });
    }, 300);
}

// Fitur: Efek Muncul Otomatis Saat Di-scroll (Intersection Observer)
document.addEventListener("DOMContentLoaded", function () {
    const targetElements = document.querySelectorAll(".reveal-element");

    // Pengaturan sensitivitas deteksi kamera scroll
    const observerOptions = {
        root: null, // Menggunakan layar browser sebagai acuan
        rootMargin: "0px",
        threshold: 0.15 // Animasi terpicu jika 15% bagian elemen sudah masuk ke layar
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen sudah masuk ke dalam jangkauan pandangan scroll
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop mengamati elemen ini karena animasi sudah berjalan (sekali jalan)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Daftarkan semua elemen berkelas .reveal-element ke dalam radar pendeteksi
    targetElements.forEach(element => {
        scrollObserver.observe(element);
    });
});

// Fitur: Simulasi Loading Screen Sinematik Layar Penuh
document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById("app-preloader");
    const progressBar = document.getElementById("preloader-progress");
    const progressText = document.getElementById("preloader-percentage");

    if (preloader && progressBar && progressText) {
        let count = 0;
        const targetDuration = 3000; // Total waktu muat: 3000ms (3 detik)
        const intervalTime = 30; // Interval pembaruan angka setiap 30ms
        const incrementStep = 100 / (targetDuration / intervalTime);

        // Jalankan interval perhitungan angka 0% sampai 100%
        const loadingInterval = setInterval(() => {
            count += incrementStep;
            
            if (count >= 100) {
                count = 100;
                clearInterval(loadingInterval);
                
                // Beri jeda mikro 200ms saat menyentuh angka 100% untuk kepuasan visual sebelum menghilang
                setTimeout(() => {
                    preloader.classList.add("fade-out");
                }, 200);
            }

            // Tempelkan hasil kalkulasi angka ke visual CSS dan Teks HTML
            const currentPercentage = Math.floor(count);
            progressBar.style.width = `${currentPercentage}%`;
            progressText.innerText = `${currentPercentage}%`;

        }, intervalTime);
    }
});

// Fitur: Buka/Tutup Kotak Feedback
function toggleFeedbackBox() {
    const box = document.getElementById("feedback-box");
    if (box) {
        box.style.display = box.style.display === "none" ? "block" : "none";
    }
}

// Fitur: Fungsi Pemanggil Notifikasi Kustom (Pengganti Alert)
let toastTimerGlobal;
function showCustomToast(message) {
    const toast = document.getElementById("custom-toast");
    if (toast) {
        clearTimeout(toastTimerGlobal);
        toast.innerText = message; // Isi teks notifikasi secara dinamis
        toast.classList.add("show");
        
        toastTimerGlobal = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000); // Hilang dalam 3 detik
    }
}

// Fitur: Kirim Feedback Anonim ke Discord Webhook
function sendAnonymousFeedback() {
    const text = document.getElementById("feedback-text").value;
    const btn = document.getElementById("feedback-send-btn");
    
    // Validasi input menggunakan Notifikasi Kustom
    if (!text.trim()) {
        showCustomToast("❌ Masukan tidak boleh kosong.");
        return;
    }
    
    // MASUKKAN URL WEBHOOK DISCORD KHUSUS UNTUK KRITIK/SARAN DI SINI
    const feedbackWebhook = "https://discord.com/api/webhooks/1536742608754450563/0hhtSNMcGmxESLdMbI9Gc7jPx44275hp2ehtZ4uilRgwjJCm49Jtce2VnzpZxj5Aa4HY";
    
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    fetch(feedbackWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            embeds: [{
                title: "📝 KRITIK & SARAN ANONIM BARU",
                description: text,
                color: 0xffaa00, // Warna strip kuning jingga hangat
                timestamp: new Date().toISOString()
            }]
        })
    })
    .then(response => {
        if (response.ok) {
            showCustomToast("🕊️ Terima kasih! Masukan Anda telah terkirim.");
            document.getElementById("feedback-text").value = ""; // Kosongkan kolom teks
            toggleFeedbackBox(); // Tutup kotak box
        } else {
            showCustomToast("❌ Gagal mengirim masukan.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showCustomToast("⚠️ Terjadi kesalahan jaringan.");
    })
    .finally(() => {
        btn.innerText = "Kirim Masukan";
        btn.disabled = false;
    });
}

// 4. FITUR KEAMANAN BERLAPIS: Blokir Klik Kanan, F12, & Shortcut Inspect Element

// A. Blokir Klik Kanan di Seluruh Halaman Web
document.addEventListener("contextmenu", function(e) {
    e.preventDefault(); // Matikan menu klik kanan bawaan browser
    
    // Panggil notifikasi kustom estetik yang sudah kita buat sebelumnya
    if (typeof showCustomToast === "function") {
        showCustomToast("🔒 Hak cipta dilindungi. Inspect Element dinonaktifkan.");
    }
});

// B. Blokir Tombol F12 dan Kombinasi Keyboard Inspect Element
document.addEventListener("keydown", function(e) {
    
    // 1. Blokir tombol F12 tunggal
    const isF12 = (e.key === "F12" || e.keyCode === 123);
    
    // 2. Blokir Ctrl + Shift + I (Inspect Element)
    const isInspectI = (e.ctrlKey && e.shiftKey && (e.key === "I" || e.keyCode === 73));
    
    // 3. Blokir Ctrl + Shift + J (Developer Console)
    const isConsoleJ = (e.ctrlKey && e.shiftKey && (e.key === "J" || e.keyCode === 74));
    
    // 4. Blokir Ctrl + U (View Page Source / Intip Kode)
    const isViewSourceU = (e.ctrlKey && (e.key === "U" || e.keyCode === 85));

    // Jika salah satu shortcut di atas ditekan oleh pengunjung
    if (isF12 || isInspectI || isConsoleJ || isViewSourceU) {
        e.preventDefault(); // Batalkan fungsi shortcut tersebut
        
        // Tampilkan notifikasi kustom agar pengunjung tahu sistem dilindungi
        if (typeof showCustomToast === "function") {
            showCustomToast("🔒 Proteksi Aktif: Akses kode dinonaktifkan.");
        }
    }
});
