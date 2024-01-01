import { Box, Text, Heading, HStack, Stack } from "@chakra-ui/react";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import CustomModal from "../components/CustomModal";
import { Input } from "antd";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const { TextArea } = Input;

const About = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [about, setAbout] = useState<string>("");
  const [editAbout, setEditAbout] = useState<string>("");
  useEffect(() => {
    fetchAbout();
  }, []);
  const fetchAbout = async () => {
    const data = await getDoc(doc(db, "about", "pMfBym3PFMNEDi0EB0hT"));
    if (data.exists()) {
      const aboutData = data.data();
      setAbout(aboutData.about);
    }
  };

  return (
    <Box p={6} w="full">
      <HStack w="full" alignItems="center" justify="center">
        <Heading as="h2" size="xl">
          About Saylani Mass IT Training Centre
        </Heading>
        <Button onClick={() => setShowModal(true)}>Edit</Button>
      </HStack>

      <Text lineHeight={3}>{about}</Text>
      <CustomModal
        width="800px"
        isVisible={showModal}
        title="Edit About"
        handleCancel={() => setShowModal(false)}
        handleOk={async () => {
          setIsUpdating(true);
          const updateRef = doc(db, "about", "pMfBym3PFMNEDi0EB0hT");
          await updateDoc(updateRef, {
            about: editAbout,
          })
            .then(() => {
              message.success({
                type: "success",
                content: "Successfully updated",
              });
              setIsUpdating(false);
              setShowModal(false);
              fetchAbout();
            })
            .catch(() => {
              message.error({
                type: "error",
                content: "Error occured in updatin.",
              });
              setIsUpdating(false);
              setShowModal(false);
              fetchAbout();
            });
        }}
        isLoading={isUpdating}
        children={
          <Stack w="full" align="start" gap={10} mt={20}>
            <Text m={0}>About</Text>
            <TextArea
              rows={20}
              value={editAbout}
              onChange={(e) => setEditAbout(e.target.value)}
            />
          </Stack>
        }
      />
    </Box>
  );
};

export default About;
