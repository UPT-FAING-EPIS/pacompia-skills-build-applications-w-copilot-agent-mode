import ResourcePage from './ResourcePage';

function Teams() {
  const endpoint = '-8000.app.github.dev/api/teams';

  return (
    <ResourcePage
      endpoint={endpoint}
      resource="teams"
      title="Teams"
      intro="Review team data returned by the backend and open any row in a Bootstrap modal for the full payload."
    />
  );
}

export default Teams;