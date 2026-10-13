import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Properti moodUri diubah menjadi imageSource untuk mendukung gambar lokal maupun remote
// Properti mood ditambahkan untuk memvariasikan warna kartu
export default function DiaryCard({ title, date, preview, imageSource, mood }) {
  
  // Fungsi penentu warna border dan background berdasarkan mood
  const getMoodStyle = (moodType) => {
    switch (moodType) {
      case 'happy':
        return { borderColor: '#fde047', backgroundColor: '#fefce8' }; // Kuning
      case 'focus':
        return { borderColor: '#93c5fd', backgroundColor: '#eff6ff' }; // Biru
      case 'calm':
        return { borderColor: '#86efac', backgroundColor: '#ecfdf5' }; // Hijau
      case 'sad':
        return { borderColor: '#d1d5db', backgroundColor: '#f9fafb' }; // Abu-abu
      case 'excited':
        return { borderColor: '#fca5a5', backgroundColor: '#fef2f2' }; // Merah
      default:
        return { borderColor: '#e5e7eb', backgroundColor: '#ffffff' };
    }
  };

  return (
    // Menggabungkan style bawaan (styles.card) dengan style dinamis (getMoodStyle)
    <View style={[styles.card, getMoodStyle(mood)]}>
      <Image source={imageSource} style={styles.moodImg} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
          {preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderWidth: 2, // Dipertebal sedikit agar warnanya lebih terlihat
    borderRadius: 12,
    marginBottom: 12,
  },
  moodImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
    color: '#4b5563',
  },
});