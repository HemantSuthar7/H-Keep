import React, { useEffect, useState } from 'react';
import { Container, ListEditorForm } from "../components/index.js";
import { getCurrentUserData } from "../methods/userMethods.js";

function EditList() {
    const [listData, setListData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCurrentUserData();
            if (data.lists && data.lists.length > 0) {
                setListData(data.lists);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='py-8'>
            <Container>
                <ListEditorForm listData={listData} />
            </Container>
        </div>
    );
}

export default EditList;
