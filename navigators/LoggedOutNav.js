import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount.js";

const Stack = createStackNavigator();

// 첫 시작
export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      // 공통 옵션 
       screenOptions={{
         headerBackTitleVisible: false,
         headerTitle: false,
         headerTransparent: true,
         headerTintColor: "white",
       }}
     >
     <Stack.Screen
         // 첫 화면
         name="Welcome"
         options={{
           headerShown: false,
         }}
         component={Welcome}
       />
      <Stack.Screen 
        // 로그인
        name="LogIn" 
        component={LogIn}
      /> 
      <Stack.Screen 
        // 회원가입
        name="CreateAccount" 
        component={CreateAccount} 
      />
    </Stack.Navigator>
  );
}