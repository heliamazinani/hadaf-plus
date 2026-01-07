import { Drawer } from "antd";
import DomainForm from "./DomainForm";

function DomainDrawer({ open, onClose, initialValues, onSubmit, loading }) {
  return (
    <Drawer
      title={initialValues ? "Edit Domain" : "Create Domain"}
      size={400}
      open={open}
      onClose={loading ? undefined : onClose}
      maskClosable={!loading}
      keyboard={!loading}
      closable={!loading}
    >
      <DomainForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Drawer>
  );
}

export default DomainDrawer;
