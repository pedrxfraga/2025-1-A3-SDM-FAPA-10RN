// PersonalScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Nutricionista'>;

export type Nutricionista = {
  id: number;
  name: string;
  crn: string;
};

const NutricionistaScreen = ({ navigation }: Props) => {
  const [nutricionistas, setNutricionistas] = useState<Nutricionista[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNutricionistas = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/Nutricionista/');
    const data = await response.json();
    setNutricionistas(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchNutricionistas();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/Nutricionista/${id}/`, {
      method: 'DELETE',
    });
    setNutricionistas(prev => prev.filter(p => p.id !== id));
  };

  const renderItem = ({ item }: { item: Nutricionista }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.crn}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditNutricionista', { nutricionista: item })}
      >
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.editText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutricionistas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={nutricionistas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePersonal')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333', alignSelf: 'center' },
  card: { backgroundColor: '#f0f4ff', padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginTop: 10 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6, marginTop: 6 },
  editText: { color: '#fff', fontWeight: '500', textAlign: 'center' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14 },
});

export default NutricionistaScreen;