import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { Icon, PaperProvider } from "react-native-paper";
import Home from './components/Home/Home';
import Login from "./components/User/Login";
import { useContext, useReducer } from "react";
import { MyDispatchContext, MyUserConText } from "./configs/Contexts";
import MyUserReducer from "./reducers/MyUserReducer";
import Register from "./components/User/Register";
import VehicleList from "./components/Vehicles/VehicleList";
import Profile from "./components/User/Profile";
import Wallet from "./components/User/Wallet";
import TransactionOptions from "./components/User/TransactionOptions";
import FeeRole from "./components/FeeRole/FeeRole";
import FeeRoleDetail from "./components/FeeRole/FeeRoleDetail";
import ProfileUpdate from "./components/User/ProfileUpdate";
import VehicleCreate from "./components/Vehicles/VehicleCreate";
import Toast from "react-native-toast-message";
import VehicleDetail from "./components/Vehicles/VehicleDetail";
import MainAdmin from "./components/Admin/MainAdmin";
import { Ionicons } from "@expo/vector-icons";
import UserAdmin from "./components/Admin/UserAdmin";
import RevenueByUser from "./components/Admin/RevenueByUser";


const Stack = createNativeStackNavigator();

const HomeStachNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: "Trang chủ", headerShown: false }} />
    </Stack.Navigator>
  )
}

const LoginStachNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const VehicleStachNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VehicleList" component={VehicleList} options={{ headerShown: false }} />
      <Stack.Screen name="FeeRole" component={FeeRole} options={{ headerShown: false }} />
      <Stack.Screen name="FeeRoleDetail" component={FeeRoleDetail} options={{ headerShown: false }} />
      <Stack.Screen name="VehicleCreate" component={VehicleCreate} options={{ headerShown: false }} />
      <Stack.Screen name="VehicleDetail" component={VehicleDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const ProfileStachNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const WalletStachNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
      <Stack.Screen name="TransactionOptions" component={TransactionOptions} />
    </Stack.Navigator>
  )
}

const AdminStachNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainAdmin" component={MainAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="RevenueByUser" component={RevenueByUser} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


const Tab = createBottomTabNavigator()
const TabNavigator = () => {
  const user = useContext(MyUserConText)
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {(user == null || user._j == null) ? <>
        <Tab.Screen name="tab-login" component={LoginStachNavigator} options={{ tabBarStyle: { display: 'none' } }} />
      </> : <>
        <Tab.Screen name="tab-home" component={HomeStachNavigator} options={{ title: "Trang chủ", tabBarIcon: () => <Icon size={24} source="home" /> }} />
        <Tab.Screen name="tab-vehicle" component={VehicleStachNavigator} options={{ title: "Phương tiện", tabBarIcon: () => <Icon size={24} source="car" /> }} />
        {(user._j.user_role === 'ADMIN' || user._j.user_role === 'STAFF') &&
          <Tab.Screen name="tab-admin" component={AdminStachNavigator} options={{ title: "Quản lý", tabBarIcon: () => <Ionicons name="stats-chart-outline" size={24} /> }} />
        }
        <Tab.Screen name="tab-wallet" component={WalletStachNavigator} options={{ title: "Ví", tabBarIcon: () => <Icon size={24} source="wallet" /> }} />
        <Tab.Screen name="tab-profile" component={ProfileStachNavigator} options={{ title: "Profile", tabBarIcon: () => <Icon size={24} source="account" /> }} />
      </>
      }
    </Tab.Navigator>
  )
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <PaperProvider>
      <MyUserConText.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
          <Toast />
        </MyDispatchContext.Provider>
      </MyUserConText.Provider>
    </PaperProvider>
  );
}

export default App;
