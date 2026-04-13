import ResourcePage from './ResourcePage';

function Users() {
  const endpoint = '-8000.app.github.dev/api/users';

  return (
    <ResourcePage
      endpoint={endpoint}
      resource="users"
      title="Users"
      intro="Inspect user records from the REST API with a shared Bootstrap table, search form, and modal layout."
    />
  );
}

export default Users;