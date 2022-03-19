import React, {useState,  useEffect} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Table 
} from 'reactstrap'

import FormDashboard from "./form"
import axios from "axios";
import './style.scss'

export default function Dashboard() {

    const [header, setHeader] = useState([]);
    const [data, setData] = useState([]);
    const [action, setAction] = useState(null);  
    const [modalVisible, setModalVisible] = useState(false)
    const [updatedId, setUpdatedId] = useState(null);

    const handleCreate = () => {
        setAction("create");
        setModalVisible(true);
    }
    
    const handleEdit = (id) => {
        setUpdatedId(id);
        setAction("edit");
        setModalVisible(true);
    }
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/products/${id}`)
        .then(() => {
        const updateData = data.filter(v => v.id !== id)
        setData(updateData)
    })
    .catch((err) => console.error(err))
    }

    const getData = async () => {
        await axios.get('http://localhost:8080/products')
        .then(({data}) => {
            setData(data)
        })
        .catch((err) => console.error(err))
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        window.location = '/'
    }

    const handleCatalog = () => {
        localStorage.removeItem('access_token')
        window.location = '/catalog'
    }

    useEffect(() => {
        const listHeader = ['No','Name','Quantity','Price','Category','Action']
        setHeader(listHeader);
        getData()
    },[])


    console.table({data, header});
    return(
        <div className="dashboard-page">
        <div className="dashboard-container" style={{margin:"20px 200px"}}>
            <Button className="btn-submit"  onClick={() => handleLogout()}> Logout </Button>{''}
            <Button className="btn-submit"  onClick={() => handleCatalog()}> Catalog</Button >
            <br />
            Dashboard {'  '}
            <br />
            <Button className="btn-submit"  onClick={() => handleCreate()}> Create </Button >


            <Table>
                <thead>
                    <tr>
                        {header.map((v, idx)=> (
                            <th key={idx}>{v}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((v, idx) => (
                        <tr key={idx}>
                            <th scope="row">
                                {idx + 1}
                            </th>
                        <td>{v.Name}</td>
                        <td>{v.Quantity}</td>
                        <td>{v.Price}</td>
                        <td>{v.Category}</td>
                        <td>
                            <Button className="btn-submit"  size="sm"  onClick={() => handleEdit(v.id)}>Edit</Button> {' '}
                            <Button className="btn-submit"  size="sm"  onClick={() => handleDelete(v.id) }>Delete</Button>
                        </td>

                        </tr>

                    ))}
                </tbody>
            </Table>

            <Modal isOpen={modalVisible} toggle={()=> setModalVisible(!modalVisible)}  >
                <ModalHeader>{`From ${action} Data`}
                </ModalHeader>
            <ModalBody>
                <FormDashboard
                actionForm={action}
                data={data}
                setData={setData}
                setModalVisible={setModalVisible}
                updatedId={updatedId}
                />
            </ModalBody>
            </Modal>
        </div>
        </div>
    )
}