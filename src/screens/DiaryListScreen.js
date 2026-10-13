import React, { useMemo, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  useWindowDimensions,
  Image 
} from 'react-native';

import DiaryCard from '../components/DiaryCard';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';
import DiaryDetailModal from '../components/DiaryDetailModal'; 

const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Bangun lebih pagi...',
    body: 'Catatan lengkap: Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk dan menyegarkan pikiran sebelum mulai beraktivitas.',
    // Sesuai instruksi gambar, data sekarang membutuhkan moodUri dan heroUri
    // Saya tetap menyisipkan fallback require() jika ingin pakai gambar lokal untuk tugas
    moodUri: require('../../assets/moods/happy.png'), 
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
    mood: 'happy',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul...',
    body: 'Kemajuan proyek: Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru yang didapatkan hari ini.',
    moodUri: { uri: 'https://picsum.photos/seed/focus/200' },
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
    mood: 'focus',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Membaca buku...',
    body: 'Refleksi singkat: Menikmati senja sambil membaca buku favorit. Warna langit sangat indah membuat pikiran menjadi tenang.',
    moodUri: { uri: 'https://picsum.photos/seed/calm/200' },
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
    mood: 'calm',
  },
  {
    id: 4,
    title: 'Hujan Deras',
    date: '2025-10-03',
    preview: 'Hujan deras turun...',
    body: 'Hujan deras turun sejak siang. Menghabiskan waktu dengan menonton film dan minum cokelat panas di dalam kamar.',
    moodUri: { uri: 'https://picsum.photos/seed/sad/200' },
    heroUri: 'https://picsum.photos/seed/sadhero/800/450',
    mood: 'sad',
  },
  {
    id: 5,
    title: 'Proyek Selesai!',
    date: '2025-10-02',
    preview: 'Akhirnya proyek...',
    body: 'Akhirnya proyek akhir bulan ini selesai dan dipresentasikan dengan lancar. Sangat lega rasanya bisa bernapas lega.',
    moodUri: { uri: 'https://picsum.photos/seed/excited/200' },
    heroUri: 'https://picsum.photos/seed/excitedhero/800/450',
    mood: 'excited',
  },
];

export default function DiaryListScreen() {
  // Hook untuk menentukan dimensi layar
  const { width } = useWindowDimensions();
  // Jika lebar layar >= 600px (tablet), maka twoCols bernilai true
  const twoCols = width >= BREAKPOINTS.tablet;
  
  // State untuk menyimpan data yang dipilih untuk ditampilkan di Modal
  const [selected, setSelected] = useState(null);

  // Fungsi untuk merender setiap item/kartu
  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        // Pastikan prop di DiaryCard Anda bernama imageSource (sesuai perbaikan sebelumnya)
        imageSource={item.moodUri} 
        mood={item.mood}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  // useMemo untuk merestart/mengatur ulang FlatList saat jumlah kolom berubah (dari 1 ke 2 atau sebaliknya)
  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  return (
    <View style={styles.container}>
      {/* Header dengan Avatar (Tambahan Tugas) */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Buku Harian</Text>
        <Image 
          source={{ uri: 'https://picsum.photos/seed/avatar/100' }} 
          style={styles.avatar} 
        />
      </View>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        // Jarak antar kolom jika menggunakan mode grid (2 kolom)
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          gap: SPACE.m,
          paddingTop: SPACE.m, // Sedikit diubah agar tidak menabrak header
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />

      {/* Komponen Modal untuk menampilkan detail saat kartu ditekan */}
      {/* Jika file DiaryDetailModal belum dibuat, Anda bisa memberikan komentar (//) pada blok di bawah ini */}
      <DiaryDetailModal
        visible={!!selected} // Bernilai true jika ada item yang 'selected'
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.surface 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  itemWrap: { 
    flex: 1 
  },
  itemWrap2: { 
    flex: 1 / 2 // Lebar 50% untuk setiap kartu di mode tablet
  },
  empty: { 
    textAlign: 'center', 
    color: COLORS.muted, 
    marginTop: 40 
  },
});