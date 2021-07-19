import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 20px;
`;
const Logo = styled.Image`
   max-width: 50%;
   width: 100%;
   height: 100px;
   margin: 0 auto;
   margin-bottom: 20px;
 `;

export default function AuthLayout({ children }) {
  {/* 키보드 사라짐 */}
  const dismissKeyboard = () => {
     Keyboard.dismiss();
   };
   return (
     {/* 키보드 아닌 부분 클릭 처리*/},
     <TouchableWithoutFeedback
       style={{ flex: 1 }}
       onPress={dismissKeyboard}
       disabled={Platform.OS === "web"}
     >
       <Container>
         {/* 키보드 사용 시 가려지는 UI 방지 */}
         <KeyboardAvoidingView
           style={{
            width: "100%",
          }}
          behavior="position"
          /* 키보드 UI 거리 */
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -100}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}