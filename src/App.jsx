import { useState } from "react";
import {
  useGetDomainsQuery,
  useCreateDomainMutation,
} from "./features/domains/domainApi";
function App() {
const [newDomain, setNewDomain] = useState({
  domain: "",
  status: "pending",
  isActive: true,
});
  const { data, error, isLoading } = useGetDomainsQuery();
  const [createpost, { isLoading: isCreating, error: createError }] =
    useCreateDomainMutation();
  if (isLoading) return <p> loadinggggggg</p>;
  if (createError) return <p>there was an error creating domain</p>;
  if (error) return <p>eshtebahe</p>;
const handleCreateDomain = async () => {
  const payload = {
    ...newDomain,
    createdDate: Math.floor(Date.now() / 1000),
  };

  try {
    await createpost(payload).unwrap();
    console.log("Domain created successfully");
    setNewDomain({
      domain: "",
      status: "pending",
      isActive: true,
    });
  } catch (err) {
    console.error("Create failed", err);
  }
};

  console.log(data);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <input
          type="text"
          placeholder="domain..."
          onChange={(e) =>
            setNewDomain((prev) => ({ ...prev, domain: e.target.value }))
          }
        />
        <button onClick={handleCreateDomain} disabled={isCreating}>
          {isCreating ? "Creating..." : "Create domain"}
        </button>
      </div>

      <div>
        {data?.map((domain) => (
          <p key={domain.id}>{domain.domain}</p>
        ))}
      </div>
    </>
  );
}

export default App;
