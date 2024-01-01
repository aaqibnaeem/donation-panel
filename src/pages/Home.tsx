import { Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SMITLogo from "../assets/Logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const Home: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const navigate = useNavigate();
  const submitHandler = () => {
    setIsAuthenticating(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("email", email);
        setIsAuthenticating(false);
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        setIsAuthenticating(false);
        message.error({
          type: "error",
          content: "Invalid credentials",
        });
      });
  };
  return (
    <Stack align="center" justify="center" h="100vh" flex={1} gap={0}>
      <Image src={SMITLogo} />
      <Stack w="400px">
        <VStack align="start">
          <Text m={0}>Email</Text>
          <Input
            placeholder="admin@admin.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </VStack>
        <VStack align="start">
          <Text m={0}>Password</Text>
          <Input
            placeholder="admin123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </VStack>
        <Button
          type="primary"
          onClick={submitHandler}
          loading={isAuthenticating}
          disabled={email.length < 4 || password.length < 4}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Home;
