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
  CustomInput,
} from "reactstrap";
import Moment from "moment";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import ReactTable11 from "components/ReactTable/ReactTable11.js";
import AppUserDetail from "./AppUserDetail";
import { jsPDF } from "jspdf";
import wait from "./wait";
import html2canvas from "html2canvas";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import "../assets/css/custom.css";

const AppUser = ({ credential }) => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false); //edit modal
  const [show1, setShow1] = useState(false); //delete modal
  const [show2, setShow2] = useState(false); //detail modal
  const [show3, setShow3] = useState(false);
  const [user, setUser] = useState({});
  const [isExport, setIsExport] = useState(true);
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
    setUser(data);
    setShow(true);
  };

  const closeModal = () => {
    setUser({});
    setShow(false);
  };

  const showDetail = (data) => {
      setUser(data);
      setShow2(true);
  };

  const showChange = (data) => {
    setUser({ ...data, password: "", password1: "" });
    setShow3(true);
    closeDetail();
  };

  const changePassword = () => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.appuser_changePassword.url,
          apiConfig.appuser_changePassword.method,
          credential.loginToken,
          {
            email: user.email,
            new_password: user.password1,
          }
        );
        if (response.data.result) {
          const resp = await ApiCall(
            apiConfig.appuser_get.url,
            apiConfig.appuser_get.method,
            credential.loginToken
          );
          if (resp.data.result) {
            let tmp = response.data.data;
            setUsers(
              resp.data.data.map((p) => {
                const refs = tmp.filter((r) => p.referrer_id === r._id);
                return {
                  ...p,
                  referrer:
                    refs.length > 0
                      ? { value: refs[0]._id, label: refs[0].fullname }
                      : {},
                };
              })
            );
          } else {
            notify(resp.data.message, "danger");
          }
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failed", "danger");
      }
    })();
    setShow3(false);
  };

  const closeChange = () => {
    setShow3(false);
  };

  const closeDetail = () => {
    setShow2(false);
  };

  const openModal1 = (data) => {
    setUser(data);
    setShow1(true);
  };

  const closeModal1 = () => {
    setUser({});
    setShow1(false);
  };

  const save = async (pro) => {
    pro = { ...pro, referrer_id: pro.referrer.value };
    try {
      const response = await ApiCall(
        apiConfig.appuser_upsert.url,
        apiConfig.appuser_upsert.method,
        credential.loginToken,
        pro
      );
      if (response.data.result) {
        const resp = await ApiCall(
          apiConfig.appuser_get.url,
          apiConfig.appuser_get.method,
          credential.loginToken
        );
        if (resp.data.result) {
          let tmp = resp.data.data;
          setUsers(
            resp.data.data.map((p) => {
              const refs = tmp.filter((r) => p.referrer_id === r._id);
              return {
                ...p,
                referrer:
                  refs.length > 0
                    ? { value: refs[0]._id, label: refs[0].fullname }
                    : {},
              };
            })
          );
        } else {
          notify(resp.data.message, "danger");
        }
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      notify("Failed", "danger");
    }
    setUser({});
    setShow(false);
  };

  const selRow = (data) => {
    // showDetail(data.values);
  };

  const remove = async (data) => {
    try {
      const response = await ApiCall(
        apiConfig.appuser_del.url,
        apiConfig.appuser_del.method,
        credential.loginToken,
        data
      );
      if (response.data.result) {
        const response = await ApiCall(
          apiConfig.appuser_get.url,
          apiConfig.appuser_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          let tmp = response.data.data;
          setUsers(
            response.data.data.map((p) => {
              const refs = tmp.filter((r) => p.referrer_id === r._id);
              return {
                ...p,
                referrer:
                  refs.length > 0
                    ? { value: refs[0]._id, label: refs[0].fullname }
                    : {},
              };
            })
          );
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
    setUser({});
    setShow1(false);
  };

  const exportPDF = async () => {
    setIsExport(false);
    await wait(10);
    const pdf = new jsPDF("landscape", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"));
    setIsExport(true);
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("appuser.pdf");
  };

  const exportExcel = (d) => {
    const appuserData = d.map((p) => ({
      Name: p.fullname,
      Email: p.email,
      Referrer: p.referrer.label,
      Referrals: p.referral_count,
      "Referral Volume": p.referral_volume,
      "Billing Volume": p.billing_volume,
      Wallet: p.wallet,
      "Referral Code": p.referral_code,
      Active: p.isActiveUser,
    }));
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const wsAppuser = XLSX.utils.json_to_sheet(appuserData);
    const wb = {
      Sheets: { appuser: wsAppuser },
      SheetNames: ["appuser"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "appuser.xlsx");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.appuser_get.url,
          apiConfig.appuser_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          let tmp = response.data.data;
          setUsers(
            response.data.data.map((p) => {
              const refs = tmp.filter((r) => p.referrer_id === r._id);
              return {
                ...p,
                referrer:
                  refs.length > 0
                    ? { value: refs[0]._id, label: refs[0].fullname }
                    : {},
                isActiveUser: p.isActiveUser ? (
                  <span style={{ marginLeft: 5, color: "green" }}>
                    <i className="tim-icons icon-check-2" />
                  </span>
                ) : (
                  <span style={{ marginLeft: 5, color: "red" }}>
                    <i className="tim-icons icon-simple-remove" />
                  </span>
                ),
                isis: p.isActiveUser ? 1 : 0,
                referral_volume: "$" + p.referral_volume,
                billing_volume: "$" + p.billing_volume,
              };
            })
          );
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failed", "danger");
      }
    })();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    var data = users.map((prop, key) => {
      return {
        ...prop,
        phone: `(${prop.dialcode})${prop.phone}`,
        createdAt: Moment(prop.createdAt).format("DD/MM/YYYY hh:mm:ss"),
        actions: (
          <div className="actions-right">
            <Button
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link like btn-neutral")}
              onClick={() => showChange(prop)}
              style={{ opacity: 0.7 }}
            >
              <i class="tim-icons icon-key-25" aria-hidden="false"></i>
            </Button>{" "}
            <Button
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link like btn-neutral")}
              onClick={() => showDetail(prop)}
              style={{ opacity: 0.7 }}
            >
              <i class="fa fa-eye" aria-hidden="false"></i>
            </Button>
            <Button
              onClick={() => openModal(prop)}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link like btn-neutral")}
              style={{ opacity: 0.7 }}
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
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
  }, [users]);

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <Card id="pdf">
              <CardHeader>
                <CardTitle tag="h3">
                  <span style={{ fontSize: "28px" }}>
                    <div className="flex-row" style={{ marginLeft: 20 }}>
                      App Users
                      <div style={{ float: "right" }}>
                        {isExport && (
                          <>
                            <span
                              style={{
                                cursor: "pointer",
                                fontSize: 16,
                                color: "rgba(34, 42, 66, 0.7)",
                              }}
                              onClick={() => exportPDF()}
                            >
                              PDF
                            </span>
                            <span
                              style={{
                                marginLeft: 20,
                                cursor: "pointer",
                                fontSize: 16,
                                color: "rgba(34, 42, 66, 0.7)",
                              }}
                              onClick={() => exportExcel(data)}
                            >
                              Excel
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable11
                  data={data}
                  isExport={isExport}
                  filterable
                  resizable={false}
                  selRow={selRow}
                  columns={
                    isExport
                      ? [
                          {
                            Header: "Name",
                            accessor: "fullname",
                          },
                          {
                            Header: "Email",
                            accessor: "email",
                          },
                          {
                            Header: "Referrer",
                            accessor: "referrer.label",
                          },
                          {
                            Header: "Referrals",
                            accessor: "referral_count",
                          },
                          {
                            Header: "Referral Volume",
                            accessor: "referral_volume",
                          },
                          {
                            Header: "Billing Volume",
                            accessor: "billing_volume",
                          },
                          {
                            Header: "Wallet",
                            accessor: "wallet",
                          },
                          {
                            Header: "Active",
                            accessor: "isActiveUser",
                          },
                          {
                            Header: "isis",
                            accessor: "isis",
                          },
                          {
                            Header: "_id",
                            accessor: "_id",
                          },
                          {
                            Header: "Actions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false,
                          },
                        ]
                      : [
                          {
                            Header: "Name",
                            accessor: "fullname",
                          },
                          {
                            Header: "Email",
                            accessor: "email",
                          },
                          {
                            Header: "Referrer",
                            accessor: "referrer.label",
                          },
                          {
                            Header: "Referrals",
                            accessor: "referral_count",
                          },
                          {
                            Header: "Referral Volume",
                            accessor: "referral_volume",
                          },
                          {
                            Header: "Billing Volume",
                            accessor: "billing_volume",
                          },
                          {
                            Header: "Wallet",
                            accessor: "wallet",
                          },
                          // {
                          //   Header: "Referral Code",
                          //   accessor: "referral_code",
                          // },
                          {
                            Header: "Active",
                            accessor: "isActiveUser",
                          },
                        ]
                  }
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
      <Modal isOpen={show} style={{ transform: "translate(0, 10%)" }}>
        <div className="modal-header">
          <h4>{user._id ? "Edit " : "Add "}User</h4>
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
                    value={user.fullname}
                    onChange={(e) => {
                      setUser({ ...user, fullname: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Email</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Dial Code</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={user.dialcode}
                    onChange={(e) => {
                      setUser({ ...user, dialcode: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Phone</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={user.phone}
                    onChange={(e) => {
                      setUser({ ...user, phone: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Address</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={user.address}
                    onChange={(e) => {
                      setUser({ ...user, address: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Wallet</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={user.wallet}
                    onChange={(e) => {
                      setUser({ ...user, wallet: e.target.value });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            {!user._id && (
              <Row>
                <Label md="3">Default password</Label>
                <Col md="9" className="mt-2">
                  <FormGroup>
                    <Input type="text" readOnly defaultValue="12345" />
                  </FormGroup>
                </Col>
              </Row>
            )}
            <Row className="mt-1 mb-4">
              <Label md="3">Referrer</Label>
              <Col md="9">
                <FormGroup>
                  <FormGroup>
                    <Select
                      className="react-select info"
                      classNamePrefix="react-select"
                      name="investor"
                      value={user.referrer}
                      onChange={(value) =>
                        setUser({ ...user, referrer: value })
                      }
                      options={users.map((one) => ({
                        value: one._id,
                        label: one.fullname,
                      }))}
                    />
                  </FormGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ float: "right", marginRight: "2px" }}>
              <Button color="btn1 btn-sm" onClick={() => save(user)}>
                {user._id ? "Update" : "Save"}
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
            <Button color="btn1 btn-sm" onClick={() => remove(user)}>
              Confirm
            </Button>
            <Button color="btn1 btn-sm" onClick={() => closeModal1()}>
              Cancel
            </Button>
          </Row>
        </div>
      </Modal>
      <Modal
        isOpen={show2}
        className={"custom_modal"}
        toggle={() => closeDetail()}
      >
        <div className="modal-body">
          <Label className="appuser_detail_title">App User Details</Label>
          <AppUserDetail id={user._id} />
        </div>
      </Modal>
      <Modal isOpen={show3}>
        <div className="modal-header">
          <h4>Change password</h4>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => closeChange()}
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
                    value={user.fullname || ""}
                    onChange={() => {}}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Email</Label>
              <Col md="9">
                <FormGroup>
                  <Input
                    type="text"
                    value={user.email || ""}
                    onChange={() => {}}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Password</Label>
              <Col md="9" className="mt-2">
                <FormGroup>
                  <Input
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Label md="3">Confirm</Label>
              <Col md="9" className="mt-2">
                <FormGroup>
                  <Input
                    type="password"
                    value={user.password1}
                    onChange={(e) =>
                      setUser({ ...user, password1: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ float: "right", marginRight: "2px" }}>
              {user.password === user.password1 && user.password && (
                <Button color="btn1 btn-sm" onClick={() => changePassword()}>
                  Confirm
                </Button>
              )}
              <Button color="btn1 btn-sm" onClick={() => closeChange()}>
                Close
              </Button>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { credential: LoginReducer };
};

export default connect(mapStateToProps)(AppUser);
