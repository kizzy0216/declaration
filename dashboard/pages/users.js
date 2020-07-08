import UserTableContainer from '~/containers/UserTableContainer';

function UsersPage() {
  return (
    <div className="users-page">
      <UserTableContainer />

      <style jsx>{`
        .users-page {
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
        }

        .row {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

export default UsersPage;
