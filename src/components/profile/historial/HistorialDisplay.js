import React from 'react';
import './Historial.css';
import FontAwesome from 'react-fontawesome';
import NavProfile from '../../nav/NavProfile';
import { Table } from 'antd';

const columns = [{
    title: ' ',
    dataIndex: ' ',
    render: text => <FontAwesome name="laptop" />,
},{
    title: 'Título del curso',
    dataIndex: 'curso',
    render: text => <a href="javascript:;">{text}</a>,
},
    {
    title: 'Fecha de compra',
    dataIndex: 'buydate',
}, {
    title: 'Completado',
        dataIndex: 'completado',
}];
const data = [{
    key: '1',
    curso: 'Firebase Tools',
    buydate: '28 Abril 2018',
    completado: '20%',
}, {
    key: '2',
    curso: 'Firebase Tools',
    buydate: '28 Abril 2018',
    completado: '20%',
}, {
    key: '3',
    curso: 'Firebase Tools',
    buydate: '28 Abril 2018',
    completado: '20%',
}];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

};
export const HistorialDisplay = ({}) => (

    <div className="historial">
        <NavProfile />
        <div className="mg tabla">
            <h2 className="tittle">Tus historial de compras</h2>
            <Table  columns={columns} dataSource={data} />,
        </div>
    </div>
);