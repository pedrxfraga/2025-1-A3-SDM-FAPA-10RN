import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateDieta'>;

const CreateDietaScreen = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [calorias, setCalorias] = useState('');
  const [alimento, setAlimento] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(useCallback(() => {
    setNome(''); setCalorias(''); setAlimento('');
  }, []));

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/dieta/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, calorias: Number(calorias), alimento }),
    });
    navigation.navigate('Dieta');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Dieta</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      <Text style={styles.label}>Calorias</Text>
      <TextInput value={calorias} onChangeText={setCalorias} style={styles.input} keyboardType="numeric" />
      <Text style={styles.label}>Alimento</Text>
      <TextInput value={alimento} onChangeText={setAlimento} style={styles.input} />
      {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />}
      <Button title="Voltar" onPress={() => navigation.navigate('Dieta')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateDietaScreen;
