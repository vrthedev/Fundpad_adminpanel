import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Modal,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import Moment from "moment";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import ReactTable from "components/ReactTable/ReactTable.js";

const AppUser = ({ credential }) => {
  const { apiConfig, ApiCall } = global;
  const notificationAlertRef = React.useRef(null);
  const [message, setMessage] = useState("");

  const notify = (message, type) => {
    let options = {};
    options = {
      place: "tr",
      message: message,
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const send = async () => {
    try {
      const response = await ApiCall(
        apiConfig.note_send.url,
        apiConfig.note_send.method,
        credential.loginToken,
        { message: message }
      );
      if (response.data.result) {
        setMessage("");
        alert("success");
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      notify("Failed", "danger");
    }
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content" style={{ marginTop: 200 }}>
        <Row>
          <Col xs={3} md={3}></Col>
          <Col xs={6} md={6}>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Notification</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal">
                  <FormGroup>
                    {/* <Input
                      fullWidth
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    /> */}
                    <Input
                      multiLine
                      type="text"
                      placeholder="max 100 characters"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FormGroup>
                  <Row style={{ float: "right", marginRight: "2px" }}>
                    <Button color="btn1 btn-sm" onClick={() => send()}>
                      Send
                    </Button>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { credential: LoginReducer };
};

export default connect(mapStateToProps)(AppUser);
