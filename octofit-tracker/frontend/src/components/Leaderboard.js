import ResourcePage from './ResourcePage';

function Leaderboard() {
  const endpoint = '-8000.app.github.dev/api/leaderboard';

  return (
    <ResourcePage
      endpoint={endpoint}
      resource="leaderboard"
      title="Leaderboard"
      intro="Compare competition results from the REST API using a single, consistent Bootstrap table layout."
    />
  );
}

export default Leaderboard;