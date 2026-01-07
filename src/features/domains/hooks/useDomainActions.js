import { useState } from "react";
import { message } from "antd";
import {
  useCreateDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} from "../api/domainApi";

export function useDomainActions({ editingDomain, onActionComplete }) {
  const [createDomain, { isLoading: creating }] = useCreateDomainMutation();
  const [updateDomain, { isLoading: updating }] = useUpdateDomainMutation();
  const [deleteDomain] = useDeleteDomainMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleSubmit = async (values) => {
    let success = false;
    try {
      if (editingDomain) {
        await updateDomain({ id: editingDomain.id, ...values }).unwrap();
        message.success("Domain updated");
      } else {
        await createDomain({
          ...values,
          createdDate: Math.floor(Date.now() / 1000),
        }).unwrap();
        message.success("Domain created");
      }
      success = true;
    } catch (err) {
      message.error("Operation failed");
    } finally {
      onActionComplete(success);
    }
  };
const handleDelete = async (id) => {
  if (!confirm("Delete this domain?")) return;

  setDeletingId(id);
  let success = false;

  try {
    await deleteDomain(id).unwrap();
    message.success("Domain deleted");
    success = true;
  } catch (err) {
    message.error("Delete failed");
  } finally {
    onActionComplete(success);
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
