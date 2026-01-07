import { Table } from "antd";
import { getDomainColumns } from "../utils/domainColumns.jsx";

function DomainTable({ data, loading, onEdit, onDelete, deletingId }) {
  const columns = getDomainColumns({ onEdit, onDelete });
  const mappedData = data.map((item) => ({
    ...item,
    isDeleting: item.id === deletingId,
  }));

  return (
    <div className="bg-white rounded-lg p-4 overflow-x-auto">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={mappedData}
        loading={loading}
        pagination={{ pageSize: 8 }}
        scroll={{ x: 800 }}
        rowClassName={(record) =>
          record.isDeleting ? "opacity-50 pointer-events-none" : ""
        }
      />
    </div>
  );
}

export default DomainTable;
