import { StyleSheet,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db/config";
import { useState, useEffect , useRef } from "react";
import Home from "./pages/Home";
import Setting from './pages/Setting';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Products from './pages/Products';
import AboutUs from "./pages/AboutUs";
import Payment from "./pages/Payment";
import EmptyCart from "./pages/EmptyCart";
import Icon , { Icons } from  "./components/Icons"
import Colors from  "./components/Colors"
import * as Animatable from 'react-native-animatable';
import Search from './search/Search';
import ForgetPassword from './pages/ForgetPassword';
import Utils from './pages/Utils';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const TabArr = [
    { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'home-outline', inActiveIcon: 'home-outline', component: Home },
    { route: 'empty cart', label: 'empty cart', type: Icons.Ionicons, activeIcon: 'cart', inActiveIcon: 'cart-outline', component: Payment },
    { route: 'Search', label: 'Search', type: Icons.Ionicons, activeIcon: 'search-circle', inActiveIcon: 'search-circle-outline', component: Search },
    { route: 'Profile', label: 'Profile', type: Icons.Ionicons, activeIcon: 'person-circle', inActiveIcon: 'person-circle-outline', component: Profile },
];

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1: {scale: 1.5, rotate: '360deg'}});
        } else {
            viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1: {scale: 1, rotate: '0deg'}});
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={styles.container}>
                <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? Colors.primary : Colors.primaryLite} />
            </Animatable.View>
        </TouchableOpacity>
    )
}
function Menu() {
  return (

      <Tab.Navigator
          screenOptions={{
              headerShown: false,
              tabBarStyle: {
                  height: 50,
                  position: 'absolute',
                  bottom: 10,
                  right: 16,
                  left: 16,
                  borderRadius: 16
              }
          }}
      >
          {TabArr.map((item, index) => {
              return (
                  <Tab.Screen key={index} name={item.route} component={item.component}
                              options={{
                                  tabBarShowLabel: false,
                                  tabBarButton: (props) => <TabButton {...props} item={item} />
                              }}
                  />
              )
          })}
      </Tab.Navigator>

      // {/*// <Tab.Navigator>*/}
      // {/*//   <Tab.Screen name="Home" component={Home} options={{*/}
      // {/*//       headerShown: false,*/}
      // {/*//     tabBarIcon: ({ color, size }) => (*/}
      // {/*//         <MaterialCommunityIcons name="home" color={color} size={size} />*/}
      // {/*//     ),*/}
      // {/*//   }} />*/}
      // {/*//   <Tab.Screen name="Setting" component={Setting} options={{*/}
      // {/*//     tabBarLabel: 'Settings',headerShown:false,*/}
      // {/*//     tabBarIcon: ({ color, size }) => (*/}
      // {/*//         <Ionicons name="settings" color={color} size={size} /> //ICON for shopping[storefront-outline]*/}
      // {/*//     ),*/}
      // {/*//   }}/>*/}
      // {/*//   <Tab.Screen name="Profile" component={Profile} options={{*/}
      // {/*//     tabBarLabel: 'Profile',headerShown:false,*/}
      // {/*//     tabBarIcon: ({ color, size }) => (*/}
      // {/*//         <MaterialCommunityIcons name="account" color={color} size={size} />*/}
      // {/*//     ),*/}
      // {/*//   }} />*/}
      // {/*//*/}
      // {/*// </Tab.Navigator>*/}
  );
}


// headerShown:false title: "Home"

export default function App() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));

    return () => {
      unsub();
    };
  }, []);

  const [user, setUser] = useState(undefined);
  return (

       user ?

      <NavigationContainer >
        <Stack.Navigator >
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="Products" component={Products} options={{ title: "All Products" }} />
            <Stack.Screen name="About Us" component={AboutUs} options={{ title: "About US" }} />
            <Stack.Screen name="setting" component={Setting} options={{ title: "Edit Profile" }} />
            <Stack.Screen name="payment" component={Payment} options={{ headerShown: false }} />
            {/* <Stack.Screen name="empty cart" component={EmptyCart} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Forgetpassword" component={ForgetPassword} options={{ headerShown: false }} />
        </Stack.Navigator>

      </NavigationContainer>

       : <NavigationContainer >
               <Stack.Navigator >
                    <Stack.Screen name="utils" component={Utils} options={{headerShown: false}} />
                   <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
                   <Stack.Screen name="SignUp" component={SignUp} options={{ title: "SignUp" }} />
                   <Stack.Screen name="Forgetpassword" component={ForgetPassword} options={{ title: "Forget Password" }} />
               </Stack.Navigator>

           </NavigationContainer>


  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    tabBar: {
        height: 70,
        position: 'absolute',
        bottom: 16,
        right: 16,
        left: 16,
        borderRadius: 16,
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 25,
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: Colors.primary,
    }
});
