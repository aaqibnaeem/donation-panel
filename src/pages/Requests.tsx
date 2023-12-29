import React, { useEffect, useState } from "react";
import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { Button, Table, message } from "antd";
import Column from "antd/es/table/Column";
import { RequestInterface } from "../interfaces/interfaces";
import { db } from "../config/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { MdDeleteForever } from "react-icons/md";

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<RequestInterface[]>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    await getDocs(collection(db, "requests")).then((res) => {
      const data = res.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(data);
      setRequests(data as RequestInterface[]);
    });
  };

  return (
    <HStack>
      <Stack h="90vh" w="100%" p={30} gap={10}>
        <Stack
          flex={1}
          justify="start"
          border="1px solid lightgrey"
          p={30}
          borderRadius="10px"
        >
          <Text
            textDecor="underline"
            m={1}
            as="h1"
            fontSize={32}
            fontWeight="bold"
          >
            All Requests
          </Text>
          <Table dataSource={requests} size="small">
            <Column dataIndex="type" title="Title" />
            <Column dataIndex="description" title="Description" />
            <Column dataIndex="amount" title="Amount requested" />
            <Column
              dataIndex="approved"
              title="Status"
              render={(s) => {
                console.log("here :::::", s);
                return <Text>{s ? "Approved" : "Pending"}</Text>;
              }}
            />
            <Column
              title="Action"
              render={(itm) => (
                <HStack>
                  <VStack>
                    <Button
                      loading={isUpdating}
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={async () => {
                        setIsUpdating(true);
                        console.log("handle Approve", itm);
                        await updateDoc(doc(db, "requests", itm.id!), {
                          approved: true,
                        }).then(() => {
                          message.success({
                            type: "success",
                            content: "Successfully approved.",
                          });
                          fetchRequests();
                          setIsUpdating(false);
                        });
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      loading={isUpdating}
                      onClick={async () => {
                        setIsUpdating(true);
                        console.log("handle Approve", itm);
                        await updateDoc(doc(db, "requests", itm.id!), {
                          approved: false,
                        }).then(() => {
                          message.success({
                            type: "success",
                            content: "Donation request rejected.",
                          });
                          fetchRequests();
                          setIsUpdating(false);
                        });
                      }}
                      danger
                      style={{ width: "100%" }}
                    >
                      Reject
                    </Button>
                  </VStack>
                  <VStack h="80px">
                    <Button
                      loading={isUpdating}
                      danger
                      type="dashed"
                      style={{ height: "100%", fontSize: 32, minWidth: 80 }}
                      onClick={() => {
                        console.log(itm);
                        deleteDoc(doc(db, "requests", itm.id)).then(() => {
                          message.success({
                            type: "success",
                            content: "Successfully deleted",
                          });
                          fetchRequests();
                        });
                      }}
                    >
                      <MdDeleteForever />
                    </Button>
                  </VStack>
                </HStack>
              )}
            />
          </Table>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default Requests;
