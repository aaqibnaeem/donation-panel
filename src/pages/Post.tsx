import React, { useEffect, useState } from "react";
import { HStack, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Button, Input, Table, message, Upload } from "antd";
import Column from "antd/es/table/Column";
import { PostInterface } from "../interfaces/interfaces";
import { db, storage } from "../config/firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import CustomModal from "../components/CustomModal";
import { MdOutlineCloudUpload } from "react-icons/md";
import { UploadRequestOption } from "rc-upload/lib/interface";

const { TextArea } = Input;

const Post: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostInterface[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [videoPost, setVideoPost] = useState<PostInterface>({
    title: "",
    description: "",
    videoUrl: "",
    type: "video",
  });
  const [editObj, setEditObj] = useState<PostInterface>({
    title: "",
    description: "",
  });
  const [postObj, setPostObj] = useState<PostInterface>({
    title: "",
    description: "",
    imageUrl: "",
    type: "regular",
  });

  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const checkUser = localStorage.getItem("email");
    if (!checkUser) return;
    await getDocs(collection(db, "posts")).then((res) => {
      const data = res.docs.map((doc) => ({
        ...doc.data(),
      }));
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

  const handleVideoPost = async () => {
    if (videoPost.title === "" || videoPost.description === "") {
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
        ...videoPost,
        id: newDocId,
        created_at: new Date(),
      };

      await setDoc(newDocRef, postData).then(() => {
        setIsLoading(false);
        setVideoPost({ title: "", description: "" });
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

  const uploadRequest = async (options: UploadRequestOption) => {
    setIsUploading(true);
    const { file } = options as { file: File };
    const store_id = new Date().getTime();

    const storageref = storageRef(storage, `posts/${store_id}/${file.name}`);
    console.log(storageref);
    await uploadBytes(storageref, file)
      .then(async (snapshot) => {
        await getDownloadURL(snapshot.ref)
          .then((url) => {
            const obj = { ...postObj, imageUrl: url };
            setPostObj(obj);
            message.success("Image uploaded successfully.");
            setIsUploading(false);
          })
          .catch(() => {
            message.error("Error in uploading.");
            setIsUploading(false);
          });
      })
      .catch(() => {
        message.error("Some error occured.");
      });
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
          <VStack gap={10} align="start" w="full">
            <HStack justify="space-between" w="full">
              <Heading m={0} as="h1" size="4xl">
                Post
              </Heading>
              <Heading m={0}>Text or image</Heading>
            </HStack>
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

            <Upload
              customRequest={(e) => uploadRequest(e)}
              maxCount={1}
              showUploadList={false}
              disabled={false}
            >
              <HStack width="full">
                <Button
                  style={{
                    width: "100% !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginInlineStart: "auto",
                    marginLeft: "auto",
                  }}
                  loading={isUploading}
                >
                  <MdOutlineCloudUpload />
                  <Text m={0} p={0} ms={10}>
                    Upload image
                  </Text>
                </Button>
                <Text hidden={postObj.imageUrl !== ""} m={0}>
                  Select an image
                </Text>
              </HStack>
            </Upload>

            <Button
              style={{ width: "100%" }}
              size="large"
              onClick={handlePost}
              loading={isLoading}
              disabled={
                isUploading ||
                postObj.title.length < 1 ||
                postObj.description.length < 1
              }
            >
              Submit
            </Button>
          </VStack>
          {/* --------------------------VIDEO POST --------------------------------- */}
          <VStack gap={10} mt={50} align="start">
            <HStack>
              <Heading m={0} as="h1" size="4xl">
                Post
              </Heading>
              <Heading m={0}>Video</Heading>
            </HStack>
            <Input
              placeholder="Title"
              onChange={(e) =>
                setVideoPost({ ...videoPost, title: e.target.value })
              }
              value={videoPost?.title}
              size="large"
            />
            <TextArea
              size="large"
              placeholder="Description"
              value={videoPost?.description}
              onChange={(e) =>
                setVideoPost({ ...videoPost, description: e.target.value })
              }
            />

            <Input
              placeholder="Video URL"
              value={videoPost?.videoUrl}
              onChange={(e) =>
                setVideoPost({ ...videoPost, videoUrl: e.target.value })
              }
            />

            <Input
              placeholder="Video ID"
              value={videoPost?.videoID}
              onChange={(e) =>
                setVideoPost({ ...videoPost, videoID: e.target.value })
              }
            />

            <Button
              style={{ width: "100%" }}
              size="large"
              onClick={handleVideoPost}
              loading={isLoading}
              disabled={
                isUploading ||
                videoPost?.title.length < 1 ||
                videoPost?.description.length < 1
              }
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
          <Heading textAlign="center" m={0} as="h2">
            All Posts
          </Heading>
          <Table dataSource={posts} size="small">
            <Column dataIndex="title" title="Title" />
            <Column dataIndex="description" title="Description" />
            <Column
              dataIndex="imageUrl"
              title="Image"
              render={(itm) => {
                console.log(itm);
                return (
                  <Image
                    src={
                      itm ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxhCCew_GXW7u917hiuIMA8tZmbCz8ajG2udmzw8NwqQ&s"
                    }
                    w="80px"
                    h="80px"
                    objectFit="contain"
                  />
                );
              }}
            />
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

            <Text m={0}>Description</Text>
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
