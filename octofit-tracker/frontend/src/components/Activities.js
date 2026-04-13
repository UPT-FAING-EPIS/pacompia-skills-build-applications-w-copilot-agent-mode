import ResourcePage from './ResourcePage';

function Activities() {
  const endpoint = '-8000.app.github.dev/api/activities';

  return (
    <ResourcePage
      endpoint={endpoint}
      resource="activities"
      title="Activities"
      intro="Track workout activity data from the Django REST endpoint and inspect each record in a Bootstrap modal."
    />
  );
}

export default Activities;