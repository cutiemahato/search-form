const UserList = ({ users,deleteUser }) => {
  

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (  
          <tr key={user.id}>
            <td>{user.id}</td>  
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => deleteUser(user.id)}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 2.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-1.27l-.67 9.39a1.5 1.5 0 0 1-1.49 1.61h-5a1.5 1.5 0 0 1-1.49-1.36L2.77 3H1.5a.5.5 0 0 1-.5-.5zm1 1a1.5 1.5 0 0 1 1.36-1.48L3.7 3h8.6l.84 11.02a1.5 1.5 0 0 1-1.49 1.36h-5a1.5 1.5 0 0 1-1.49-1.61L2.5 3.5z" />
                </svg>
              </button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;


