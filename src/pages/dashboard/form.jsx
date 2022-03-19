import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";


export default function FormDashboard({
    actionForm,
    data,
    updatedId,
    setModalVisible
}) {

    const initialFormValue = {
        Name:"",
        Quantity:0,
        Price:0,
        Category:""
    }

    const [form, setForm] = useState(initialFormValue);
    
    const createData = async () => {
        await axios.post('http://localhost:8080/products', form)
        .then (() => {
            data.push(form)
        })
        .catch((err) => console.error(err))
        setModalVisible(false)
    }

    const updateData =  async () => {
        await axios.put(`http://localhost:8080/products/${updatedId}`, form)
        .then(() => {
            const updatedDataIndex = data.findIndex((p) => p.id === updatedId)
            data[updatedDataIndex] = form;
    })
    .catch((err) => console.error(err))
        setModalVisible(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (actionForm === "create") return createData()
        return updateData()
    }

    useEffect ( () => {
        if (actionForm === "edit"){
        const editedData = Object.assign({}, data.find(v => v.id === updatedId))
        delete editedData.id;
        setForm(editedData);
    }
},[data, updatedId, updatedId])

    return(
            <form onSubmit={handleSubmit}>
        <div>
            {Object.keys(form).map((key, idx) => (
                    <div>
                        <FormGroup key={idx}>
                            <Label> {key} </Label>
                            <Input
                            value={form[key]}
                            placeholer={key}
                            onChange={(e) => setForm( prev => ({
                                ...prev,
                                [key]: e.target.value
                            }))}
                            required/>
                        </FormGroup>
                    </div>
            ))}
            <br/>
            <Button color="primary" type="submit">Submit</Button>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
        </div>
            </form>
    )
}