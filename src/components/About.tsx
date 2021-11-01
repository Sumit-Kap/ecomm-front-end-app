import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserList from "./UserList";
import { FormControl, Button } from "react-bootstrap";

const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const ADD_USER = gql`
  mutation addUser($id: Int, $firstName: String!, $age: Int!) {
    addUser(id: $id, firstName: $firstName, age: $age) {
      id
      firstName
      age
    }
  }
`;
const About = () => {
  const [
    deleteUser,
    { loading: loadingResponse, data: responseData, error },
  ] = useMutation(DELETE_USER);

  const [addUser, { loading, data, error: addUserErr }] = useMutation(ADD_USER);
  const [firstName, setFirstName] = React.useState("");
  console.log(data);
  console.log(loading);
  const deleteUserFromList = (userId) => {
    deleteUser({ variables: { id: userId } });
  };
  return (
    <div>
      <FormControl
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      ></FormControl>
      <Button onClick={() => addUser({ variables: { firstName, age: 27 } })}>
        Add Users
      </Button>
      <div style={{ marginTop: "40px" }}>
        <UserList deleteUser={deleteUserFromList} />
      </div>
    </div>
  );
};

export default About;
