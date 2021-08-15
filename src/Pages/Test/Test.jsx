import axios from 'axios';
import { usePaystackPayment } from 'react-paystack';
import {useState, useEffect} from 'react';

const Test = () => {

const[data, setData] = useState([])

    useEffect(() => {
        axios.get('https://api.convertedcode.com/api/getPaymentData')
        .then(resp => {
            console.log(resp)
            setData(resp.data)
        })
        .catch(err => console.log(err))
    }, [])

   const config = {
    reference: data.reference,
    email: data.email,
    amount: data.amount,
    publicKey: data.publicKey,
    currency: data.currency,
    // metadata: {
    //     userId: data.metadata.userID
    // },
    orderID: data.orderID
    }

    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }

   const initializePayment = usePaystackPayment(config);
    return (
        <div>
            Testing
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Paystack Hooks Implementation</button>
        </div>
    )
}

export default Test
