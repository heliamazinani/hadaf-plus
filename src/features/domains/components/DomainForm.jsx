import { Form, Input, Select, Switch, Button } from "antd";

function DomainForm({ initialValues, onSubmit, loading }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues ?? { status: "pending", isActive: true }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Domain"
        name="domain"
        rules={[
          { required: true, message: "Domain is required" },
          { type: "url", message: "Enter a valid URL" },
        ]}
      >
        <Input placeholder="https://example.com" />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="verified">Verified</Select.Option>
          <Select.Option value="rejected">Rejected</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Active" name="isActive" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={loading}>
        Save
      </Button>
    </Form>
  );
}

export default DomainForm;
