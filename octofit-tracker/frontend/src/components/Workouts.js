import ResourcePage from './ResourcePage';

function Workouts() {
  const endpoint = '-8000.app.github.dev/api/workouts';

  return (
    <ResourcePage
      endpoint={endpoint}
      resource="workouts"
      title="Workouts"
      intro="Browse workout records with a polished Bootstrap table and open each workout in a modal for the raw payload."
    />
  );
}

export default Workouts;