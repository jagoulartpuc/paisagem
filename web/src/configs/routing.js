import React from "react";
import { Switch, Route } from "react-router-dom";

// Wrapper para as páginas
import ViewWrapper from "../helpers/ViewWrapper";

// Users
const UserEditPage = ViewWrapper("UserPages/CreateUpdate/UserEditPage");
const UserDetailsPage = ViewWrapper("UserPages/Details/UserDetailsPage");
const UserListPage = ViewWrapper("UserPages/List/UserListPage");


// Views
// Implementado um Wrapper que substitui o import normal para adicionar loader e outras funcionalidades.
// Ver o arquivo src/helpers/ViewWrapper.js
const Page = ViewWrapper("Page/Page");
const HomePage = ViewWrapper("HomePage/HomePage");
const LoginPage = ViewWrapper("LoginPage/LoginPage");
const BlankPage = ViewWrapper("BlankPage/BlankPage");
const DetalheEspecie = ViewWrapper("DetalheEspecie/DetalheEspecie");
const CadastroEspecie = ViewWrapper("CadastroEspecie/CadastroEspecie");
const ListagemEspecie = ViewWrapper("ListagemEspecie/ListagemEspecie");
const ListagemFamilia = ViewWrapper("ListagemFamilia/ListagemFamilia");
const CadastroFamilia = ViewWrapper("CadastroFamilia/CadastroFamilia");
const CadastroIndividuo = ViewWrapper("CadastroIndividuo/CadastroIndividuo");




const FaleConosco = ViewWrapper("FaleConosco/FaleConosco");

export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/protected" component={Page} />

      {/* User Container */}
      <Route path="/users/list" component={UserListPage} />
      <Route path="/users/edit" component={UserEditPage} />
      <Route path="/users/edit/:id" component={UserEditPage} />
      <Route path="/users/details/:id" component={UserDetailsPage} />
      {/* End of User Container */}

      {/* Especie Container */}
      <Route path="/especies/listas" component={ListagemEspecie} />
      <Route path="/especies/cadastro" component={CadastroEspecie} />
      <Route path="/especies/detalhe/:id" component={DetalheEspecie} />
      {/* End of Especie Container */}

      {/* Familia Container */}
      <Route path="/familia/cadastro" component={CadastroFamilia} />
      <Route path="/familia/listas" component={ListagemFamilia} />
      {/* End of Familia Container */}

      {/* Individuo Container */}
      <Route path="/individuos/cadastro" component={CadastroIndividuo} />
      {/* End of Individuo Container */}

      {/* FaleConosco Container */}
      <Route path="/faleconosco" component={FaleConosco} />
      {/* End of FaleConosco Container */}

      {/* 404 - Page not Found */}
      <Route component={BlankPage} />
    </Switch>
  </main>
);
