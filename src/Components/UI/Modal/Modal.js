import React, { useState } from 'react';
import ManageHoots from '../../../Containers/Admin/ManageHoots/ManageHoots';
import Button from '../../Button/Button';

export default function Modal() {

    const [modal, setmodal] = useState(false);

    const toggleModal = () => {
        setmodal(!modal)
    }

    return (
        <div>
            <Button onclick={toggleModal}>Open</Button>
            <ManageHoots />
        </div>
    );
};