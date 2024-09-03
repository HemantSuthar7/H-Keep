import React from 'react';
import { Container, ListEditorForm } from "../components/index.js";
import { useLocation } from 'react-router-dom';

function EditList() {
    const location = useLocation();
    const { listData } = location.state || {}; // Access listData from location state

    return (
        <div className='py-8'>
            <Container>
                <ListEditorForm listData={listData} />
            </Container>
        </div>
    );
}

export default EditList;
