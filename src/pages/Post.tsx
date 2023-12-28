import React, { useEffect, useState } from "react";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { HStack, Heading, Stack, VStack } from "@chakra-ui/react";
import { Button, Input, Table, message } from "antd";
import { PostInterface } from "../interfaces/interfaces";
import Column from "antd/es/table/Column";
const { TextArea } = Input;

const Post: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>();
  const [postObj, setPostObj] = useState<PostInterface>({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    await getDocs(collection(db, "posts")).then((res) => {
      const data: PostInterface[] = res.docs.map((doc) => ({
        ...doc.data().post,
        id: doc.id,
      }));
      setPosts(data);
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
        id: newDocId,
        post: { ...postObj, created_at: new Date() },
      };

      await setDoc(newDocRef, postData).then(() => {
        setIsLoading(false);
        setPostObj({ title: "", description: "" });
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLoading(false);
    }
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
                    onClick={() => console.log(itm.id)}
                    type="dashed"
                    style={{ width: "100%" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteDoc(doc(db, "posts", itm.id)).then(() =>
                        console.log("Deleted")
                      );
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
    </HStack>
  );
};

export default Post;
