import { observer } from 'mobx-react-lite';
import React from 'react';
import RoomTableContainer from '../../components/room-table/RoomTableContainer';

const Room: React.FC = () => {

    return (
        <RoomTableContainer/>
    );
}

export default observer(Room);
