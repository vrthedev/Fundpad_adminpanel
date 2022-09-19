import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line, Bar, Pie } from "react-chartjs-2";
import NotificationAlert from "react-notification-alert";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
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
import ReactDatetime from "react-datetime";

let chartOption = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          // suggestedMax: 125,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};

const Dashboard = ({ credential }) => {
  const { apiConfig, ApiCall } = global;
  const notificationAlertRef = React.useRef(null);
  const [data, setData] = useState({});
  const [profits, setProfits] = useState([]);
  const [show, setShow] = useState(false);
  const [project, setProject] = useState({});

  let total_investor_payouts = 0;
  let total_referral_payouts = 0;
  profits.map((p) => {
    if (p.investor_payouts) total_investor_payouts += p.investor_payouts;
    if (p.referral_payouts) total_referral_payouts += p.referral_payouts;
  });

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

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.dashboard.url,
          apiConfig.dashboard.method,
          credential.loginToken
        );
        if (response.data.result) {
          setData(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failed", "danger");
      }
    })();
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
        notify("Failed", "danger");
      }
    })();

    //set project
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.pro_get.url,
          apiConfig.pro_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          console.log(response.data.data);
          setProject(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failed", "danger");
      }
    })();
  }, []);

  const profitChartData = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

      return {
        labels: profits.map((p) => p.name),
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: profits.map((p) => p.percentage || 0),
          },
        ],
      };
    },
    options: chartOption,
  };

  const barChartData = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

      return {
        labels: profits.map((p) => p.name),
        datasets: [
          {
            label: `Profits ${total_investor_payouts}$`,
            fill: true,
            backgroundColor: "#f36648",
            hoverBackgroundColor: "#f36648",
            borderColor: "#f36648",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: profits.map((p) => p.investor_payouts || 0),
          },
          {
            label: `Commissions ${total_referral_payouts}$`,
            fill: true,
            backgroundColor: "#7a48f3",
            hoverBackgroundColor: "#7a48f3",
            borderColor: "#7a48f3",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: profits.map((p) => p.referral_payouts || 0),
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 1,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              // suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
  };

  const lineChartData = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
      gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
      gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

      return {
        labels: profits.map((p) => p.name),
        datasets: [
          {
            label: "Referral Payouts",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: profits.map((p) => p.referral_payouts || 0),
          },
          {
            label: "Investor Payouts",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#ed4343",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#ed4343",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: profits.map((p) => p.investor_payouts || 0),
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              // suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    },
  };

  const chartData = {
    data: {
      labels: ["Pledged amount", ""],
      datasets: [
        {
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: ["#2a84e9", "#c7bfbf"],
          borderWidth: 0,
          data: [data.fund_raised, data.fund_target - data.fund_raised],
        },
      ],
    },
    options: {
      cutoutPercentage: 70,
      legend: {
        display: false,
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      scales: {
        yAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: "rgba(255,255,255,0.05)",
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
    },
  };

  const closeModal = () => {
    setShow(false);
  };
  const save = async (pro) => {
    try {
      const response = await ApiCall(
        apiConfig.pro_upsert.url,
        apiConfig.pro_upsert.method,
        credential.loginToken,
        pro
      );
      if (response.data.result) {
        window.location.reload();
      } else {
        notify(response.data.data, "danger");
      }
    } catch (error) {
      notify("Failed", "danger");
    }
    setProject({});
    setShow(false);
  };

  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Row>
          <Col lg="8">
            <Row>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-success">
                          <i className="tim-icons icon-single-02" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Registerd App Users</p>
                          <CardTitle tag="h3">{data.app_users}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-single-02" />
                      Registerd App Users
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-primary">
                          <i className="tim-icons icon-coins" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Pledges (no.)</p>
                          <CardTitle tag="h3">{data.pledges_num}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-coins" /> Pledges (no.)
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-warning">
                          <i className="tim-icons icon-app" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Active App Users</p>
                          <CardTitle tag="h3">{data.active_users}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-app" /> Active App Users
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-danger">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">TXID Submitted (no.) </p>
                          <CardTitle tag="h3">{data.received_num}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-money-coins" /> TXID
                      Submitted (no.)
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-danger">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Pledges ($)</p>
                          <CardTitle tag="h3">{data.pledges_total}$</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-money-coins" /> Pledges ($)
                    </div>
                  </CardFooter>
                </Card>
              </Col>

              <Col lg="4" md="6">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <Col xs="5">
                        <div className="info-icon text-center icon-danger">
                          <i className="tim-icons icon-money-coins" />
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Active Users ($)</p>
                          <CardTitle tag="h3">{data.received_total}$</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-money-coins" />
                      Confirmed payments by admin
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Payouts</h5>
                    <CardTitle tag="h4"></CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={barChartData.data}
                        options={barChartData.options}
                        height="450px"
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg="4" style={{ textAlign: "center" }}>
            <div className="chart-area" style={{ marginTop: 20 }}>
              <Pie data={chartData.data} options={chartData.options} />
            </div>
            <div style={{ marginTop: 10 }}>
              <h4
                style={{ color: "#808080" }}
              >{`Target Amount: ${data.fund_target} $`}</h4>
            </div>
            <div style={{ marginTop: 0 }}>
              <h4
                style={{ color: "#808080" }}
              >{`Pledged amount: ${data.fund_raised} $`}</h4>
            </div>
            <div style={{ marginTop: 0 }}>
              <h4
                style={{ color: "#808080" }}
              >{`Pledged Percentage: ${Math.round(
                (data.fund_raised / data.fund_target) * 100
              )} %`}</h4>
            </div>
            <button
              onClick={() => {
                setShow(true);
              }}
            >
              Edit{" "}
            </button>
          </Col>
        </Row>
      </div>
      <Modal isOpen={show}>
        <div className="modal-header">
          <h4>{project._id ? "Edit " : "Add "}Projects</h4>
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
            {/* <Row>
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
            </Row> */}
            <Row>
              <Label md="3">Target</Label>
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
              <Label md="3">Pledged</Label>
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
              <Label md="3">End Date</Label>
              <Col md="9">
                <FormGroup>
                  <ReactDatetime
                    inputProps={{
                      className: "form-control",
                      placeholder: "Datetime Picker Here",
                    }}
                    value={{ _d: project.endDate }}
                    onChange={(date) => {
                      setProject({ ...project, endDate: date._d });
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-1 mb-4">
              <Label md="3"></Label>
              <Col md="9">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      defaultChecked={project.isActive}
                      onChange={() =>
                        setProject({ ...project, isActive: !project.isActive })
                      }
                    />
                    <span className="form-check-sign" />
                    IsActive
                  </Label>
                </FormGroup>
              </Col>
            </Row> */}
            <Row style={{ float: "right", marginRight: "2px" }}>
              <Button color="btn1 btn-sm" onClick={() => save(project)}>
                {project._id ? "Update" : "Save"}
              </Button>
              <Button color="btn1 btn-sm" onClick={() => closeModal()}>
                Cancel
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

export default connect(mapStateToProps)(Dashboard);
