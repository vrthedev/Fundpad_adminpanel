import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line, Bar, Pie } from "react-chartjs-2";
import NotificationAlert from "react-notification-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

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
        notify("Failedllets.", "danger");
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
        notify("Failedllets.", "danger");
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

  const investorChartData = {
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
            label: "Countries",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
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

  const referralChartData = {
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
            label: "My First dataset",
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
      labels: ["Raised fund", ""],
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
                          <p className="card-category">App Users</p>
                          <CardTitle tag="h3">{data.app_users}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-single-02" /> App Users
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
                          <p className="card-category">Active Users</p>
                          <CardTitle tag="h3">{data.active_users}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-app" /> Active Users
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
                          <p className="card-category">Pledges Number</p>
                          <CardTitle tag="h3">{data.pledges_num}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-coins" /> Pledges Number
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
                          <p className="card-category">Pledges Total</p>
                          <CardTitle tag="h3">{data.pledges_total}$</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-money-coins" /> Pledges Total
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
                          <p className="card-category">Received Number</p>
                          <CardTitle tag="h3">{data.received_num}</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-money-coins" /> Received
                      Number
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
                          <p className="card-category">Received Total</p>
                          <CardTitle tag="h3">{data.received_total}$</CardTitle>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      <i className="tim-icons icon-money-coins" />
                      Received Total
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg="4" style={{ textAlign: "center" }}>
            <div className="chart-area" style={{ marginTop: 20 }}>
              <Pie data={chartData.data} options={chartData.options} />
            </div>
            {/* <div style={{ transform: "translate(0, 10%)" }}>
              <span
                style={{
                  fontSize: 48,
                  color: "#2a84e9",
                }}
              >
                {Math.round((data.fund_raised / data.fund_target) * 100)}%
              </span>
            </div> */}
            <div style={{ marginTop: 10 }}>
              <h4
                style={{ color: "#808080" }}
              >{`Target Fund: ${data.fund_target} $`}</h4>
            </div>
            <div style={{ marginTop: 0 }}>
              <h4
                style={{ color: "#808080" }}
              >{`Raised Fund: ${data.fund_raised} $`}</h4>
            </div>
            <div style={{ marginTop: 0 }}>
              <h4
                style={{ color: "#808080" }}
              >{`Raised Percentage: ${Math.round(
                (data.fund_raised / data.fund_target) * 100
              )} %`}</h4>
            </div>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Project profits</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-money-coins text-primary" />
                  {profits.length}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={profitChartData.data}
                    options={profitChartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Investor payouts</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-info" />{" "}
                  {total_investor_payouts}$
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={investorChartData.data}
                    options={investorChartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Referral Commissions</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" />{" "}
                  {total_referral_payouts}$
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={referralChartData.data}
                    options={referralChartData.options}
                  />
                </div>
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

export default connect(mapStateToProps)(Dashboard);
