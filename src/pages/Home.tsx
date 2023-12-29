import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Stack align="center" justify="center" h="100vh">
      <Text fontSize={34} fontWeight="bold" as="h1">
        Welcome to SMIT Donation App Panel
      </Text>
      <Text>
        Please navigate to <Link to="dashboard">Dashboard</Link>
      </Text>
    </Stack>
  );
};

export default Home;
