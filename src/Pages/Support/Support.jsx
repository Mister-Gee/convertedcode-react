import { Helmet } from "react-helmet";
import Frame from "../Components/Frame";
import {Container, Row, Col} from "react-bootstrap";

const Support = () => {
    return (
        <Frame>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard | ConvertedCode</title>
            </Helmet>
            <Container fluid className="wrapper">
                <Row className="pt-5 ml-n5 mr-n4 pl-5 pr-5">
                    <Col lg={12}>
                    <div className="punters-tips-table ml-n2">
                        <h3 className="sub-title">Help { "&" } Support</h3>
                        <p className="help-text"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque dolor recusandae iure incidunt fugiat. Alias adipisci odit repellat autem facere quasi. Obcaecati odio quos maiores aut distinctio minus illo eveniet. </p>
                        <div className="contact">
                            <form className="pt-3 pl-5 pr-5">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Message" rows="5"></textarea>
                                </div>
                                <div className="mr-btn">
                                    <button type="submit" className="btn-green form-btn">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
        </Frame>
    )
}

export default Support
