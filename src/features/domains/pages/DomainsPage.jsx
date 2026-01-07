import { useState, useMemo } from "react";
import { Button, Input, Alert, Spin, Select } from "antd";
import { useGetDomainsQuery } from "../api/domainApi";
import DomainTable from "../components/DomainTable";
import DomainDrawer from "../components/DomainDrawer";
import { useDomainActions } from "../hooks/useDomainActions";

function DomainsPage() {
  const { data = [], isLoading, isFetching, isError , refetch } = useGetDomainsQuery();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);

  const filteredDomains = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.domain
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "all" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);
  const handleActionComplete = (success) => {
    if (success) {
      refetch();
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
        <h1 className="text-xl md:text-2xl font-semibold">Domains</h1>

        <Button type="primary" onClick={openCreate}>
          Add Domain
        </Button>
      </div>

      <Input
        placeholder="Search domain..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />

      <Select value={status} onChange={setStatus} className="w-full md:w-48">
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="verified">Verified</Select.Option>
        <Select.Option value="rejected">Rejected</Select.Option>
      </Select>

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
