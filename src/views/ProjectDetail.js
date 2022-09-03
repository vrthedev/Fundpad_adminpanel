import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import ReactTable from "components/ReactTable/ReactTable2.js";

const dataTable = [
  {
    _id: "1",
    name: "Airi Satou",
    fund_target: 2,
    fund_raised: 8,
    status: true,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "2",
    name: "Afdf Fhf",
    fund_target: 4,
    fund_raised: 22,
    status: true,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Gidj Hiej",
        },
        referrer: {
          _id: "1",
          name: "Pgjd Hid",
        },
        amount: 563,
        date: "2021-5-9",
      },
      {
        investor: {
          _id: "2",
          name: "Qidj Hiej",
        },
        referrer: {
          _id: "2",
          name: "Goe Hoe",
        },
        amount: 2352,
        date: "2022-4-6",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "3",
    name: "Dhr Dghr",
    fund_target: 6,
    fund_raised: 14,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "WIj Gid",
        },
        referrer: {
          _id: "1",
          name: "GHije Hiej",
        },
        amount: 300,
        date: "2020-4-7",
      },
      {
        investor: {
          _id: "2",
          name: "Xko Hie",
        },
        referrer: {
          _id: "2",
          name: "Hij Koo",
        },
        amount: 909,
        date: "2022-4-8",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "4",
    name: "Jyt Hef",
    fund_target: 62,
    fund_raised: 33,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gjidj HIjie",
        },
        referrer: {
          _id: "2",
          name: "Qjid Hijd",
        },
        amount: 300,
        date: "2022-8-3",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "5",
    name: "Tde Ljiw",
    fund_target: 845,
    fund_raised: 94,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Kok Hii",
        },
        referrer: {
          _id: "2",
          name: "QJij Hijd",
        },
        amount: 1409,
        date: "2021-10-31",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "6",
    name: "Eid Owej",
    fund_target: 54,
    fund_raised: 62,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Gdiji Hije",
        },
        referrer: {
          _id: "1",
          name: "Gidj Hije",
        },
        amount: 550,
        date: "Gjidj",
      },
      {
        investor: {
          _id: "2",
          name: "Gidj JIje",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 4493,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "7",
    name: "Hoej Koek",
    fund_target: 856,
    fund_raised: 52,
    status: true,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "8",
    name: "Hoef Hoke",
    fund_target: 435,
    fund_raised: 28,
    status: true,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "9",
    name: "Iejif Gijd",
    fund_target: 23,
    fund_raised: 35,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "10",
    name: "WEodf Jije",
    fund_target: 67,
    fund_raised: 63,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "11",
    name: "Eijg Hijd",
    fund_target: 32,
    fund_raised: 73,
    status: true,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
  {
    _id: "12",
    name: "Hdie Hijd",
    fund_target: 74,
    fund_raised: 33,
    status: false,
    pledges: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        referrer: {
          _id: "1",
          name: "Gdfe Idgd",
        },
        amount: 300,
        date: "2021-3-3",
      },
      {
        investor: {
          _id: "2",
          name: "Gdij Jiej",
        },
        referrer: {
          _id: "2",
          name: "Gidj Hid",
        },
        amount: 300,
        date: "2021-5-13",
      },
    ],
    benefits: [
      {
        investor: {
          _id: "1",
          name: "Jone Gdj",
        },
        profit: 2,
        commission: 1.4,
      },
      {
        investor: {
          _id: "21",
          name: "Gdjj Koek",
        },
        profit: 3,
        commission: 1.7,
      },
      {
        investor: {
          _id: "3",
          name: "Gid Hij",
        },
        profit: 5,
        commission: 2.3,
      },
    ],
  },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const curPros = dataTable.filter((pro) => pro._id === id);
  const curPro = curPros.length > 0 ? curPros[0] : {};

  const [pledges, setPledges] = React.useState(
    curPro.pledges.map((prop, key) => {
      return {
        ...prop,
        investor: prop.investor.name,
        referrer: prop.referrer.name,
      };
    })
  );
  const [benefits, setBenefits] = React.useState(
    curPro.benefits.map((prop, key) => {
      return {
        ...prop,
        investor: prop.investor.name,
        profit: prop.profit + "%",
        commission: prop.commission + "%",
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
                <CardTitle tag="h3">{curPro.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <div style={{ marginLeft: "40px" }}>
                  <Row>
                    <h4>Target Fund: </h4>
                    <h4 style={{ marginLeft: "10px" }}>
                      {curPro.fund_target}$
                    </h4>
                  </Row>
                  <Row>
                    <h4>Raised Fund: </h4>
                    <h4 style={{ marginLeft: "10px" }}>
                      {curPro.fund_raised}$
                    </h4>
                  </Row>
                  <Row>
                    <h4>Number of pledges:</h4>
                    <h4 style={{ marginLeft: "10px" }}>
                      {curPro.pledges.length}
                    </h4>
                  </Row>
                </div>
                <h3 style={{ marginTop: "40px", marginLeft: "20px" }}>
                  Pledges
                </h3>
                <ReactTable
                  data={pledges}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Investor",
                      accessor: "investor",
                    },
                    {
                      Header: "Referrer",
                      accessor: "referrer",
                    },
                    {
                      Header: "Amount",
                      accessor: "amount",
                    },
                    {
                      Header: "Date",
                      accessor: "date",
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
                <h3 style={{ marginTop: "40px", marginLeft: "20px" }}>
                  User Benefit
                </h3>
                <ReactTable
                  data={benefits}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Investor",
                      accessor: "investor",
                    },
                    {
                      Header: "Profit",
                      accessor: "profit",
                    },
                    {
                      Header: "Commission",
                      accessor: "commission",
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProjectDetail;
