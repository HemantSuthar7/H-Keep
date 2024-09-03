import React from 'react';
import { Container, ListViewer } from "../components/index.js";
import { useLocation } from 'react-router-dom';

function List() {
  const location = useLocation();
  const { listData } = location.state || {};

  console.log("The listdata form the list page is : ", listData)

  return (
    <div className='py-8'>
      <Container>
        <ListViewer listData={listData} />
      </Container>
    </div>
  );
}

export default List;
