import React from 'react'
import { useQuery, useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

export default function LoginMutation() {

    const { data } = useMutation(GET_GREETING, {
        variables: {
          input: {
            username: "Steve",
            password: "pass"
          }
        },
    })
    console.log(data)

    return (
        <div>
            
        </div>
    )
}

const GET_GREETING = gql`
mutation AddUser($input: UserInputType!){
  addUser(data: $input){
    Name
    Password
  }
}
`;

