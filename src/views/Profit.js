import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
  CustomInput,
} from "reactstrap";
import Moment from "moment";
import NotificationAlert from "react-notification-alert";
import ReactTable from "components/ReactTable/ReactTable.js";

const Profit = ({ credential }) => {
  const [profits, setProfits] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [profit, setProfit] = useState({});
  const { apiConfig, ApiCall } = global;
  const notificationAlertRef = React.useRef(null);

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

  const openModal = (data) => {
    setProfit(data);
    setShow(true);
  };

  const closeModal = () => {
    setProfit({});
    setShow(false);
  };

  const openModal1 = (data) => {
    setProfit(data);
    setShow1(true);
  };

  const closeModal1 = () => {
    setProfit({});
    setShow1(false);
  };

  const save = async (pro) => {
    try {
      const response = await ApiCall(
        apiConfig.profit_add.url,
        apiConfig.profit_add.method,
        credential.loginToken,
        pro
      );
      if (response.data.result) {
        const response = await ApiCall(
          apiConfig.profit_get.url,
          apiConfig.profit_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          setProfits(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      notify("Failed in getting all plans.", "danger");
    }
    setProfit({});
    setShow(false);
  };

  const remove = async (data) => {
    try {
      const response = await ApiCall(
        apiConfig.profit_del.url,
        apiConfig.profit_del.method,
        credential.loginToken,
        data
      );
      if (response.data.result) {
        const response = await ApiCall(
          apiConfig.profit_get.url,
          apiConfig.profit_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          setProfits(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      if (error.response) notify(error.response.data.data, "danger");
      else if (error.request) notify("Request failed", "danger");
      else notify("Something went wrong", "danger");
    }
    setProfit({ fund_raised: 0, status: false });
    setShow1(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.profit_get.url,
          apiConfig.profit_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          setProfits(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failedllets.", "danger");
      }
    })();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    var data = profits.map((prop, key) => {
      return {
        ...prop,
        createdAt: Moment(prop.createdAt).format("DD/MM/YYYY hh:mm:ss"),
        percentage: prop.percentage + "%",
        additional_payouts: prop.additional_payouts
          ? prop.additional_payouts + "$"
          : "",
        investor_payouts: prop.investor_payouts
          ? prop.investor_payouts + "$"
          : "",
        referral_payouts: prop.referral_payouts
          ? prop.referral_payouts + "$"
          : "",
        actions: (
          <div className="actions-right">
            <Link to={`/admin/profitDetail/${prop._id}`}>
              <Button
                color="warning"
                size="sm"
                className={classNames("btn-icon btn-link like btn-neutral")}
                style={{ opacity: 0.7 }}
              >
                <i class="fa fa-eye" aria-hidden="false"></i>
              </Button>{" "}
            </Link>
            <Button
              onClick={() => openModal1(prop)}
              color="danger"
              size="sm"
              className={classNames("btn-icon btn-link like btn-neutral")}
              style={{ opacity: 0.7 }}
            >
              <i className="tim-icons icon-trash-simple" />
            </Button>{" "}
          </div>
        ),
      };
    });
    setData(data);
  }, [profits]);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Profits</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name",
                    },
                    {
                      Header: "Percentage",
                      accessor: "percentage",
                    },
                    {
                      Header: "Additional payouts",
                      accessor: "additional_payouts",
                    },
                    {
                      Header: "Investor payouts",
                      accessor: "investor_payouts",
                    },
                    {
                      Header: "Referral payouts",
                      accessor: "referral_payouts",
                    },
                    {
                      Header: "CreatedAt",
                      accessor: "createdAt",
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  openModal={openModal}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal isOpen={show}>
        <div className="modal-header">
          <h4>{profit._id ? "Edit " : "Add "}Profit</h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeModal()}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
        <div className="modal-body">
          <Form className="form-horizontal">
            <Row>
              <Label md="3">Name</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={profit.name}
                    onChange={(e) => {
                      setProfit({ ...profit, name: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Percentage</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="number"
                    value={profit.percentage}
                    onChange={(e) => {
                      setProfit({ ...profit, percentage: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row className="mt-1 mb-4">
              <Col md="9">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      defaultChecked={profit.isActive}
                      onChange={() =>
                        setProfit({ ...profit, isActive: !profit.isActive })
                      }
                    />
                    <span className="form-check-sign" />
                    IsActive
                  </Label>
                </FormGroup>
              </Col>
            </Row> */}
            <Row style={{ float: "right", marginRight: "2px" }}>
              <Button color="btn1 btn-sm" onClick={() => save(profit)}>
                {profit._id ? "Update" : "Save"}
              </Button>
              <Button color="btn1 btn-sm" onClick={() => closeModal()}>
                Cancel
              </Button>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal isOpen={show1}>
        <div className="modal-header">
          <h4>Are you sure you want to delete?</h4>
        </div>
        <div className="modal-body">
          <Row style={{ float: "right", marginRight: "2px" }}>
            <Button color="btn1 btn-sm" onClick={() => remove(profit)}>
              Confirm
            </Button>
            <Button color="btn1 btn-sm" onClick={() => closeModal1()}>
              Cancel
            </Button>
          </Row>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { credential: LoginReducer };
};

export default connect(mapStateToProps)(Profit);
