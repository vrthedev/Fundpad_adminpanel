import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import Moment from "moment";
import NotificationAlert from "react-notification-alert";
import ReactTable from "components/ReactTable/ReactTable2.js";
// import { Pie } from "react-chartjs-2";
// import { jsPDF } from "jspdf";
// import wait from "./wait";
// import html2canvas from "html2canvas";
// import * as FileSaver from "file-saver";
// import * as XLSX from "xlsx";

const AppUserDetail = ({ credential }) => {
  const { id } = useParams();
  const { apiConfig, ApiCall } = global;
  const notificationAlertRef = React.useRef(null);
  console.log(id, apiConfig.appuser_info, "-------id");

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

  const [userinfo, setUserinfo] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [isExport, setIsExport] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig.appuser_info.url,
          apiConfig.appuser_info.method,
          credential.loginToken,
          { app_user_id: id }
        );
        if (response.data.result) {
          setUser(response.data.data);
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
          apiConfig.appuser_get.url,
          apiConfig.appuser_get.method,
          credential.loginToken
        );
        if (response.data.result) {
          setUsers(response.data.data);
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
          apiConfig.account_info.url,
          apiConfig.account_info.method,
          credential.loginToken,
          { app_user_id: id }
        );
        if (response.data.result) {
          setUserinfo(response.data.data);
        } else {
          notify(response.data.data, "danger");
        }
      } catch (error) {
        notify("Failedllets.", "danger");
      }
    })();
  }, []);

  // const chartData = {
  //   data: {
  //     labels: ["Target fund", "Raised fund"],
  //     datasets: [
  //       {
  //         label: "Emails",
  //         pointRadius: 0,
  //         pointHoverRadius: 0,
  //         backgroundColor: ["#ff8779", "#2a84e9"],
  //         borderWidth: 0,
  //         data: [project.fund_target, project.fund_raised],
  //       },
  //     ],
  //   },
  //   options: {
  //     cutoutPercentage: 70,
  //     legend: {
  //       display: false,
  //     },
  //     tooltips: {
  //       backgroundColor: "#f5f5f5",
  //       titleFontColor: "#333",
  //       bodyFontColor: "#666",
  //       bodySpacing: 4,
  //       xPadding: 12,
  //       mode: "nearest",
  //       intersect: 0,
  //       position: "nearest",
  //     },
  //     scales: {
  //       yAxes: [
  //         {
  //           display: 0,
  //           ticks: {
  //             display: false,
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             zeroLineColor: "transparent",
  //             color: "rgba(255,255,255,0.05)",
  //           },
  //         },
  //       ],
  //       xAxes: [
  //         {
  //           display: 0,
  //           barPercentage: 1.6,
  //           gridLines: {
  //             drawBorder: false,
  //             color: "rgba(255,255,255,0.1)",
  //             zeroLineColor: "transparent",
  //           },
  //           ticks: {
  //             display: false,
  //           },
  //         },
  //       ],
  //     },
  //   },
  // };

  const getUserName = (_id) => {
    if (users.length === 0 || !users) return "";
    const tmp = users.filter((u) => u._id === _id);
    if (!tmp || tmp.length === 0) return "";
    return tmp[0].fullname || "";
  };

  // const exportPDF = async () => {
  //   setIsExport(false);
  //   await wait(10);
  //   // const pdf = new jsPDF("portrait", "pt", "a4");
  //   const pdf = new jsPDF("landscape", "pt", "a4");
  //   const data = await html2canvas(document.querySelector("#pdf"));
  //   setIsExport(true);
  //   const img = data.toDataURL("image/png");
  //   const imgProperties = pdf.getImageProperties(img);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
  //   pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("project_detail.pdf");
  // };

  // const exportExcel = (pledges, profits) => {
  //   const pledgeData = pledges.map((p) => ({
  //     Investor: getUserName(p.investor_id),
  //     Referrer: getUserName(p.referrer_id),
  //     Amount: p.amount,
  //     CreatedAt: Moment(p.createdAt).format("DD/MM/YYYY hh:mm:ss"),
  //   }));
  //   const profitData = profits.map((p) => ({
  //     Name: p.name,
  //     Percentage: p.percentage,
  //     CreatedAt: Moment(p.createdAt).format("DD/MM/YYYY hh:mm:ss"),
  //   }));
  //   console.log(pledgeData, profitData, "+++");
  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const fileExtension = ".xlsx";
  //   const wsPledge = XLSX.utils.json_to_sheet(pledgeData);
  //   const wsProfit = XLSX.utils.json_to_sheet(profitData);
  //   const wb = {
  //     Sheets: { pledge: wsPledge, profit: wsProfit },
  //     SheetNames: ["pledge", "profit"],
  //   };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, "project_detail.xlsx");
  // };
  let userinfo1 = {};
  if (userinfo.pledges)
    userinfo1 = {
      ...userinfo,
      pledges: userinfo.pledges.map((p) => ({
        ...p,
        status: p.transaction ? (
          <span style={{ color: "green" }}>Received</span>
        ) : (
          <span style={{ color: "red" }}>Pledged</span>
        ),
        approved:
          p.status === 0 ? (
            <span style={{ color: "yello" }}>
              <span>Pending</span>
              <span style={{ marginLeft: 14 }}>
                <i className="tim-icons icon-simple-delete" />
              </span>
            </span>
          ) : p.status === 1 ? (
            <span style={{ color: "green" }}>
              <span>Approved</span>
              <span style={{ marginLeft: 5 }}>
                <i className="tim-icons icon-check-2" />
              </span>
            </span>
          ) : (
            <span style={{ color: "red" }}>
              <span>Rejected</span>
              <span style={{ marginLeft: 10 }}>
                <i className="tim-icons icon-simple-remove" />
              </span>
            </span>
          ),
        amount: p.amount ? p.amount + "$" : "",
        createdAt: Moment(p.createdAt).format("DD/MM/YYYY hh:mm:ss"),
      })),
      additional_payouts: userinfo.additional_payouts.map((p) => ({
        ...p,
        username: getUserName(p.app_user_id),
        base_amount: p.base_amount ? p.base_amount + "$" : "",
        amount: p.amount ? p.amount + "$" : "",
        percentage: p.percentage ? p.percentage + "%" : "",
        createdAt: Moment(p.createdAt).format("DD/MM/YYYY hh:mm:ss"),
      })),
      investor_payouts: userinfo.investor_payouts.map((p) => ({
        ...p,
        username: getUserName(p.app_user_id),
        base_amount: p.base_amount ? p.base_amount + "$" : "",
        amount: p.amount ? p.amount + "$" : "",
        percentage: p.percentage ? p.percentage + "%" : "",
        createdAt: Moment(p.createdAt).format("DD/MM/YYYY hh:mm:ss"),
      })),
      referral_payouts: userinfo.referral_payouts.map((p) => ({
        ...p,
        username: getUserName(p.app_user_id),
        base_amount: p.base_amount ? p.base_amount + "$" : "",
        amount: p.amount ? p.amount + "$" : "",
        percentage: p.percentage ? p.percentage + "%" : "",
        createdAt: Moment(p.createdAt).format("DD/MM/YYYY hh:mm:ss"),
      })),
    };

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
                  <div className="flex-row">
                    {/* {project.name} */}
                    {/* <div style={{ float: "right" }}>
                      {isExport && (
                        <>
                          <span
                            style={{
                              cursor: "pointer",
                              fontSize: 16,
                              color: "rgba(34, 42, 66, 0.7)",
                            }}
                            // onClick={() => exportPDF()}
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
                            // onClick={() => exportExcel(pledges, profits)}
                          >
                            Excel
                          </span>
                        </>
                      )}
                    </div> */}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row style={{ marginLeft: -10 }}>
                  {/* <Col md="8" lg="9" sm="7">
                    <Row>
                      <h4>Pledge sum: </h4>
                      <h4 style={{ marginLeft: 0 }}>
                        {userinfo1.pledges_sum}$
                      </h4>
                    </Row>
                    <Row>
                      <h4>Additional payout sum: </h4>
                      <h4 style={{ marginLeft: 5 }}>
                        {userinfo1.additional_payout_sum}$
                      </h4>
                    </Row>
                    <Row>
                      <h4>Investor payout sum: </h4>
                      <h4 style={{ marginLeft: 5 }}>
                        {userinfo1.investor_payout_sum}$
                      </h4>
                    </Row>
                    <Row>
                      <h4>Referral payout sum:</h4>
                      <h4 style={{ marginLeft: 5 }}>
                        {userinfo1.referral_payout_sum}
                      </h4>
                    </Row>
                  </Col> */}
                  <Col md="3">
                    <h4>{`Name: ${user.fullname}`}</h4>
                  </Col>
                  <Col md="3">
                    <h4>{`Email: ${user.email}`}</h4>
                  </Col>
                  <Col md="3">
                    <h4>{`Wallet: ${user.wallet}`}</h4>
                  </Col>
                  <Col md="3">
                    <h4>{`Phone: (${user.dialcode})${user.phone}`}</h4>
                  </Col>
                  {/* <Col md="4" lg="3" sm="5">
                    <div className="chart-area">
                      <Pie data={chartData.data} options={chartData.options} />
                    </div>
                  </Col> */}
                </Row>
                <Row style={{ marginLeft: -10 }}>
                  <Col md="3">
                    <h4>{`Address: ${user.address}`}</h4>
                  </Col>
                  <Col md="3">
                    <h4>{`Referrer: ${getUserName(user.referrer_id)}`}</h4>
                  </Col>
                  <Col md="6">
                    <h4>{`Referral code: ${user.referral_code}`}</h4>
                  </Col>
                </Row>
                <div style={{ marginTop: 20 }}>
                  {userinfo1.pledges ? (
                    <ReactTable
                      data={userinfo1.pledges}
                      filterable
                      title={"Pledges: " + userinfo1.pledges_sum + "$"}
                      isExport={isExport}
                      resizable={false}
                      columns={[
                        {
                          Header: "Investor",
                          accessor: "investor_name",
                        },
                        {
                          Header: "Referrer",
                          accessor: "referrer_name",
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
                          Header: "Status",
                          accessor: "status",
                        },
                        {
                          Header: "Approved",
                          accessor: "approved",
                        },
                        {
                          Header: "CreatedAt",
                          accessor: "createdAt",
                        },
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ marginTop: 20 }}>
                  {userinfo1.investor_payouts ? (
                    <ReactTable
                      data={userinfo1.investor_payouts}
                      isProfit={true}
                      isExport={isExport}
                      title={
                        "Investor payouts: " +
                        userinfo1.investor_payout_sum +
                        "$"
                      }
                      filterable
                      resizable={false}
                      columns={[
                        {
                          Header: "Profit Name",
                          accessor: "profit_name",
                        },
                        {
                          Header: "User Name",
                          accessor: "username",
                        },
                        {
                          Header: "Invest Amount",
                          accessor: "base_amount",
                        },
                        {
                          Header: "Percentage",
                          accessor: "percentage",
                        },
                        {
                          Header: "Payout",
                          accessor: "amount",
                        },
                        {
                          Header: "CreatedAt",
                          accessor: "createdAt",
                        },
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ marginTop: 20 }}>
                  {userinfo1.referral_payouts ? (
                    <ReactTable
                      data={userinfo1.referral_payouts}
                      isProfit={true}
                      isExport={isExport}
                      title={
                        "Referral payouts: " +
                        userinfo1.referral_payout_sum +
                        "$"
                      }
                      filterable
                      resizable={false}
                      columns={[
                        {
                          Header: "Profit Name",
                          accessor: "profit_name",
                        },
                        {
                          Header: "User Name",
                          accessor: "username",
                        },
                        {
                          Header: "Referral Invest Amount",
                          accessor: "base_amount",
                        },
                        {
                          Header: "Percentage",
                          accessor: "percentage",
                        },
                        {
                          Header: "Payout",
                          accessor: "amount",
                        },
                        {
                          Header: "CreatedAt",
                          accessor: "createdAt",
                        },
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ marginTop: 20 }}>
                  {userinfo1.additional_payouts ? (
                    <ReactTable
                      data={userinfo1.additional_payouts}
                      isProfit={true}
                      isExport={isExport}
                      title={
                        "Additional payouts: " +
                        userinfo1.additional_payout_sum +
                        "$"
                      }
                      filterable
                      resizable={false}
                      columns={[
                        {
                          Header: "Profit Name",
                          accessor: "profit_name",
                        },
                        {
                          Header: "User Name",
                          accessor: "username",
                        },
                        {
                          Header: "Invest Amount",
                          accessor: "base_amount",
                        },
                        {
                          Header: "Percentage",
                          accessor: "percentage",
                        },
                        {
                          Header: "Payout",
                          accessor: "amount",
                        },
                        {
                          Header: "CreatedAt",
                          accessor: "createdAt",
                        },
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  ) : (
                    <></>
                  )}
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

export default connect(mapStateToProps)(AppUserDetail);
