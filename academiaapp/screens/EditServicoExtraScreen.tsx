// EditServicoExtraScreen.tsx
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditServicoExtra'>;

const EditServicoExtraScreen = ({ route, navigation }: Props) => {
  const { servicoExtra } = route.params;
  const [cliente, setCliente] = useState(servicoExtra.cliente);
  const [profissional, setProfissional] = useState(servicoExtra.profissional);
  const [servico, setServico] = useState(servicoExtra.servico);
  const [valor, setValor] = useState(servicoExtra.valor.toString());
  const [dataContrato, setDataContrato] = useState(servicoExtra.dataContrato);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCliente(servicoExtra.cliente);
    setProfissional(servicoExtra.profissional);
    setServico(servicoExtra.servico);
    setValor(servicoExtra.valor.toString());
    setDataContrato(servicoExtra.dataContrato);
  }, [servicoExtra]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/servicoextra/${servicoExtra.id}/`, {
      method: 'PUT',
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
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditServicoExtraScreen;
