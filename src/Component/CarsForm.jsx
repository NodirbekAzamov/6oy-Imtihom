import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function CardForm() {
    const [check, setCheck] = useState(false)
    const [items, setItems] = useState([
        { id: 1, title: "Open", text: [{ name: "task1" }] },
        { id: 2, title: "Pending", text: [{ name: "task2" }] },
        { id: 3, title: "Iproge", text: [{ name: "task3" }] },
        { id: 4, title: "Progres", text: [{ name: "task4" }] },
    ]);

    const [select, setSelect] = useState("");
    const [name, setAddName] = useState("");
    const [ediItems, setEditItems] = useState('')
    const [modalEdit, setEdit] = useState(false);
    const [editTitel, setEditTitel] = useState('')
    const edit = (index2, i, itemm, itemm2) => {
        setEditTitel(itemm2.name)
        setEditItems(i)
        setEdit(index2)
        setModal(true)
        setCheck(true)

    }

    const remove = (index2, i, itemm) => {
        itemm.text.splice(index2, 1);
        setItems([...items]);
    };

    const [modal, setModal] = useState(false);
    const addUser = () => {
        setModal(false)



        if (check == true) {

            setCheck(false)
            let num = select - 1
            setAddName(editTitel)
            let payload = { name };
            items.forEach((itemm2, i) => {
                if (i == ediItems) {

                    items[ediItems].text.splice(modalEdit, 1)
                    setItems([...items]);
                }
                if (num == i) {
                    itemm2.text.push({ ...payload })
                    setItems([...items])
                }

            });


        } else {
            setEditTitel('')
            let num = select - 1
            let payload = { name };
            items.forEach((itemm2, i) => {
                if (i == num) {
                    itemm2.text.push(payload);
                    setItems([...items]);

                }
            });
        }
    };



    return (
        <div className=" container-fluid my-5">
            <div className="row">
                {items.map((itemm, i) => { 
                    return (
                        <div key={i} className="col-3">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className=" text-center">{itemm.title}</h2>
                                </div>

                                {itemm.text.map((itemm2, index2) => { 
                                    return (
                                        <div key={index2} className="card-body d-flex justify-content-between">
                                            <h3 className="">{itemm2.name}</h3>
                                            <div>
                                                <button onClick={() => edit(index2, i, itemm, itemm2)} className="btn btn-info" >
                                                    edit
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => remove(index2, i, itemm)}
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="card-footer text-center">
                                    <button
                                        onClick={() => setModal(true)}
                                        className="btn btn-success">
                                        Add User
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <Modal isOpen={modal} toggle={() => setModal(false)}>
                    <ModalHeader>
                        <h1>User Qo'shosh</h1>
                    </ModalHeader>
                    <ModalBody>
                        <input
                            defaultValue={editTitel}
                            placeholder="Add name"
                            type="text"
                            onChange={(e) => setAddName(e.target.value)}
                            className="form-control"
                        />
                        <select onChange={(e) => setSelect(e.target.value)} className="form-control my-2">
                            <option value="" hidden>
                                select
                            </option>
                            {items.map((v, i) => (
                                <option key={i} value={v.id}>
                                    {v.title}
                                </option>
                            ))}
                        </select>
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn btn-primary" onClick={addUser}>Add user</button>
                    </ModalFooter>
                </Modal>


            </div>
        </div>
    );
}