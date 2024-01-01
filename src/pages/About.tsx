import { Box, Text, Heading } from "@chakra-ui/react";

const About = () => {
  return (
    <Box p={6}>
      <Heading as="h2" size="xl" mb={4}>
        About Saylani Mass IT Training Centre
      </Heading>

      <Text fontSize="lg" mb={4}>
        Saylani Mass IT Training Centre is dedicated to providing high-quality
        IT education and training to individuals seeking to enhance their skills
        and advance their careers in the rapidly evolving technology landscape.
      </Text>

      <Text fontSize="lg" mb={4}>
        Our mission is to empower learners with practical knowledge and hands-on
        experience, preparing them for success in the IT industry. We believe in
        making quality education accessible to everyone, regardless of their
        background or previous experience.
      </Text>

      <Text fontSize="lg" mb={4}>
        At Saylani Mass IT Training Centre, we offer a range of courses taught
        by experienced professionals. Whether you're a beginner looking to start
        your IT journey or an experienced professional seeking to deepen your
        expertise, we have a program for you.
      </Text>

      <Text fontSize="lg">
        Thank you for choosing Saylani Mass IT Training Centre as your partner
        in learning. We are committed to your success and look forward to
        supporting you on your educational journey.
      </Text>
    </Box>
  );
};

export default About;
