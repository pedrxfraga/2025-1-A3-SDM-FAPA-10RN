// CreateTreinoScreen.tsx
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateTreino'>;

const CreateTreinoScreen = ({ navigation }: Props) => {
  const [aluno, setAluno] = useState('');
  const [exercicios, setExercicios] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [duracao, setDuracao] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setAluno('');
      setExercicios('');
      setGrupoMuscular('');
      setDuracao('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/treino/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aluno,
        exercicios,
        grupo_muscular: grupoMuscular,
        duracao,
      }),
    });
    setSaving(false);
    navigation.navigate('Treino');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Treino</Text>

      <Text style={styles.label}>Aluno</Text>
      <TextInput value={aluno} onChangeText={setAluno} style={styles.input} />

      <Text style={styles.label}>Exercícios</Text>
      <TextInput value={exercicios} onChangeText={setExercicios} style={styles.input} />

      <Text style={styles.label}>Grupo Muscular</Text>
      <TextInput value={grupoMuscular} onChangeText={setGrupoMuscular} style={styles.input} />

      <Text style={styles.label}>Duração</Text>
      <TextInput value={duracao} onChangeText={setDuracao} style={styles.input} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Treino')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateTreinoScreen;
