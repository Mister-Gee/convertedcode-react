import {Table} from 'react-bootstrap';

const SubscriptionPlanTable = () => {
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
                            <button className="btn-green">Subscribe</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default SubscriptionPlanTable
