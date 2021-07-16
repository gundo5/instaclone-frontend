import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

 export default function CreateAccount({ navigation }) {
   { /* register: 변화 감지, handleSubmit: 조건 충족 확인 */}
   const { register, handleSubmit, setValue, getValues } = useForm();
   const onCompleted = (data) => {
     const {
       createAccount: { ok },
     } = data;
     const { username, password } = getValues();
     if (ok) {
       navigation.navigate("LogIn", {
         username,
         password,
       });
     }
   };
   const [createAccountMutation, { loading }] = useMutation(
     CREATE_ACCOUNT_MUTATION,
     {
       onCompleted,
     }
   );
    /* 포커스 등에서 useRef 사용 */
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
      /* ref가 존재하고 현재 컨포넌트와 연결되어 있으면 포커스 */
      nextOne?.current?.focus();
    };

    const onValid = (data) => {
      if (!loading) {
        createAccountMutation({
          variables: {
            ...data,
          },
        });
      }
    };
    {/* register가 업데이트 될 때 마다 실행 */}
    useEffect(() => {
      register("firstName", {
        /* input 유효성 검사 */
        required: true,
      });
      register("lastName", {
        required: true,
      });
      register("username", {
        required: true,
      });
      register("email", {
        required: true,
      });
      register("password", {
        required: true,
      });
      register("password");
    }, [register]);
    return (
        <AuthLayout>
         <TextInput
         placeholder="First Name"
         returnKeyType="next"
         onSubmitEditing={() => onNext(lastNameRef)}
         placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
         /* 입력된 text를 setValue를 통해 변경, firstName = register("firstName")이 같아야함 */
         onChangeText={(text) => setValue("firstName", text)}
       />
       <TextInput
         ref={lastNameRef}
         placeholder="Last Name"
         returnKeyType="next"
         onSubmitEditing={() => onNext(usernameRef)}
         placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
         onChangeText={(text) => setValue("lastName", text)}
       />
       <TextInput
         ref={usernameRef}
         placeholder="Username"
         /* 소문자 키보드 시작 */
         autoCapitalize="none"
         returnKeyType="next"
         onSubmitEditing={() => onNext(emailRef)}
         placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
         onChangeText={(text) => setValue("username", text)}
       />
       <TextInput
       
         ref={emailRef}
         placeholder="Email"
         autoCapitalize="none"
         keyboardType="email-address"
         returnKeyType="next"
         onSubmitEditing={() => onNext(passwordRef)}
         placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
         onChangeText={(text) => setValue("email", text)}
       />
       <TextInput
         ref={passwordRef}
         placeholder="Password"
         secureTextEntry
         /* enter키 변경 */
         returnKeyType="done"
         lastOne={true}
         placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
         onChangeText={(text) => setValue("password", text)}
         /* 키보드 'done' 클릭 시 조건 확인 */
         onSubmitEditing={handleSubmit(onValid)}
       />
       <AuthButton
         text="Create Account"
         disabled={false}
         /* 버튼 클릭 시 조건 확인 */
         onPress={handleSubmit(onValid)}
       />
        </AuthLayout>
    );
}