import { Table, Modal } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import ContentLoader from "../../Components/ContentLoader";
import { getSupportMessage, deleteSupportMessage } from "../../../services/supportService";
import {reduceContentDisplay, dateConverter } from '../../../utils/Functions';



const MessageTable = () => {
    const [isLoading, setIsLoading] = useState(true)
    const[data, setData] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [message, setMessage] = useState({})
    const [reload, setReload] = useState(true)

    useEffect(() => {
        try{
            setIsLoading(true)
            const fetch = async() => {
                const res = await getSupportMessage()
                setData(res.data.data)
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }, [reload])

    const viewMessage = (item) => {
        setMessage(item)
        setModalShow(true)
    }

    const deleteMessage = async(id) => {
        try{
            const res = await deleteSupportMessage(id)
            if(res.status === 200){
                setModalShow(false)
                setReload(!reload) 
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        isLoading ?
            <ContentLoader />
            :
        <div className="punters-tips-table ml-n2 support-msg">
            <h3 className="sub-title">Messages</h3>
            <Table striped hover variant="dark" size="sm">
                <thead>
                    <tr>
                    <th> <span className="punter">Name</span></th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>-</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td> {item.name} </td>
                        <td> {item.email} </td>
                        <td> {reduceContentDisplay(item.message)} </td>
                        <td> {dateConverter(item.created_at)} </td>

                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => viewMessage(item)}
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="converter-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Message
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="msg-modal">
                        <p><b>Sender Name:</b> {message.name}</p>
                        <p><b>Sender Email:</b> {message.email}</p>
                        <p><b>Message Sent Date:</b> {dateConverter(message.created_at)}</p>
                        <p><b>Message:</b> {message.message}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                   <button className="btn btn-danger" onClick={() => deleteMessage(message.id)}>Delete Message</button>
                </Modal.Footer>
                </Modal>
        </div>
    )
}

export default MessageTable
