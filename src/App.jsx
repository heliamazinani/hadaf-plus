import { useGetDomainsQuery } from "./features/domains/domainApi";
function App() {
  const { data, error, isLoading } = useGetDomainsQuery();
  if (isLoading) return <p> loadinggggggg</p>;
  if (error) return <p>eshtebahe</p>;
  console.log(data);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <div>
        {data?.map((domain) => (
          <p key={domain.id}>{domain.domain}</p>
        ))}
      </div>
    </>
  );
}

export default App;
