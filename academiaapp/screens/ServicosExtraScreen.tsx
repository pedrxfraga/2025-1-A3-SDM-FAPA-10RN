// ServicosExtraScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'ServicoExtra'>;

export type ServicoExtra = {
  id: number;
  cliente: string;       // poderia ser ID, mas aqui simplificado
  profissional: string;  // personal, nutricionista, etc.
  servico: string;       // nome do serviço
  valor: number;
  dataContrato: string;  // data da contratação
};

const ServicosExtraScreen = ({ navigation }: Props) => {
  const [servicos, setServicos] = useState<ServicoExtra[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServicos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/servicoextra/');
    const data = await response.json();
    setServicos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchServicos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/servicoextra/${id}/`, { method: 'DELETE' });
    setServicos(prev => prev.filter(s => s.id !== id));
  };

  const renderItem = ({ item }: { item: ServicoExtra }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Cliente: {item.cliente}</Text>
      <Text>Profissional: {item.profissional}</Text>
      <Text>Serviço: {item.servico}</Text>
      <Text>Valor: R$ {item.valor.toFixed(2)}</Text>
      <Text>Data: {item.dataContrato}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditServicoExtra', { servicoExtra: item })}
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
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços Extras</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateServicoExtra')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333', alignSelf: 'center' },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: { color: '#fff', fontWeight: '500' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  row: { flexDirection: 'row', marginTop: 8, alignSelf: 'flex-end' },
});

export default ServicosExtraScreen;
