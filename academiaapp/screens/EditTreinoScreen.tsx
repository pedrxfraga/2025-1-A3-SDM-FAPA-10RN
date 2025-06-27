import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditTreino'>;

const EditTreinoScreen = ({ route, navigation }: Props) => {
  const { treino } = route.params;
  const [aluno, setAluno] = useState(treino.aluno);
  const [exercicios, setExercicios] = useState(treino.exercicios);
  const [grupoMuscular, setGrupoMuscular] = useState(treino.grupo_muscular);
  const [duracao, setDuracao] = useState(treino.duracao);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setAluno(treino.aluno);
    setExercicios(treino.exercicios);
    setGrupoMuscular(treino.grupo_muscular);
    setDuracao(treino.duracao);
  }, [treino]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/treino/${treino.id}/`, {
      method: 'PUT',
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
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditTreinoScreen;