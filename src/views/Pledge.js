import React, { useState } from "react";
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

import ReactTable from "components/ReactTable/ReactTable1.js";

const dataTable = [
  {
    _id: "1",
    project: { _id: "1", name: "Airi Satou" },
    amount: 2,
    transaction: "transaction1",
    referrer: {
      _id: "2",
      name: "referror1",
    },
    status: 0,
  },
  {
    _id: "2",
    project: { _id: "2", name: "Gdfg Jisdi" },
    amount: 43,
    transaction: "transaction2",
    referrer: {
      _id: "2",
      name: "dfgwe",
    },
    status: 1,
  },
  {
    _id: "3",
    project: { _id: "3", name: "Gds Bddd" },
    amount: 234,
    transaction: "transaction3",
    referrer: {
      _id: "3",
      name: "Hdrg Deok",
    },
    status: 0,
  },
  {
    _id: "4",
    project: { _id: "4", name: "Iosk Did" },
    amount: 74,
    transaction: "transaction4",
    referrer: {
      _id: "4",
      name: "Dei Jij",
    },
    status: 0,
  },
  {
    _id: "5",
    project: { _id: "5", name: "Gdfg Jisdi" },
    amount: 43,
    transaction: "transaction5",
    referrer: {
      _id: "5",
      name: "Dwe KOo",
    },
    status: 2,
  },
  {
    _id: "6",
    project: { _id: "6", name: "Dfe Dfe" },
    amount: 12,
    transaction: "transaction6",
    referrer: {
      _id: "6",
      name: "Dfe Hfe",
    },
    status: 1,
  },
];

const Pledge = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [pledge, setPledge] = useState({
    project: {},
    referrer: {},
  });
  console.log(pledge, "-------------pledge");

  const openModal = (data) => {
    setPledge(data);
    setShow(true);
  };

  const closeModal = () => {
    setPledge({ project: {}, referrer: {} });
    setShow(false);
  };

  const openModal1 = (data) => {
    setPledge(data);
    setShow1(true);
  };

  const closeModal1 = () => {
    setPledge({ project: {}, referrer: {} });
    setShow1(false);
  };
  const save = (data) => {
    alert("save");
    setPledge({ project: {}, referrer: {} });
    setShow(false);
  };

  const remove = (data) => {
    alert(data._id);
    setPledge({ project: {}, referrer: {} });
    setShow1(false);
  };

  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        ...prop,
        amount: prop.amount + "$",
        status:
          prop.status === 0
            ? "Pending"
            : prop.status === 1
            ? "Approved"
            : "Reject",
        actions: (
          <div className="actions-right">
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => openModal(prop)}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link like btn-neutral")}
              style={{ opacity: 0.7 }}
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => openModal1(prop)}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link like btn-neutral")}
              style={{ opacity: 0.7 }}
            >
              <i className="tim-icons icon-trash-simple" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );
  return (
    <>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Pledges</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Project",
                      accessor: "project.name",
                    },
                    {
                      Header: "Amount",
                      accessor: "amount",
                    },
                    {
                      Header: "Transaction",
                      accessor: "transaction",
                    },
                    {
                      Header: "Referrer",
                      accessor: "referrer.name",
                    },
                    {
                      Header: "Status",
                      accessor: "status",
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
      <Modal modalClassName="modal-black" isOpen={show}>
        <div className="modal-header">
          <h3>{pledge._id ? "Edit " : "Add "}Pledges</h3>
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
              <Label md="3">Project</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    style={{ color: "#dcdfe9" }}
                    value={pledge.project ? pledge.project.name : ""}
                    onChange={(e) =>
                      setPledge({
                        ...pledge,
                        project: {
                          ...pledge.project,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Amount</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="number"
                    style={{ color: "#dcdfe9" }}
                    value={pledge.amount}
                    onChange={(e) =>
                      setPledge({ ...pledge, amount: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Transaction</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    style={{ color: "#dcdfe9" }}
                    value={pledge.transaction}
                    onChange={(e) =>
                      setPledge({ ...pledge, transaction: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Referrer</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    style={{ color: "#dcdfe9" }}
                    value={pledge.referrer ? pledge.referrer.name : ""}
                    onChange={(e) =>
                      setPledge({
                        ...pledge,
                        referrer: {
                          ...pledge.referrer,
                          name: e.target.value,
                        },
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-1 mb-4">
              <Label md="3">Status</Label>
              <Col md="9">
                <FormGroup check className="form-check-radio">
                  <Label check>
                    <Input
                      id="pending"
                      name="pending"
                      type="radio"
                      checked={pledge.status === 0}
                      onChange={() => setPledge({ ...pledge, status: 0 })}
                    />
                    <span className="form-check-sign" />
                    Pending
                  </Label>
                  <Label style={{ marginLeft: "15px" }} check>
                    <Input
                      id="approved"
                      name="approved"
                      type="radio"
                      checked={pledge.status === 1}
                      onChange={() => setPledge({ ...pledge, status: 1 })}
                    />
                    <span className="form-check-sign" />
                    Approved
                  </Label>
                  <Label style={{ marginLeft: "15px" }} check>
                    <Input
                      id="finished"
                      name="finished"
                      type="radio"
                      checked={pledge.status === 2}
                      onChange={() => setPledge({ ...pledge, status: 2 })}
                    />
                    <span className="form-check-sign" />
                    Reject
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ float: "right", marginRight: "2px" }}>
              <Button color="btn1" onClick={() => save(pledge)}>
                {pledge._id ? "Update" : "Save"}
              </Button>
              <Button color="btn1" onClick={() => closeModal()}>
                Cancel
              </Button>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal modalClassName="modal-black" isOpen={show1}>
        <div className="modal-header">
          <h3>Are you sure you want to delete?</h3>
        </div>
        <div className="modal-body">
          <Row style={{ float: "right", marginRight: "2px" }}>
            <Button color="btn1" onClick={() => remove(pledge)}>
              Confirm
            </Button>
            <Button color="btn1" onClick={() => closeModal1()}>
              Cancel
            </Button>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default Pledge;
