import { Tag } from "antd";

const statusColorMap = {
  pending: "gold",
  verified: "green",
  rejected: "red",
};

function DomainStatusTag({ status }) {
  return <Tag color={statusColorMap[status]}>{status}</Tag>;
}

export default DomainStatusTag;
