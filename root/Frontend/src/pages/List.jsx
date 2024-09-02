import React, { useEffect, useState } from 'react';
import { Container, ListViewer } from "../components/index.js";
import { getCurrentUserData } from "../methods/userMethods.js";

function List() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const userData = await getCurrentUserData();
        
        if (userData) {
          // Assuming userData contains both notes and lists
          const { lists } = userData;
          setLists(lists);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className='py-8'>
      <Container>
        <ListViewer lists={lists} />
      </Container>
    </div>
  );
}

export default List;
