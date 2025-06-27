// EditClienteScreen.tsx
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditCliente'>;

const EditClienteScreen = ({ route, navigation }: Props) => {
  const { cliente } = route.params;
  const [nome, setNome] = useState(cliente.nome);
  const [idade, setIdade] = useState(cliente.idade.toString());
  const [conta, setConta] = useState(cliente.conta);
  const [endereco, setEndereco] = useState(cliente.endereco);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(cliente.nome);
    setIdade(cliente.idade.toString());
    setConta(cliente.conta);
    setEndereco(cliente.endereco);
  }, [cliente]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/clientes/${cliente.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        idade: parseInt(idade, 10),
        conta,
        endereco,
      }),
    });
    navigation.navigate('Cliente');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Idade</Text>
      <TextInput
        value={idade}
        onChangeText={setIdade}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Conta</Text>
      <TextInput value={conta} onChangeText={setConta} style={styles.input} />

      <Text style={styles.label}>Endereço</Text>
      <TextInput value={endereco} onChangeText={setEndereco} style={styles.input} />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Cliente')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditClienteScreen;
