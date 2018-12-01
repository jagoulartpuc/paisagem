import React from "react";
import Page from "views/Page/Page";
import UserForm from "components/UserForm/UserForm";

class UserEditPage extends Page {


  authenticated = () => {
    return (
      <div>
        <UserForm />
      </div>
    );
  };

  unauthenticated = () => {
    return (
      <div className="container">
        <UserForm></UserForm>
      </div>
    );
  };
}

export default UserEditPage;
