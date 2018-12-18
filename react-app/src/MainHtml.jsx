import React, { Component } from "react";

function MainHtml(props) {
  return (
    <div>
      <div className="container-fluid heading">
        <div className="heading1">Central Bureau of Narcotics</div>
        <div className="heading2">Establishment Section</div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://192.168.1.22:9000">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-link nav-link"
                onClick={e => props.navBarClick("Documents", e)}
              >
                Documents
              </button>
            </li>
            <li className="nav-item">
              <button
                id="navBarDatabase"
                type="button"
                className="btn btn-link nav-link"
                onClick={e => props.navBarClick("Database", e)}
              >
                Database
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link" href="#">
                Edit
              </button>
            </li>
          </ul>
          <div className="d-flex flex-row-reverse">
            <button
              className="btn btn-primary nav-item"
              data-toggle="modal"
              data-target="#authModal"
            >
              <span>{props.auth.logInBtnText()}</span>
            </button>
            <span className="navbar-text mx-2">{props.auth.logInMsg()}</span>
          </div>
        </div>
      </nav>

      {/* The side Bar  */}

      <div className="container-fluid">
        <div className="row">
          <div className="col side-bar">
            <div id="sideBar">
              <nav className="nav flex-column">{props.Sidebar()} </nav>
            </div>
          </div>

          {/* //</div><!-- The Content Page --> */}

          <div className="col-10">
            <div id="contentPage">
              <div className="d-flex flex-row">
                <h2>{props.ContentPageTitle}</h2>
                <button className="btn btn-link" onClick={props.GoBack}>
                  {props.BackButtonText}
                </button>
              </div>
              {props.ContentPage()}{" "}
            </div>

            {/* The Modal Page */}
            <div
              className="modal fade"
              id="myModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content" id="modalPage">
                  <div className="modal-header">
                    <h5 className="modal-title" id="myModalLabel">
                      {props.ModalTitle()}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {props.ModalForm()}
                </div>
              </div>
            </div>
            {/* Auth Modal */}
            <div
              className="modal fade"
              id="authModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">
                      Log In
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form id="authForm">
                      <div className="form-group row">
                        <label
                          htmlFor="personnel-userId"
                          className="col-form-label col-sm-2"
                        >
                          User Id
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="personnel-userId"
                            name="UserId"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="personnel-password"
                          className="col-form-label col-sm-2"
                        >
                          Password
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="password"
                            className="form-control"
                            id="personnel-password"
                            name="Password"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <p className="text-danger">{props.auth.validationText()}</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      id="authModalClose"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={props.auth.submitForm}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHtml;
