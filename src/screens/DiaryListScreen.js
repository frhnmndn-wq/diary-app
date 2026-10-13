import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import DiaryCard from '../components/DiaryCard';

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    // MENGGUNAKAN GAMBAR LOKAL SESUAI TUGAS (Pastikan file ini ada di proyek Anda!)
    imageSource: require('../../assets/moods/happy.png'), 
    mood: 'happy',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    imageSource: { uri: 'https://picsum.photos/seed/focus/80' },
    mood: 'focus',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    imageSource: { uri: 'https://picsum.photos/seed/calm/80' },
    mood: 'calm',
  },
  // TAMBAHAN ENTRI BARU 1
  {
    id: 4,
    title: 'Hujan Deras',
    date: '2025-10-03',
    preview: 'Hujan deras turun sejak siang. Menghabiskan waktu dengan menonton film dan minum cokelat panas.',
    imageSource: { uri: 'https://picsum.photos/seed/sad/80' },
    mood: 'sad',
  },
  // TAMBAHAN ENTRI BARU 2
  {
    id: 5,
    title: 'Proyek Selesai!',
    date: '2025-10-02',
    preview: 'Akhirnya proyek akhir bulan ini selesai dan dipresentasikan dengan lancar. Sangat lega rasanya.',
    imageSource: { uri: 'https://picsum.photos/seed/excited/80' },
    mood: 'excited',
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* HEADER DENGAN AVATAR PENGGUNA */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Buku Harian</Text>
        <Image 
          source={{ uri: 'https://picsum.photos/seed/avatar/100' }} 
          style={styles.avatar} 
        />
      </View>
      
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          imageSource={entry.imageSource}
          mood={entry.mood}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  // Style baru untuk mengatur posisi teks header dan avatar sejajar
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  // Style untuk avatar pengguna
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2566EB',
  }
});