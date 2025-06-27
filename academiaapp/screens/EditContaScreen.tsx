import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditConta'>;

const EditContaScreen = ({ route, navigation }: Props) => {
  const { conta } = route.params;
  const [username, setUsername] = useState(conta.username);
  const [nome, setNome] = useState(conta.nome);
  const [sobrenome, setSobrenome] = useState(conta.sobrenome);
  const [email, setEmail] = useState(conta.email);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUsername(conta.username);
    setNome(conta.nome);
    setSobrenome(conta.sobrenome);
    setEmail(conta.email);
  }, [conta]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/conta/${conta.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, nome, sobrenome, email }),
    });
    setSaving(false);
    navigation.navigate('Conta');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuário</Text>
      <TextInput value={username} onChangeText={setUsername} style={styles.input} />

      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Sobrenome</Text>
      <TextInput value={sobrenome} onChangeText={setSobrenome} style={styles.input} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('Conta')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditContaScreen;