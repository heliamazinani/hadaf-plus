import { Tag, Switch, Badge, Popover } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import DomainStatusTag from "../components/DomainStatusTag";
import  RowActionsDropdown  from "../../../components/RowActionsDropdown";
export const getDomainColumns = ({ onEdit, onDelete }) => [
  {
    title: "Domain",
    dataIndex: "domain",
    key: "domain",
    render: (domain, record) => (
      <>
        <Badge status={record.isActive ? "success" : "error"} />
        <Popover
          content=
          {`go to ${domain}?`}
        >
          <a href={domain}>
            {" "}
            {domain} <LinkOutlined />
          </a>
        </Popover>
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <DomainStatusTag status={status} />,
  },
  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    render: (value) => <Switch checked={value} disabled />,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => {
      const items = [
        {
          key: "edit",
          label: "Edit",
          onClick: () => onEdit(record),
        },
        {
          key: "delete",
          label: "Delete",
          danger: true,
          onClick: () => onDelete(record.id),
        },
      ];

      return <RowActionsDropdown items={items} disabled={record.isDeleting} />;
    },
  },
];
