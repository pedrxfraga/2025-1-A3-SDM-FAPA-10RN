import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateServicoExtra'>;

const CreateServicoExtraScreen = ({ navigation }: Props) => {
  const [cliente, setCliente] = useState('');
  const [profissional, setProfissional] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [dataContrato, setDataContrato] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCliente('');
      setProfissional('');
      setServico('');
      setValor('');
      setDataContrato('');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/servicoextra/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente,
        profissional,
        servico,
        valor: parseFloat(valor),
        dataContrato,
      }),
    });
    navigation.navigate('ServicoExtra');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Serviço Extra</Text>

      <Text style={styles.label}>Cliente</Text>
      <TextInput value={cliente} onChangeText={setCliente} style={styles.input} />

      <Text style={styles.label}>Profissional</Text>
      <TextInput value={profissional} onChangeText={setProfissional} style={styles.input} />

      <Text style={styles.label}>Serviço</Text>
      <TextInput value={servico} onChangeText={setServico} style={styles.input} />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data do Contrato</Text>
      <TextInput value={dataContrato} onChangeText={setDataContrato} style={styles.input} placeholder="YYYY-MM-DD" />

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate('ServicoExtra')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default CreateServicoExtraScreen;
