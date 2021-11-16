import React from "react";
import PropTypes from "prop-types";
import { List, Typography } from "antd";
import TimeAgo from "react-timeago";

const DashboardListItem = ({ item }) => {
  let { metadata = {}, updated } = item;

  let {
    general_title = "Untitled Document",
    basic_info: { abstract = "" } = {}
  } = metadata;

  const getTitle = () => {
    let title =
      !general_title || general_title.trim() === ""
        ? "Untitled Document"
        : general_title;

    return title;
  };
  return (
    <List.Item>
      <List.Item.Meta
        title={getTitle()}
        description={
          <Typography.Paragraph ellipsis type="secondary">
            {abstract ? abstract : "No abstract provided"}
          </Typography.Paragraph>
        }
      />
      <Typography.Text style={{ textAlign: "right", marginLeft: "10px" }}>
        <div>updated</div>
        {updated && <TimeAgo date={updated} minPeriod="60" />}
      </Typography.Text>
    </List.Item>
  );
};

DashboardListItem.propTypes = {
  item: PropTypes.object
};

export default DashboardListItem;
