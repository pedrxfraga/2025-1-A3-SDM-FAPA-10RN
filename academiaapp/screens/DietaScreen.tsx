import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Dieta'>;

export type Dieta = {
  id: number;
  nome: string;
  calorias: number;
  alimento: string; 
};

const DietaScreen = ({ navigation }: Props) => {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDietas = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/dieta/');
    const data = await response.json();
    setDietas(data);
    setLoading(false);
  };

  useFocusEffect(useCallback(() => { fetchDietas(); }, []));

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/dieta/${id}/`, { method: 'DELETE' });
    setDietas(prev => prev.filter(d => d.id !== id));
  };

  const renderItem = ({ item }: { item: Dieta }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text>Calorias: {item.calorias}</Text>
      <Text>Alimento: {item.alimento}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditDieta', { dieta: item })}>
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietas</Text>
      {loading ? <ActivityIndicator size="large" color="#4B7BE5" /> : (
        <FlatList
          data={dietas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateDieta')}>
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
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14 },
  row: { flexDirection: 'row', marginTop: 8, alignSelf: 'flex-end' },
});

export default DietaScreen;
