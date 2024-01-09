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
    const edit = (id, i, e, v) => {
        setEditTitel(v.name)
        setEditItems(i)
        setEdit(id)
        setModal(true)
        setCheck(true)

    }



    const deleteitem = (id, i, e) => {
        e.text.splice(id, 1);
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
            items.forEach((v, i) => {
                if (i == ediItems) {

                    items[ediItems].item.splice(modalEdit, 1)
                    setItems([...items]);

                }
                if (num == i) {
                    v.text.push({ ...payload })
                    setItems([...items])
                }

            });


        } else {
            setEditTitel('')
            let num = select - 1
            let payload = { name };
            items.forEach((v, i) => {
                if (i == num) {
                    v.text.push(payload);
                    setItems([...items]);

                }
            });
        }
    };




    return (
        <div className=" container-fluid">
            <div className="row">
                {items.map((e, i) => {
                    return (
                        <div key={i} className="col-3">
                            <div className="card">
                                <div className="card-header">
                                <h2 className=" text-center">{e.title}</h2>
                                </div>
                                    {e.text.map((v, id) => {
                                        return (
                                            <div key={id} className=" card-body d-flex justify-content-between">
                                                <h4 className="text-[22px]">{v.name}</h4>
                                                <div>
                                                    <button onClick={() => edit(id, i, e, v)} className="btn btn-info" >
                                                        edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => deleteitem(id, i, e)}
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
                        <h1>User Qo'shish</h1>
                    </ModalHeader>
                    <ModalBody>
                        <input
                            defaultValue={editTitel}
                            placeholder="Add name"
                            type="text"
                            onChange={(e) => setAddName(e.target.value)}
                            className="form-control"
                        />
                        <select onChange={(e) => setSelect(e.target.value)} className="form-control my-3">
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
                        <button onClick={addUser} className="btn btn-primary">Add user</button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}