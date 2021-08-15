import {Table} from 'react-bootstrap';
import { usePaystackPayment } from 'react-paystack';
import React, {useEffect} from 'react';
import {paymentInit, confirmPayment} from '../../services/paymentService';
import { useState } from '@hookstate/core';
import store from '../../store/store';

const SubscriptionPlanTable = () => {
    const[data, setData] = React.useState({})

    const {user} = useState(store)

    useEffect(() => {
        const fetch = async() => {
            try{
                const res = await paymentInit(user.get().id)
                setData(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    const config = {
        reference: data.reference,
        email: data.email,
        amount: 100000,
        publicKey: data.publicKey,
        currency: data.currency,
        metadata: {
            userId: data.metadata ? data.metadata.userID : "",
            name: data.metadata ? data.metadata.username : "",
        },
        orderID: data.orderID,
        plan: "PLN_yl6o5n14ea06egx"
    }
    console.log(config)

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        const confirm = async() => {
            try{
                const res = await confirmPayment(reference.reference)
                console.log(res)
            }
            catch(err){
                console.log(err)
            }
        }
        confirm()
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);
    return (
        <div className="punters-tips-table ml-n2">
            <h3 className="sub-title">Subscription Plans</h3>
            <Table striped hover variant="dark" size="sm">
                <thead>
                    <tr>
                    <th> <span className="punter">Plans</span></th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Weekend</td>
                        <td> ₦1,000 </td>
                        <td> 1 Month </td>
                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => {
                                    initializePayment(onSuccess, onClose)
                                }}
                            >
                                Subscribe
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default SubscriptionPlanTable
