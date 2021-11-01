import React from "react";
import { gql, useQuery } from "@apollo/client";
import Loaders from "./Loaders";
import { ListGroupItem, Button } from "react-bootstrap";
const GET_USERS = gql`
  {
    Users {
      id
      firstName
      age
    }
  }
`;
const UserList = ({ deleteUser }) => {
  const { loading, data, refetch } = useQuery(GET_USERS, {
    skip: false,
    // pollInterval: 100,
  });

  React.useEffect(() => {
    refetch();
  }, [deleteUser]);
  if (loading) {
    return <Loaders />;
  }
  return (
    <div>
      {data.Users.map((item) => (
        <>
          <ListGroupItem>{item.firstName}</ListGroupItem>
          <Button
            onClick={() => {
              deleteUser(item.id);
              refetch();
            }}
          >
            Delete
          </Button>
        </>
      ))}
    </div>
  );
};

export default UserList;
