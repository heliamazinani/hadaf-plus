import { useState, useEffect } from "react";
import {
  useGetDomainsQuery,
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} from "./features/domains/domainApi";

const emptyForm = {
  domain: "",
  status: "pending",
  isActive: true,
};

function App() {
  const { data = [], isLoading, error } = useGetDomainsQuery();
  const [createDomain] = useCreateDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();
  const [deleteDomain] = useDeleteDomainMutation();

  const [formData, setFormData] = useState(emptyForm);
  const [editingDomain, setEditingDomain] = useState(null);

  useEffect(() => {
    if (editingDomain) {
      setFormData({
        domain: editingDomain.domain,
        status: editingDomain.status,
        isActive: editingDomain.isActive,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingDomain]);

  const handleSubmit = async () => {
    if (!formData.domain.trim()) {
      alert("Domain is required");
      return;
    }

    try {
      if (editingDomain) {
        await updateDomain({
          id: editingDomain.id,
          ...formData,
        }).unwrap();
      } else {
        await createDomain({
          ...formData,
          createdDate: Math.floor(Date.now() / 1000),
        }).unwrap();
      }

      setEditingDomain(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this domain?")) return;
    await deleteDomain(id).unwrap();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading domains</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Domains</h1>
      <div style={{ marginBottom: 20 }}>
        <h3>{editingDomain ? "Edit Domain" : "Create Domain"}</h3>

        <input
          placeholder="domain.com"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
        />

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="pending">pending</option>
          <option value="verified">verified</option>
          <option value="rejected">rejected</option>
        </select>

        <label style={{ marginLeft: 10 }}>
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
          />
          Active
        </label>

        <div>
          <button onClick={handleSubmit}>
            {editingDomain ? "Update" : "Create"}
          </button>

          {editingDomain && (
            <button onClick={() => setEditingDomain(null)}>Cancel</button>
          )}
        </div>
      </div>
      {data.map((domain) => (
        <div
          key={domain.id}
          style={{
            display: "flex",
            gap: 10,
            borderBottom: "1px solid #ccc",
            padding: 5,
          }}
        >
          <span>{domain.domain}</span>
          <span>{domain.status}</span>
          <span>{domain.isActive ? "active" : "not active"}</span>
          <button onClick={() => setEditingDomain(domain)}>Edit</button>
          <button onClick={() => handleDelete(domain.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
