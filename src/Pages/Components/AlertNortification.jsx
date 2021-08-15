import Alert from 'react-bootstrap/Alert'

const AlertNortification = ({alertType, message, notification}) => {
    return (
        <Alert show={notification} variant={alertType} className="alert-box">
          {message}
      </Alert>
    )
}

export default AlertNortification
