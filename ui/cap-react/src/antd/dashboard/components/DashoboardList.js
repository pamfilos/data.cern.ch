import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Row, List } from "antd";
import DashboardListLoader from "./Loader";
import DashboardListItem from "./DashboardListItem";

const DashoboardList = ({ header = "", listType, list, loading }) => {
  let listKeys = Object.keys(list);
  const [activeList, setActiveList] = useState(listKeys.sort()[0]);
  return loading ? (
    <DashboardListLoader />
  ) : (
    <List
      className="__DashboardList__"
      size="small"
      header={
        <Row
          align="middle"
          justify="space-between"
          style={{ padding: "0 10px" }}
        >
          <Typography.Title level={4}>{header}</Typography.Title>
          <Row align="middle">
            {listKeys.map(type => (
              <Typography.Title
                key={type}
                level={5}
                onClick={() => setActiveList(type)}
                type={activeList != type && "secondary"}
                style={{ marginBottom: 0, marginRight: "5px" }}
              >
                {type}
              </Typography.Title>
            ))}
          </Row>
        </Row>
      }
      data-cy={`${header.replace(/\s/g, "")}-list`}
      itemLayout="horizontal"
      dataSource={list[activeList].list}
      renderItem={item => (
        <Link
          to={
            listType == "draft" ? `/drafts/${item.id}` : `/published/${item.id}`
          }
        >
          <DashboardListItem item={item} listType={listType} />
        </Link>
      )}
      footer={
        list[activeList].list.length > 4 && (
          <Link to={list[activeList].more}>
            <div style={{ textAlign: "center" }}>Show More</div>
          </Link>
        )
      }
    />
  );
};

DashoboardList.propTypes = {
  header: PropTypes.string,
  listType: PropTypes.string,
  emptyMessage: PropTypes.element,
  loading: PropTypes.bool,
  list: PropTypes.object
};

export default DashoboardList;
