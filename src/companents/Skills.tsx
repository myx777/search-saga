import { changeSearchField } from "../reducer/filterSlice";
import { ItemType } from "../types/skillsTypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Skills = () => {
  const { items, loading, error, search } = useAppSelector(
    (state) => state.filter
  );
  const dispatсh = useAppDispatch();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatсh(changeSearchField(value));
  };

  const hasQuery = search.trim() !== "";
  
  return (
    <main>
      <div>
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search for skills"
        />
      </div>
      {!hasQuery && <div>Type something to search</div>}
      {hasQuery && loading && <div>Loading...</div>}
      {error ? (
        <div>Error occurred</div>
      ) : (
        <ul>
          {items.map((o: ItemType) => (
            <li key={o.id}>{o.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Skills;
