import {Table} from 'react-bootstrap';
import { usePaystackPayment } from 'react-paystack';
import React, {useEffect} from 'react';
import {paymentInit, subscribe, confirmPayment} from '../../services/paymentService';
import { useState } from '@hookstate/core';
import store from '../../store/store';

const SubscriptionPlanTable = ({reload}) => {
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

    const Config5Unit = {
        reference: data.reference,
        email: data.email,
        publicKey: data.publicKey,
        amount: 10000,
        currency: data.currency,
        metadata: {
            userId: data.metadata ? data.metadata.userID : "",
            name: data.metadata ? data.metadata.username : "",
        },
        orderID: data.orderID,
    }
    
    const ConfigWeekendUnit = {
        reference: data.reference,
        email: data.email,
        publicKey: data.publicKey,
        amount: 25000,
        currency: data.currency,
        metadata: {
            userId: data.metadata ? data.metadata.userID : "",
            name: data.metadata ? data.metadata.username : "",
        },
        orderID: data.orderID
    }

    const Config25Unit = {
        reference: data.reference,
        email: data.email,
        publicKey: data.publicKey,
        amount: 50000,
        currency: data.currency,
        metadata: {
            userId: data.metadata ? data.metadata.userID : "",
            name: data.metadata ? data.metadata.username : "",
        },
        orderID: data.orderID
    }

    const Config50Unit = {
        reference: data.reference,
        email: data.email,
        publicKey: data.publicKey,
        amount: 100000,
        currency: data.currency,
        metadata: {
            userId: data.metadata ? data.metadata.userID : "",
            name: data.metadata ? data.metadata.username : "",
        },
        orderID: data.orderID
    }

    const Config200Unit = {
        reference: data.reference,
        email: data.email,
        publicKey: data.publicKey,
        amount: 300000,
        currency: data.currency,
        metadata: {
            userId: data.metadata ? data.metadata.userID : "",
            name: data.metadata ? data.metadata.username : "",
        },
        orderID: data.orderID
    }

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        if(reference.status === "success"){
            const confirm = async () => {
                try{
                    const res = await confirmPayment(reference.reference)
                    if(res.status === 200 && res.data.msg === "success"){
                        const res = await subscribe(user.get().id)
                        if(res.status === 200){
                            reload(true)
                        }
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
            confirm()
        }
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

    const dailyPlan = usePaystackPayment(Config5Unit);
    const weekendPlan = usePaystackPayment(ConfigWeekendUnit);
    const biWeeklyPlan = usePaystackPayment(Config25Unit);
    const monthlyPlan = usePaystackPayment(Config50Unit);
    const premiumPlan = usePaystackPayment(Config200Unit);

    return (
        <div className="punters-tips-table ml-n2">
            <h3 className="sub-title">Subscription Plans</h3>
            {/* <Table striped hover variant="dark" size="sm">
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
                        <td>5 Conversion Units</td>
                        <td> ₦100 </td>
                        <td> Daily </td>
                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => {
                                    dailyPlan(onSuccess, onClose)
                                }}
                            >
                                Subscribe
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>20 Conversion Unit</td>
                        <td> ₦250 </td>
                        <td> Weekends </td>
                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => {
                                    weekendPlan(onSuccess, onClose)
                                }}
                            >
                                Subscribe
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>25 Conversion Unit</td>
                        <td> ₦500 </td>
                        <td> 1 Month </td>
                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => {
                                    biWeeklyPlan(onSuccess, onClose)
                                }}
                            >
                                Subscribe
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>50 <span className="bonus-text">+10(Bonus)</span> conversion Units</td>
                        <td> ₦1,000 </td>
                        <td> 1 Month </td>
                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => {
                                    monthlyPlan(onSuccess, onClose)
                                }}
                            >
                                Subscribe
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>200 <span className="bonus-text">+20(Bonus)</span> conversion Units</td>
                        <td> ₦3,000 </td>
                        <td> 1 Month </td>
                        <td> 
                            <button 
                                className="btn-green"
                                onClick={() => {
                                    premiumPlan(onSuccess, onClose)
                                }}
                            >
                                Subscribe
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table> */}
        </div>
    )
}

export default SubscriptionPlanTable
