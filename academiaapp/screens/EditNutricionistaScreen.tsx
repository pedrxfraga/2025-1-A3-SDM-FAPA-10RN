// EditNutricionistaScreen.tsx
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditNutricionista'>;

const EditNutricionistaScreen = ({ route, navigation }: Props) => {
  const { nutricionista } = route.params;
  const [name, setName] = useState(nutricionista.name);
  const [crn, setCrn] = useState(nutricionista.crn);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(nutricionista.name);
    setCrn(nutricionista.crn);
  }, [nutricionista]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/nutricionista/${nutricionista.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, crn }),
    });
    navigation.navigate('Nutricionista');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>CRN</Text>
      <TextInput value={crn} onChangeText={setCrn} style={styles.input} />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Nutricionista')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditNutricionistaScreen;
