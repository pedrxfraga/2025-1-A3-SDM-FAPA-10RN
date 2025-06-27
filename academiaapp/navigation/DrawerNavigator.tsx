import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import CategoriesScreen, { Category } from '../screens/CategoriesScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import EditCategoryScreen from '../screens/EditCategoryScreen';
import HomeScreen from '@/screens/HomeScreen';
import PersonalScreen, { Personal } from "@/screens/PersonalScreen";
import EditPersonalScreen from "../screens/EditPersonalScreen";
import CreatePersonalScreen from "../screens/CreatePersonalScreen";
import NutricionistaScreen, { Nutricionista } from "@/screens/NutricionistaScreen";
import EditNutricionistaScreen from "@/screens/EditNutricionistaScreen";
import CreateNutricionistaScreen from "@/screens/CreateNutricionistaScreen";
import TreinoScreen, { Treino } from '../screens/TreinoScreen' ;
import EditTreinoScreen from '@/screens/EditTreinoScreen';
import CreateTreinoScreen from '@/screens/CreateTreinoScreen';
import ContaScreen, { Conta } from '@/screens/ContaScreen';
import CreateContaScreen from '@/screens/CreateContaScreen';
import EditContaScreen from '@/screens/EditContaScreen';
import DietaScreen, { Dieta } from '@/screens/DietaScreen';
import CreateDietaScreen from '@/screens/CreateDietaScreen';
import EditDietaScreen from '@/screens/EditDietaScreen';
import ServicoExtraScreen, { ServicoExtra } from '@/screens/ServicoExtraScreen';
import CreateServicoExtraScreen from '@/screens/CreateServicoExtraScreen';
import EditServicoExtraScreen from '@/screens/EditServicoExtraScreen';




export type DrawerParamList = {
  Home: undefined;  
  Categories: undefined;
  CreateCategory: undefined; 
  EditCategory: { category: Category };
  Personal: undefined; 
  EditPersonal:{ personal : Personal };
  CreatePersonal:undefined; 
  Nutricionista: undefined; 
  CreateNutricionista: undefined;
  EditNutricionista: { nutricionista : Nutricionista };
  Treino: undefined;
  CreateTreino: undefined;
  EditTreino: { treino : Treino };
  Conta: undefined;
  CreateConta: undefined;
  EditConta: { conta : Conta };
  Dieta: undefined;
  CreateDieta: undefined;
  EditDieta: { dieta : Dieta };
  ServicoExtra: undefined;
  CreateServicoExtra: undefined;
  EditServicoExtra: { servicoExtra : ServicoExtra };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Categorias',
        }}
      />
      <Drawer.Screen
        name="CreateCategory"
        component={CreateCategoryScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova categoria' }}
      />
      <Drawer.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar categoria' }}
      />
      <Drawer.Screen
        name="Personal"
        component={PersonalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Personal' }}
      />
      <Drawer.Screen
        name="EditPersonal"
        component={EditPersonalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar categoria' }}
      />
      <Drawer.Screen
        name="CreatePersonal"
        component={CreatePersonalScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Criar categoria' }}
      />
      <Drawer.Screen
        name="Nutricionista"
        component={NutricionistaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nutricionista' }}
      />
      <Drawer.Screen
        name="EditNutricionista"
        component={EditNutricionistaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar categoria' }}
      />
      <Drawer.Screen
        name="CreateNutricionista"
        component={CreateNutricionistaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Criar categoria' }}
      />
      <Drawer.Screen
        name="Treino"
        component={TreinoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Treino' }}
      />
      <Drawer.Screen
        name="CreateTreino"
        component={CreateTreinoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'CreateTreino' }}
      />
      <Drawer.Screen
        name="EditTreino"
        component={EditTreinoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'CreateTreino' }}
      />
      <Drawer.Screen
        name="Conta"
        component={ContaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Conta' }}
      />
       <Drawer.Screen
        name="CreateConta"
        component={CreateContaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'CreateConta' }}
      />
       <Drawer.Screen
        name="EditConta"
        component={EditContaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'EditConta' }}
      />
      <Drawer.Screen
        name="Dieta"
        component={DietaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Dieta' }}
      />
       <Drawer.Screen
        name="CreateDieta"
        component={CreateDietaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'CreateDieta' }}
      />
       <Drawer.Screen
        name="EditDieta"
        component={EditDietaScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'EditDieta' }}
      />
      <Drawer.Screen
        name="ServicoExtra"
        component={ServicoExtraScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'ServicoExtra' }}
      />
       <Drawer.Screen
        name="CreateServicoExtra"
        component={CreateServicoExtraScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'CreateServicoExtra' }}
      />
       <Drawer.Screen
        name="EditServicoExtra"
        component={EditServicoExtraScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'EditServicoExtra' }}
      />
      
        
    </Drawer.Navigator> 
          
    
  );
};

export default DrawerNavigator;