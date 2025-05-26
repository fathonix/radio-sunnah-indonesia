# Radio Sunnah Indonesia

Repositori ini menyimpan daftar radio internet Sunnah yang ada di Indonesia
dalam bentuk berkas M3U dan PLS, serta sebuah situs sederhana yang diadaptasi
dari situs resmi Webamp dan saya ketik dengan GNU Nano dalam beberapa jam.

# Panduan

Buka [tautan ini](https://fathonix.net/radio-sunnah) untuk memulai
mendengarkan. Untuk mengimpor daftar putar ini pada pemutar audio anda, unduh
daftar putar [M3U](assets/playlists/radio-sunnah-indonesia.m3u) atau
[PLS](assets/playlists/radio-sunnah-indonesia.pls) jika pemutar anda tidak
mendukung format M3U seperti Winamp lawas.

## Self-host menggunakan Docker

```bash
# Build Docker image
docker build -t radio-sunnah-indonesia .

# Jalankan container
docker run -d -p 24434:80 --name radio-sunnah --restart always radio-sunnah-indonesia
```

# Lisensi

Semua berkas disini bersifat Unlicense kecuali disebutkan tersendiri.

Webamp dan m3u-parser-generator menggunakan lisensi MIT.

Fon W95FA menggunakan lisensi SIL Open Font.

Ikon hati hijau berasal dari program Digital Quran Versi 3.2.
Hak cipta Sony Sugema rahimahullah 2003-2004.
