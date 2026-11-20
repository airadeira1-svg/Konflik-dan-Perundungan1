export type Category = 'Konflik' | 'Kekerasan' | 'Perundungan';

export interface QuestionItem {
  id: number;
  title: string;
  story: string;
  correctCategory: Category;
  explanation: string;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  shortCue: string;
  definition: string;
  traits: string[];
  accentText: string;
  accentBg: string;
  accentBorder: string;
  activeRing: string;
  softSurface: string;
}

export const CATEGORIES: Category[] = ['Konflik', 'Kekerasan', 'Perundungan'];

export const CATEGORY_INFO: Record<Category, CategoryMeta> = {
  Konflik: {
    id: 'Konflik',
    label: 'Konflik',
    shortCue: 'Perbedaan pendapat atau kepentingan setara',
    definition:
      'Perselisihan atau perbedaan pandangan, kebutuhan, atau kepentingan antara dua pihak atau lebih yang posisinya setara dan masih dapat diselesaikan lewat dialog atau negosiasi.',
    traits: [
      'Kedua pihak memiliki posisi atau kekuatan yang relatif setara',
      'Tidak ada niat sistematis untuk menindas atau melukai berulang',
      'Dapat diselesaikan melalui kompromi, mediasi, atau kesepakatan',
    ],
    accentText: 'text-sky-800',
    accentBg: 'bg-sky-600',
    accentBorder: 'border-sky-300',
    activeRing: 'ring-sky-600',
    softSurface: 'bg-sky-50',
  },
  Kekerasan: {
    id: 'Kekerasan',
    label: 'Kekerasan',
    shortCue: 'Tindakan agresif fisik, verbal, atau psikis sesaat',
    definition:
      'Perilaku agresif yang menyakiti fisik, merusak barang, atau melukai perasaan secara verbal maupun ancaman, biasanya muncul sebagai reaksi emosi sesaat (insiden tunggal).',
    traits: [
      'Bersifat impulsif atau reaksi ledakan amarah pada satu peristiwa',
      'Menimbulkan luka fisik, kerusakan benda, atau ketakutan seketika',
      'Bukan merupakan pola penindasan yang diulang terus-menerus',
    ],
    accentText: 'text-amber-800',
    accentBg: 'bg-amber-600',
    accentBorder: 'border-amber-300',
    activeRing: 'ring-amber-600',
    softSurface: 'bg-amber-50',
  },
  Perundungan: {
    id: 'Perundungan',
    label: 'Perundungan',
    shortCue: 'Penindasan sengaja, berulang, & timpang kuasa',
    definition:
      'Tindakan menyakiti fisik, verbal, sosial, maupun digital (cyberbullying) yang dilakukan secara sengaja, berulang dari waktu ke waktu, dan disertai ketidakseimbangan kuasa.',
    traits: [
      'Terjadi berulang kali secara konsisten (mingguan atau bulanan)',
      'Ada ketimpangan kuasa (jumlah lebih banyak, senioritas, atau fisik)',
      'Menimbulkan rasa takut, pengucilan, atau trauma mendalam bagi korban',
    ],
    accentText: 'text-rose-800',
    accentBg: 'bg-rose-600',
    accentBorder: 'border-rose-300',
    activeRing: 'ring-rose-600',
    softSurface: 'bg-rose-50',
  },
};

export const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    title: 'Berebut Lapangan',
    story:
      'Tim basket kelas 8A dan tim futsal kelas 8B sama-sama ingin menggunakan lapangan sekolah saat jam istirahat. Mereka sempat beradu argumen dengan nada tinggi sebelum akhirnya sepakat membagi waktu penggunaan lapangan.',
    correctCategory: 'Konflik',
    explanation:
      'Perbedaan kepentingan yang setara, ada negosiasi/solusi, tidak ada niat menyakiti.',
  },
  {
    id: 2,
    title: 'Ejekan Nama Orang Tua',
    story:
      'Setiap kali Andi melewati lorong kelas 9, sekelompok kakak kelas selalu memanggilnya dengan nama ayahnya sambil tertawa terbahak-bahak. Hal ini sudah berlangsung selama tiga bulan dan membuat Andi takut ke kantin.',
    correctCategory: 'Perundungan',
    explanation:
      'Dilakukan berulang (3 bulan), berkelompok (ketimpangan kuasa), dan menyakiti mental korban.',
  },
  {
    id: 3,
    title: 'Emosi Sesaat',
    story:
      'Karena tidak sengaja tersenggol saat berjalan terburu-buru di tangga, Riko langsung mendorong bahu Bima dengan keras hingga Bima terjatuh dan sikunya memar. Setelah dilerai, Riko menyesal dan meminta maaf.',
    correctCategory: 'Kekerasan',
    explanation:
      'Tindakan menyakiti fisik secara impulsif/satu kali akibat emosi, bukan pola berulang.',
  },
  {
    id: 4,
    title: 'Tugas Kelompok',
    story:
      'Dina dan Sari berbeda pendapat mengenai tema mading kelas. Dina ingin tema lingkungan, sedangkan Sari ingin tema teknologi. Keduanya bersikeras mempertahankan idenya masing-masing saat rapat kelas.',
    correctCategory: 'Konflik',
    explanation:
      'Perbedaan ide/pendapat dalam kerja sama tim yang wajar terjadi.',
  },
  {
    id: 5,
    title: 'Grup WhatsApp Rahasia',
    story:
      'Maya dikeluarkan dari grup WhatsApp kelas tanpa alasan. Ternyata, beberapa teman yang populer di kelas membuat grup baru khusus untuk menyebarkan foto-foto aib Maya dan menertawakannya setiap minggu.',
    correctCategory: 'Perundungan',
    explanation:
      'Cyberbullying yang terencana, berulang (setiap minggu), dan melibatkan tekanan kelompok.',
  },
  {
    id: 6,
    title: 'Melempar Penghapus',
    story:
      'Saat sedang kesal karena nilai ulangannya jelek, Doni melempar penghapus papan tulis ke arah teman sebangkunya yang sedang bercanda, hingga mengenai pelipis temannya tersebut.',
    correctCategory: 'Kekerasan',
    explanation:
      'Perilaku agresif fisik yang melukai orang lain akibat pelampiasan amarah sesaat.',
  },
  {
    id: 7,
    title: 'Pemalakan Uang Jajan',
    story:
      'Setiap hari Jumat, Tono yang bertubuh besar selalu mencegat Dimas di dekat gerbang belakang dan memaksa meminta uang Rp5.000 dengan ancaman akan dipukul jika melapor ke guru.',
    correctCategory: 'Perundungan',
    explanation:
      'Pemalakan berulang (setiap Jumat), ada ketimpangan fisik/kekuasaan, dan disertai ancaman.',
  },
  {
    id: 8,
    title: 'Salah Paham Pinjam Barang',
    story:
      'Laras marah kepada Nia karena pulpen kesayangannya hilang setelah dipinjam Nia. Nia merasa sudah mengembalikannya di atas meja Laras. Mereka pun saling mendiamkan selama dua hari.',
    correctCategory: 'Konflik',
    explanation:
      'Masalah komunikasi dan kesalahpahaman antar teman yang setara.',
  },
  {
    id: 9,
    title: 'Komentar Pedas di Media Sosial',
    story:
      'Setiap kali Putri mengunggah video menari di TikTok, akun-akun anonim milik teman satu sekolahnya selalu membanjiri kolom komentar dengan hinaan fisik seperti "gendut" dan "tidak tahu malu" secara terus-menerus.',
    correctCategory: 'Perundungan',
    explanation:
      'Penghinaan verbal di dunia maya (cyberbullying) yang dilakukan terus-menerus oleh banyak akun.',
  },
  {
    id: 10,
    title: 'Tendangan di Pertandingan',
    story:
      'Dalam pertandingan sepak bola antar-kelas yang memanas, seorang pemain sengaja menendang tulang kering pemain lawan karena kesal bolanya terus direbut. Wasit langsung memberinya kartu merah.',
    correctCategory: 'Kekerasan',
    explanation:
      'Agresi fisik yang disengaja di tengah pertandingan, namun merupakan insiden tunggal.',
  },
  {
    id: 11,
    title: 'Pilihan Ketua OSIS',
    story:
      'Pendukung calon ketua OSIS nomor 1 dan nomor 2 terlibat perdebatan sengit di koridor sekolah mengenai program kerja masing-masing calon yang dianggap tidak masuk akal.',
    correctCategory: 'Konflik',
    explanation:
      'Perbedaan pandangan/argumen dalam konteks kompetisi/demokrasi sekolah.',
  },
  {
    id: 12,
    title: 'Menyembunyikan Sepatu',
    story:
      'Selama dua minggu terakhir, sepatu olahraga milik Bayu selalu disembunyikan di tempat sampah oleh tiga orang temannya setiap kali pelajaran Penjaskes selesai. Bayu tidak berani melawan karena kalah jumlah.',
    correctCategory: 'Perundungan',
    explanation:
      'Perusakan/penyembunyian barang yang berulang (2 minggu) dan ketidakseimbangan jumlah (3 lawan 1).',
  },
  {
    id: 13,
    title: 'Teriakan Kasar',
    story:
      'Saat berdebat mengenai pembagian jadwal piket, Siska kehilangan kesabaran dan membentak Rina dengan kata-kata kasar di depan kelas.',
    correctCategory: 'Kekerasan',
    explanation:
      'Kekerasan verbal (membentak/kata kasar) yang terjadi karena ledakan emosi sesaat.',
  },
  {
    id: 14,
    title: 'Pengucilan Terencana',
    story:
      'Ketua geng di kelas 7C melarang semua anak perempuan di kelas untuk berbicara atau duduk sebangku dengan Wulan hanya karena Wulan berasal dari keluarga kurang mampu. Wulan selalu makan sendirian di pojok kelas setiap hari.',
    correctCategory: 'Perundungan',
    explanation:
      'Social bullying (pengucilan) yang sistematis, berulang, dan digerakkan oleh figur berkuasa (ketua geng).',
  },
  {
    id: 15,
    title: 'Rebutan Kursi Kantin',
    story:
      'Edo dan Fajar datang bersamaan ke satu-satunya meja kosong di kantin. Keduanya saling mengklaim bahwa mereka yang lebih dulu sampai dan menolak mengalah.',
    correctCategory: 'Konflik',
    explanation:
      'Perebutan sumber daya (kursi) antara dua pihak dengan posisi yang setara.',
  },
  {
    id: 16,
    title: 'Menjegal Kaki',
    story:
      'Di koridor yang ramai, Reza sengaja menjegal kaki Kevin yang bertubuh jauh lebih kecil darinya hingga Kevin tersungkur. Kejadian ini sudah sering dilakukan Reza setiap kali melihat Kevin membawa tumpukan buku.',
    correctCategory: 'Perundungan',
    explanation:
      'Kekerasan fisik yang menjadi pola berulang dan menyasar korban yang fisiknya lebih lemah.',
  },
  {
    id: 17,
    title: 'Merobek Buku Catatan',
    story:
      'Karena panik tidak sempat mengerjakan PR, Bagas merobek halaman buku catatan milik temannya yang menolak memberikan contekan.',
    correctCategory: 'Kekerasan',
    explanation:
      'Perusakan barang orang lain secara agresif karena emosi/panik sesaat.',
  },
  {
    id: 18,
    title: 'Julukan Buruk',
    story:
      'Sejak hari pertama masuk SMP, suara Caca yang cadel selalu ditirukan oleh teman-teman sekelasnya setiap kali ia diminta guru membaca di depan kelas, sehingga Caca kini selalu menangis jika disuruh maju.',
    correctCategory: 'Perundungan',
    explanation:
      'Pelecehan verbal berulang terhadap kekurangan fisik/bicara yang menimbulkan trauma pada korban.',
  },
  {
    id: 19,
    title: 'Perbedaan Selera Musik',
    story:
      'Saat kerja kelompok di rumah Budi, Anggota kelompok berdebat karena sebagian ingin belajar sambil memutar musik keras, sementara sebagian lagi membutuhkan suasana hening untuk berkonsentrasi.',
    correctCategory: 'Konflik',
    explanation:
      'Perbedaan kebutuhan dan kebiasaan belajar dalam satu kelompok.',
  },
  {
    id: 20,
    title: 'Ancaman di Chat',
    story:
      'Setelah kalah dalam game online melawan teman sekelasnya, Gilang mengirimkan pesan pribadi berisi ancaman akan mencegat dan memukuli temannya itu sepulang sekolah nanti.',
    correctCategory: 'Kekerasan',
    explanation:
      'Kekerasan psikologis/ancaman fisik yang muncul sebagai reaksi emosi tunggal setelah kalah bermain.',
  },
  {
    id: 21,
    title: 'Sebar Rumor Bohong',
    story:
      'Geng kakak kelas menyebarkan gosip bohong bahwa Dinda adalah pencuri uang kas kelas. Gosip ini terus diulang-ulang di berbagai kelas hingga Dinda dijauhi oleh hampir seluruh siswa.',
    correctCategory: 'Perundungan',
    explanation:
      'Pembunuhan karakter/rumor yang disebarkan berulang kali oleh kelompok yang lebih senior.',
  },
  {
    id: 22,
    title: 'Mencubit Lengan',
    story:
      'Karena merasa terganggu dengan suara ketukan pulpen temannya saat ujian berlangsung, Tari mencubit lengan temannya dengan sangat keras hingga membiru.',
    correctCategory: 'Kekerasan',
    explanation:
      'Tindakan fisik yang menyakiti akibat rasa kesal sesaat, tanpa ada relasi kuasa yang menindas terus-menerus.',
  },
  {
    id: 23,
    title: 'Kritik Tajam saat Presentasi',
    story:
      'Kelompok A memberikan kritik yang cukup pedas terhadap hasil karya Kelompok B saat sesi tanya jawab, membuat anggota Kelompok B tersinggung dan membalas dengan nada ketus.',
    correctCategory: 'Konflik',
    explanation:
      'Gesekan interpersonal akibat cara penyampaian kritik yang kurang tepat dalam diskusi.',
  },
  {
    id: 24,
    title: 'Perusakan Barang Berulang',
    story:
      'Tas sekolah milik Aris hampir setiap minggu dicoret-coret dengan tipe-x atau ditumpahi air minum oleh sekelompok siswa yang merasa Aris terlalu "sok pintar" di kelas.',
    correctCategory: 'Perundungan',
    explanation:
      'Perusakan barang milik korban yang dilakukan secara berkelompok dan berulang (hampir setiap minggu).',
  },
  {
    id: 25,
    title: 'Saling Dorong di Antrean',
    story:
      'Saat antre mengambil makan siang di acara study tour, dua siswa dari kelas berbeda saling dorong karena salah satu merasa antreannya diserobot oleh yang lain.',
    correctCategory: 'Konflik',
    explanation:
      'Perselisihan sesaat akibat aturan antrean yang dilanggar, posisi kedua pihak setara.',
  },
];
