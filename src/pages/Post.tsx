import React, { useEffect, useState } from "react";
import { HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { Button, Input, Table, message } from "antd";
import Column from "antd/es/table/Column";
import { PostInterface } from "../interfaces/interfaces";
import { db } from "../config/firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import CustomModal from "../components/CustomModal";

const { TextArea } = Input;

const Post: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [editObj, setEditObj] = useState<PostInterface>({
    title: "",
    description: "",
  });
  const [postObj, setPostObj] = useState<PostInterface>({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    await getDocs(collection(db, "posts")).then((res) => {
      const data = res.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(data);
      setPosts(data as PostInterface[]);
    });
  };

  const handlePost = async () => {
    if (postObj.title === "" || postObj.description === "") {
      message.error({
        type: "error",
        content: "Please make sure all fields",
      });
      return;
    }
    try {
      setIsLoading(true);
      const newDocRef = doc(collection(db, "posts"));
      const newDocId = newDocRef.id;

      const postData = {
        ...postObj,
        id: newDocId,
        created_at: new Date(),
      };

      await setDoc(newDocRef, postData).then(() => {
        setIsLoading(false);
        setPostObj({ title: "", description: "" });
        fetchPosts();
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLoading(false);
    }
  };

  const handleEdit = async (values: PostInterface) => {
    setEditObj(values);
    setVisible(true);
  };

  return (
    <HStack>
      <Stack h="90vh" w="30%" p={30} gap={10}>
        <Stack
          flex={1}
          justify="start"
          border="1px solid lightgrey"
          p={30}
          borderRadius="10px"
        >
          <VStack gap={20} align="start">
            <Heading m={0} as="h1" size="4xl">
              Post
            </Heading>
            <Heading m={0}>News, Request, Opportunities</Heading>
            <Input
              placeholder="Title"
              onChange={(e) =>
                setPostObj({ ...postObj, title: e.target.value })
              }
              value={postObj?.title}
              size="large"
            />
            <TextArea
              size="large"
              placeholder="Description"
              value={postObj?.description}
              onChange={(e) =>
                setPostObj({ ...postObj, description: e.target.value })
              }
            />
            <Button
              style={{ width: "100%" }}
              size="large"
              onClick={handlePost}
              loading={isLoading}
            >
              Submit
            </Button>
          </VStack>
        </Stack>
      </Stack>
      <Stack h="90vh" w="70%" p={30} gap={10}>
        <Stack
          flex={1}
          justify="start"
          border="1px solid lightgrey"
          p={30}
          borderRadius="10px"
        >
          <Table dataSource={posts} size="small">
            <Column dataIndex="title" title="Title" />
            <Column dataIndex="description" title="Description" />
            <Column
              render={(itm) => (
                <VStack>
                  <Button
                    type="dashed"
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleEdit(itm);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteDoc(doc(db, "posts", itm.id)).then(() => {
                        message.success({
                          type: "success",
                          content: "Successfully deleted",
                        });
                        fetchPosts();
                      });
                    }}
                    danger
                    style={{ width: "100%" }}
                  >
                    Delete
                  </Button>
                </VStack>
              )}
            />
          </Table>
        </Stack>
      </Stack>
      <CustomModal
        isVisible={visible}
        title="Edit post"
        handleCancel={() => setVisible(false)}
        handleOk={async () => {
          setIsUpdating(true);
          const updateRef = doc(db, "posts", editObj.id!);
          await updateDoc(updateRef, {
            title: editObj.title,
            description: editObj.description,
          })
            .then(() => {
              message.success({
                type: "success",
                content: "Successfully updated",
              });
              setIsUpdating(false);
              setVisible(false);
              fetchPosts();
            })
            .catch(() => {
              message.error({
                type: "error",
                content: "Error occured in updatin.",
              });
              setIsUpdating(false);
              setVisible(false);
              fetchPosts();
            });
        }}
        isLoading={isUpdating}
        children={
          <VStack w="full" align="start" gap={10} mt={20}>
            <Text m={0}>Title</Text>
            <Input
              value={editObj?.title}
              onChange={(e) =>
                setEditObj({ ...editObj, title: e.target.value })
              }
            />

            <Text m={0}>Title</Text>
            <TextArea
              value={editObj?.description}
              onChange={(e) =>
                setEditObj({ ...editObj, description: e.target.value })
              }
            />
          </VStack>
        }
      />
    </HStack>
  );
};

export default Post;
