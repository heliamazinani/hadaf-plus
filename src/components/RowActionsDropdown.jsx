import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

function RowActionsDropdown({ items, disabled }) {
  return (
    <Dropdown menu={{ items }} trigger={["click"]} disabled={disabled}>
      <Button type="text" icon={<MoreOutlined />} disabled={disabled} />
    </Dropdown>
  );
}

export default RowActionsDropdown;
