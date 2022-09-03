import React, { useState } from "react";
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
  CustomInput,
} from "reactstrap";
import ReactTable from "components/ReactTable/ReactTable.js";

const dataTable = [
  {
    _id: "1",
    name: "Airi Satou",
    fund_target: 2,
    fund_raised: 8,
    status: true,
  },
  // {
  //   _id: "2",
  //   name: "Afdf Fhf",
  //   fund_target: 4,
  //   fund_raised: 22,
  //   status: true,
  // },
  // {
  //   _id: "3",
  //   name: "Dhr Dghr",
  //   fund_target: 6,
  //   fund_raised: 14,
  //   status: false,
  // },
  // {
  //   _id: "4",
  //   name: "Jyt Hef",
  //   fund_target: 62,
  //   fund_raised: 33,
  //   status: false,
  // },
  // {
  //   _id: "5",
  //   name: "Tde Ljiw",
  //   fund_target: 845,
  //   fund_raised: 94,
  //   status: false,
  // },
  // {
  //   _id: "6",
  //   name: "Eid Owej",
  //   fund_target: 54,
  //   fund_raised: 62,
  //   status: false,
  // },
  // {
  //   _id: "7",
  //   name: "Hoej Koek",
  //   fund_target: 856,
  //   fund_raised: 52,
  //   status: true,
  // },
  // {
  //   _id: "8",
  //   name: "Hoef Hoke",
  //   fund_target: 435,
  //   fund_raised: 28,
  //   status: true,
  // },
  // {
  //   _id: "9",
  //   name: "Iejif Gijd",
  //   fund_target: 23,
  //   fund_raised: 35,
  //   status: false,
  // },
  // {
  //   _id: "10",
  //   name: "WEodf Jije",
  //   fund_target: 67,
  //   fund_raised: 63,
  //   status: false,
  // },
  // {
  //   _id: "11",
  //   name: "Eijg Hijd",
  //   fund_target: 32,
  //   fund_raised: 73,
  //   status: true,
  // },
  // {
  //   _id: "12",
  //   name: "Hdie Hijd",
  //   fund_target: 74,
  //   fund_raised: 33,
  //   status: false,
  // },
];

const Project = () => {
  const [projects, setProjects] = useState(dataTable);
  // const [projects, setProjects] = useState(projects || dataTable);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [project, setProject] = useState({});

  const openModal = (data) => {
    setProject(data);
    setShow(true);
  };

  const closeModal = () => {
    setProject({});
    setShow(false);
  };

  const openModal1 = (data) => {
    setProject(data);
    setShow1(true);
  };

  const closeModal1 = () => {
    setProject({});
    setShow1(false);
  };
  const save = (data) => {
    alert("save");
    setProject({});
    setShow(false);
  };

  const remove = (data) => {
    alert(data._id);
    setProject({});
    setShow1(false);
  };

  const openChange = (data) => {
    console.log(data, "------------change status");
    const tmpPro = { ...data, status: !data.status };
    console.log(tmpPro, "------------change status");
    const tmp = projects.map((pro) => {
      if (pro._id === data._id) return tmpPro;
      return pro;
    });
    console.log(tmp, "---------- tmp projects");

    setProjects(tmp);
    console.log(projects, "----------projects");
    // const tmp = { ...data, status: !data.status };
    // setProjects([tmp]);
  };

  const [data, setData] = React.useState(
    // dataTable.map((prop, key) => {
    projects.map((prop, key) => {
      return {
        ...prop,
        status: prop.status ? "Opened" : "",
        fund_target: prop.fund_target + "$",
        fund_raised: prop.fund_raised + "$",
        switches: (
          <div>
            <CustomInput
              type="switch"
              id="switch-2"
              checked={prop.status}
              // onChange={() => openChange(prop)}
              onChange={() => openChange(prop)}
            />
          </div>
        ),
        actions: (
          <div className="actions-right">
            <Link to={`/bot/projectDetail/${prop._id}`}>
              <Button
                color="warning"
                size="sm"
                className={classNames("btn-icon btn-link like btn-neutral")}
                style={{ opacity: 0.7 }}
              >
                <i class="fa fa-eye" aria-hidden="false"></i>
              </Button>{" "}
            </Link>
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
            {/* use this button to remove the data row */}
            <Button
              onClick={() => openModal1(prop)}
              color="danger"
              size="sm"
              className={classNames(
                "btn-icon btn-link like btn-neutral"
                // , {
                //   "btn-neutral": key < 5,
                // }
              )}
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
                <CardTitle tag="h3">Projects</CardTitle>
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
                      Header: "Target",
                      accessor: "fund_target",
                    },
                    {
                      Header: "Raised",
                      accessor: "fund_raised",
                    },
                    // {
                    //   Header: "Pinned",
                    //   accessor: "pinned",
                    // },
                    {
                      Header: "Status",
                      accessor: "status",
                    },
                    {
                      Header: "Opened",
                      accessor: "switches",
                      sortable: false,
                      filterable: false,
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
          <h3>{project._id ? "Edit " : "Add "}Projects</h3>
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
              <Label md="3">Project Name</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={project.name}
                    onChange={(e) => {
                      setProject({ ...project, name: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Fund Target</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="number"
                    value={project.fund_target}
                    onChange={(e) => {
                      setProject({ ...project, fund_target: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Fund Raised</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="number"
                    value={project.fund_raised}
                    onChange={(e) => {
                      setProject({ ...project, fund_raised: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
              <Label md="3">Pinned</Label>
              <Col md="9">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={project.pinned}
                      onChange={() =>
                        setProject({ ...project, pinned: !project.pinned })
                      }
                    />
                    <span className="form-check-sign" />
                    Pinned
                  </Label>
                </FormGroup>
              </Col>
            </Row> */}
            <Row className="mt-1 mb-4">
              <Label md="3">Status</Label>
              <Col md="9">
                <FormGroup check className="form-check-radio">
                  <Label check>
                    <Input
                      id="pending"
                      name="pending"
                      type="radio"
                      checked={project.status === 0}
                      onChange={() => setProject({ ...project, status: 0 })}
                    />
                    <span className="form-check-sign" />
                    Open
                  </Label>
                  <Label style={{ marginLeft: "15px" }} check>
                    <Input
                      id="active"
                      name="active"
                      type="radio"
                      checked={project.status === 1}
                      onChange={() => setProject({ ...project, status: 1 })}
                    />
                    <span className="form-check-sign" />
                    Close
                  </Label>
                  {/* <Label style={{ marginLeft: "15px" }} check>
                    <Input
                      id="finished"
                      name="finished"
                      type="radio"
                      checked={project.status === 2}
                      onChange={() => setProject({ ...project, status: 2 })}
                    />
                    <span className="form-check-sign" />
                    Finished
                  </Label> */}
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ float: "right", marginRight: "2px" }}>
              <Button color="btn1" onClick={() => save(project)}>
                {project._id ? "Update" : "Save"}
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
            <Button color="btn1" onClick={() => remove(project)}>
              Confirm
            </Button>
            <Button color="btn1" onClick={() => closeModal1()}>
              Cancel
            </Button>
          </Row>
        </div>
      </Modal>
      <Modal modalClassName="modal-black" isOpen={show1}>
        <div className="modal-header">
          <h3>Are you sure you want to delete?</h3>
        </div>
        <div className="modal-body">
          <Row style={{ float: "right", marginRight: "2px" }}>
            <Button color="btn1" onClick={() => remove(project)}>
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

export default Project;
