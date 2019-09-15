import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

export default function SearchBar({ categories }) {
  return (
    <ContainerDiv aria-label="search bar">
      <InputGroup className="mb-3">
        <FormControl placeholder="Search" />
        <InputGroup.Append>
          <Button variant="outline-info">Search</Button>
        </InputGroup.Append>
      </InputGroup>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  padding-left: 3em;
  padding-right: 3em;
`;
