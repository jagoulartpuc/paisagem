import React from "react";
import Page from "views/Page/Page";

class UserDetailsPage extends Page {
  componentDidMount = () => {
    this.setState(() => {
      return {
        render: this.isAuthenticated()
          ? this.authenticated()
          : this.unauthenticated()
      };
    });
  };

  authenticated = () => {
    return <div>Dados do usuário...</div>;
  };

  unauthenticated = () => {
    return (
      <div className="container">
        <p>Você precisa estar logado para visualizar um usuário!</p>
      </div>
    );
  };
}

export default UserDetailsPage;
