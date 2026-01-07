import { useState, useMemo } from "react";
import { Button, Input, Alert, Spin, Select } from "antd";
import { PlusOutlined  } from "@ant-design/icons";
import { useGetDomainsQuery } from "../api/domainApi";
import DomainTable from "../components/DomainTable";
import DomainDrawer from "../components/DomainDrawer";
import { useDomainActions } from "../hooks/useDomainActions";

function DomainsPage() {
  const { data = [], isLoading, isFetching, isError } = useGetDomainsQuery();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [active, setActive] = useState("all");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);

  const filteredDomains = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.domain
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "all" || item.status === status;
      const matchesActive = active === "all" || item.isActive === active;

      return matchesSearch && matchesStatus && matchesActive;
    });
  }, [data, search, status, active]);
  const handleActionComplete = (success) => {
    if (success) {
      //   refetch();
      setEditingDomain(null);
      setDrawerOpen(false);
    }
  };

  const openCreate = () => {
    setEditingDomain(null);
    setDrawerOpen(true);
  };

  const openEdit = (domain) => {
    setEditingDomain(domain);
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const { handleSubmit, handleDelete, loading, deletingId } = useDomainActions({
    editingDomain,
    onActionComplete: handleActionComplete,
  });

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-800">
          Domains
        </h1>

        <Button type="primary" onClick={openCreate}>
          Add Domain <PlusOutlined />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-medium text-gray-600">Search</label>
          <Input
            placeholder="Search domain URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
            allowClear
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <Select
            value={status}
            onChange={setStatus}
            className="w-full "
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="verified">Verified</Select.Option>
            <Select.Option value="rejected">Rejected</Select.Option>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Active</label>
          <Select value={active} onChange={setActive} className="w-full">
            <Select.Option value="all">All</Select.Option>
            <Select.Option value={true}>Active</Select.Option>
            <Select.Option value={false}>Inactive</Select.Option>
          </Select>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}

      {isError && (
        <Alert type="error" message="Failed to load domains" showIcon />
      )}

      {!isLoading && !isError && (
        <DomainTable
          data={filteredDomains}
          onEdit={openEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
          loading={isFetching}
        />
      )}

      <DomainDrawer
        open={drawerOpen}
        onClose={() => {
          if (!loading) {
            setEditingDomain(null);
            setDrawerOpen(false);
          }
        }}
        initialValues={editingDomain}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default DomainsPage;
