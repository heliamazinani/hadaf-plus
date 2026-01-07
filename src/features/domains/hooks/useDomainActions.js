import { useState } from "react";
import { message } from "antd";
import {
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} from "../api/domainApi";

export function useDomainActions({ editingDomain, closeDrawer }) {
  const [createDomain, { isLoading: creating }] = useCreateDomainMutation();
  const [updateDomain, { isLoading: updating }] = useUpdateDomainMutation();
  const [deleteDomain] = useDeleteDomainMutation();
  const [deletingId, setDeletingId] = useState(null);
  const handleSubmit = async (values) => {
    try {
      if (editingDomain) {
        await updateDomain({
          id: editingDomain.id,
          ...values,
        }).unwrap();
        message.success("Domain updated");
      } else {
        await createDomain({
          ...values,
          createdDate: Math.floor(Date.now() / 1000),
        }).unwrap();
        message.success("Domain created");
      }
      closeDrawer();
    } catch {
      message.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this domain?")) return;
    setDeletingId(id);

    try {
      await deleteDomain(id).unwrap();
      message.success("Domain deleted");
    } catch {
      message.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    handleSubmit,
    loading: creating || updating,
    handleDelete,
    deletingId,
  };
}
