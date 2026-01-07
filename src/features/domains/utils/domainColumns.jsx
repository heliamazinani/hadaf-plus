import { Tag, Switch,Badge ,Space, Button } from "antd";
import DomainStatusTag from "../components/DomainStatusTag";
import  RowActionsDropdown  from "../../../components/RowActionsDropdown";
export const getDomainColumns = ({ onEdit, onDelete }) => [
  {
    title: "",
    dataIndex: "isActive",
    key: "isActive",
    render: (value) => <Badge status={value? "success": "error"} disabled />,
  },
  {
    title: "Domain",
    dataIndex: "domain",
    key: "domain",
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
