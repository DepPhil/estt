import React, { Component } from "react";
import logo from "./logo.svg";
import $ from "jquery";
import "./App.css";
import NavBar from "./Componenets/nav-bar";
import SideBar from "./Componenets/Side-Bar";
import NavLink from "./Componenets/nav-link";
import ContentPage from "./Componenets/contentPage";
import logic from "./model/logic";
import SidebarList from "./model/renderHtml";
import PersonSidebar from "./Componenets/PersonSidebar";
import NewTable from "./Componenets/NewTable";
import PopModal from "./Componenets/PopModal";
import EditPop from "./Componenets/EditPop";
import PostingModal from "./Componenets/PostingModal";
import PersonModal from "./Componenets/PersonModal";
import PromotionModal from "./Componenets/PromotionModal";
import EditPerson from "./Componenets/EditPerson";
import DocumentModal from "./Componenets/DocumentModal";
import "bootstrap/js/dist/modal";
import { Person, Pop, HopEntry, Hop } from "./model/clientModel";
import MainHtml from "./MainHtml.jsx";
const data = require("./model/clientRequest");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [Pop.Pop]: [],
      [Person.Person]: [],
      SidebarList: [],
      sideBar: <div />,
      SidebarKey: "",
      ContentPage: <div />,
      Modal: {
        title: "",
        action: "",
        form: <div />
      },
      Document: [],
      Posting: [],
      Promotion: [],

      InputValidationMsg: "",
      Role: [], //ADMIN, HOP, MIN
      UserId: "",
      LogInMsg: "",
      ContentPageDisplay: "", //PersonList, EditPerson, PlaceList, DocumentList, EditPop
      ContentPageTitle: "", //Person, Place of Posting
      ModalDisplay: "", //AddPerson, AddPlace, AddDocument, AddPosting, AddPromotion
      SidebarDisplay: "", //Database, Document, PersonSidebar
      SidebarClickItem: {},
      PersonId: "",
      PostingId: "",
      PromotionId: "",
      PopId: "",
      BackButtonText: "",

      currentDisplay: { name: "", data: [], posts: [], [Pop.Pop]: [] },
      contentPage: { title: "", personnel: [], posts: [], pops: [] },
      navBar: []
    };
    this.navBarClick = this.navBarClick.bind(this);
  }
  func = {
    Sidebar: () => {
      switch (this.state.SidebarDisplay) {
        case "Database":
          return (
            <SidebarList
              data={this.state.SidebarList.filter(
                item => item.Parent === "Database"
              )}
              {...this.func}
            />
          );

        case "Documents":
          return (
            <SidebarList
              data={this.state.SidebarList.filter(
                item => item.Parent === "Documents"
              )}
              {...this.func}
            />
          );
        default:
          break;
      }
    },
    ContentPage: () => {
      switch (this.state.ContentPageDisplay) {
        case "PersonList":
          return (
            <NewTable
              data={logic.setPerson(this.state.Person)}
              {...this.func}
            />
          );
        case "PlaceList":
          return (
            <NewTable data={Pop.setData(this.state[Pop.Pop])} {...this.func} />
          );

        case "DocumentList":
          const data = this.state.Document.filter(i => {
            return this.state.SidebarClickItem._id == i.Parent._id;
          });
          const modData = data.map(i => {
            return { Name: i.Name, _id: i._id };
          });
          return <NewTable data={modData} {...this.func} />;

        case "EditPerson":
          return <EditPerson {...this.state} {...this.func} />;
        case "EditPop":
          return <EditPop {...this.state} {...this.func} />;
        default:
          break;
      }
      return <div />;
    },
    ModalTitle: () => {
      switch (this.state.ModalDisplay) {
        case "AddPerson":
          return "Add Person";
        case "AddPlace":
          return "Add Place of Posting";
        case "AddDocument":
          return "Upload Document";
        case "PostingModal":
          return "Add History of Posting";
        case "PromotionModal":
          return "Add History of Promotion";
        default:
          break;
      }
    },
    ModalAction: () => {
      if (this.state.ModalDisplay === "AddDocument")
        return "http://192.168.1.22:9000/UploadDocument";
      return "#";
    },
    ModalForm: () => {
      switch (this.state.ModalDisplay) {
        case "AddPerson":
          return <PersonModal {...this.state} {...this.func} />;
        case "PopModal":
          return <PopModal {...this.state} {...this.func} />;
        case "AddDocument":
          return (
            <DocumentModal data={this.state.SidebarClickItem} {...this.func} />
          );
        case "PostingModal":
          return <PostingModal {...this.state} {...this.func} />;
        case "PromotionModal":
          return <PromotionModal {...this.state} {...this.func} />;
        default:
          break;
      }
    },
    navBarClick: (str, e) => {
      console.log("Something Clicked in navBar");
      let SidebarDisplay;
      switch (str) {
        case "Database":
          SidebarDisplay = str;
          break;
        case "Documents":
          SidebarDisplay = str;
          break;
        default:
          break;
      }
      const BackButtonText = "<<Back";
      this.setState({ SidebarDisplay, BackButtonText });
    },
    sidebarClick: (item, e) => {
      let ContentPageDisplay, ContentPageTitle, SidebarClickItem, ModalDisplay;
      if (item.Parent === "Database") {
        switch (item.Name) {
          case "Place of Posting":
            ContentPageDisplay = "PlaceList";
            ContentPageTitle = "Place of Posting";
            SidebarClickItem = item;
            ModalDisplay = "PopModal";
            break;

          case "Person":
            ContentPageDisplay = "PersonList";
            ContentPageTitle = "Person";
            SidebarClickItem = item;
            ModalDisplay = "AddPerson";
            break;

          default:
            break;
        }
      }
      if (item.Parent === "Documents") {
        ContentPageDisplay = "DocumentList";
        ContentPageTitle = item.Name;
        SidebarClickItem = item;
        ModalDisplay = "AddDocument";
      }
      this.setState({
        ContentPageDisplay,
        ContentPageTitle,
        SidebarClickItem,
        ModalDisplay
      });
    },
    GoBack: () => {
      let ContentPageDisplay, ContentPageTitle, ModalDisplay, SidebarDisplay;
      switch (this.state.ContentPageDisplay) {
        case "EditPerson":
          ContentPageDisplay = "PersonList";
          ContentPageTitle = "Person";
          ModalDisplay = "AddPerson";
          SidebarDisplay = "Database";
          break;
        default:
          return;
      }
      this.setState({
        ContentPageDisplay,
        ContentPageTitle,
        ModalDisplay,
        SidebarDisplay
      });
    },
    ChangeModal: () => {
      return;
    },
    validateDate: () => {
      let form = $("#modalForm");
      const req = form.serializeArray();
      console.log("Form data is: ", req);
      let result = true;
      req.forEach(item => {
        if (item.name.search("Date") != -1) {
          if (item.value != "") {
            result = logic.validateDate(item.value);
            if (!result) alert(`${item.name} is not valid Date`);
            else item.value = result;
          }
        }
      });
      if (!result) return false;
      return req;
    },
    submitForm: (key, e) => {
      let result;
      switch (this.state.ModalDisplay) {
        case "AddDocument":
          if (!logic.validateUser("ADMIN", this.state.Role)) {
            document.getElementById("closeModal").click();
            alert("Not Authorised! Please Login.");
            return;
          }
          $("#modalForm").submit();
          return;

        case "AddPerson":
          if (!logic.validateUser("MIN", this.state.Role)) {
            document.getElementById("closeModal").click();
            alert("Not Authorised! Please Login.");
            return;
          }
          result = this.func.validateDate();
          if (!result) return;
          data.addPerson(result, res => {
            const Person = res;
            this.setState({ Person });
          });
          break;

        case "PopModal":
          if (!logic.validateUser("MIN", this.state.Role)) {
            document.getElementById("closeModal").click();
            alert("Not Authorised! Please Login.");
            return;
          }
          result = this.func.validateDate();
          if (!result) return;
          data.addPop(result, res => {
            const Pop = res;
            this.setState({ Pop });
          });
          break;
        case "PostingModal":
          if (!logic.validateUser("HOP", this.state.Role)) {
            document.getElementById("closeModal").click();
            alert("Not Authorised! Please Login.");
            return;
          }
          result = this.func.validateDate();
          if (!result) return;
          data.updatePosting(result, res => {
            const Posting = res.Posting;
            const Person = res.Person;
            this.setState({ Posting, Person });
          });
          break;

        case "PromotionModal":
          if (!logic.validateUser("HOP", this.state.Role)) {
            document.getElementById("closeModal").click();
            alert("Not Authorised! Please Login.");
            return;
          }
          result = this.func.validateDate();
          if (!result) return;
          data.updatePromotion(result, res => {
            const Promotion = res.Promotion;
            const Person = res.Person;
            this.setState({ Promotion, Person });
          });
          break;

        default:
          return;
      }
      document.getElementById("closeModal").click();
    },
    editPopFormSubmit: () => {
      if (!logic.validateUser("MIN", this.state.Role)) {
        document.getElementById("closeModal").click();
        alert("Not Authorised! Please Login.");
        return;
      }
      const req = $("#editPopForm").serializeArray();
      console.log("Edit Pop form data is: ", req);
      data.addPop(req, res => {
        const Pop = res;
        const ContentPageDisplay = "PlaceList";
        this.setState({ Pop, ContentPageDisplay });
      });
    },
    showRow: (title, _id, e) => {
      switch (this.state.ContentPageDisplay) {
        case "Person":
          break;
        case "DocumentList":
          const elt = this.state.Document.find(i => i._id === _id);
          if (elt == null) return;
          const path = elt.Path;
          window.open(`http://192.168.1.22:9000/getDocument?Path=${path}`);
          break;
        default:
          console.log("th display is: ", this.state.ContentPageDisplay);
      }
    },
    editRow: (title, _id, e) => {
      console.log("Editing rows");
      //document.getElementById("showMyModal").click();
      let PersonId,
        PopId,
        ContentPageDisplay,
        ContentPageTitle,
        SidebarDisplay,
        ModalDisplay;
      switch (this.state.ContentPageDisplay) {
        case "PersonList":
          PersonId = _id;
          ContentPageDisplay = "EditPerson";
          ContentPageTitle = "Edit Person";
          SidebarDisplay = "";
          this.setState({
            PersonId,
            ContentPageDisplay,
            ContentPageTitle,
            SidebarDisplay
          });
          console.log("the Personid is: ", PersonId);
          break;
        case "PlaceList":
          PopId = _id;
          ModalDisplay = "PopModal";
          // ContentPageDisplay = "EditPop";
          // ContentPageTitle = "Edit Place of Posting";

          this.setState({
            PopId,
            ModalDisplay
          });
          document.getElementById("showMyModal").click();
          break;
        default:
          console.log("the title is: ", this.state.ContentPageDisplay);
          break;
      }
    },
    deleteRow: (title, id, e) => {
      switch (this.state.ContentPageDisplay) {
        case "PersonList":
          if (!logic.validateUser("ADMIN", this.state.Role)) {
            alert("Not authorised to delete! Please Login");
            return;
          }
          data.deletePerson(id, result => {
            const Person = result;
            this.setState({ Person });
          });

        case "PlaceList":
          if (!logic.validateUser("ADMIN", this.state.Role)) {
            alert("Not authorised to delete! Please Login");
            return;
          }
          data.deletePop(id, result => {
            const Pop = result;
            this.setState({ Pop });
          });
          break;
        default:
          console.log(
            "The contentPageDisplay is ",
            this.state.ContentPageDisplay
          );
          break;
      }
    },
    DeletePosting: (PersonId, PostingId, e) => {
      if (!logic.validateUser("HOP", this.state.Role)) {
        alert("Not authorised to delete! Please Login");
        return;
      }
      data.deletePosting(PostingId, PersonId, result => {
        const Posting = result.Posting;
        const Person = result.Person;
        this.setState({ Posting, Person });
        document.getElementById("closeModal").click();
      });
    },
    DeletePromotion: (PersonId, PromotionId, e) => {
      if (!logic.validateUser("HOP", this.state.Role)) {
        alert("Not authorised to delete! Please Login");
        return;
      }
      data.deletePromotion(PromotionId, PersonId, result => {
        const Promotion = result.Promotion;
        const Person = result.Person;
        this.setState({ Promotion, Person });
        document.getElementById("closeModal").click();
      });
    },
    PostingModal: (PersonId, PostingId, e) => {
      const ModalDisplay = "PostingModal";
      this.setState({ ModalDisplay, PostingId });
    },
    PromotionModal: (PersonId, PromotionId, e) => {
      const ModalDisplay = "PromotionModal";
      this.setState({ ModalDisplay, PromotionId });
    },
    auth: {
      logInBtnText: () => {
        return "Log In";
      },
      logInMsg: () => {
        return this.state.LogInMsg;
      },
      submitForm: () => {
        const req = $("#authForm").serializeArray();
        const res = data.logInUser(req, result => {
          if (!result) {
            const InputValidationMsg = "Incorrect UserId/Password";
            this.setState({ InputValidationMsg });
            return false;
          } else {
            const Role = result.Role;
            const UserId = result.UserId;
            const LogInMsg = "Welcome " + UserId;
            this.setState({ Role, UserId, LogInMsg });
            document.getElementById("authModalClose").click();
          }
        });
        console.log("login form is: ", req);
      },
      validationText: () => {
        return this.state.InputValidationMsg;
      }
    }
  }; // func
  documentClick = (action, _id, e) => {
    if (action === "show") {
      console.log("Showing document");
      const elt = this.state.Document.find(i => i._id === _id);
      console.log("the elt is: ", elt);
      if (elt == null) return;
      const path = elt.Path;
      console.log("the path is:", path);
      window.open(`http://192.168.1.22:9000/getDocument?Path=${path}`);
    }
  };
  navBarClick() {}
  componentDidMount = () => {
    data.setState(result => {
      console.log("Ready to set the state with data: ", result);
      this.setState({ ...result });
    });
  };
  componentDidUpdate = () => {
    console.log("The state is: ", this.state);
  };
  // sideBarOnChange = (str, e) => {
  //   console.log("side bar click: ", str);
  //   switch (str) {
  //     case Pop.Pop:
  //       //fetch posts
  //       data.fetchAllPops(result => {
  //         const contentPage = { title: Pop.Pop, [Pop.Pop]: result };
  //         this.setState({ contentPage });
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };
  // contentPage = {};

  // handleEdit = e => {
  //   e.preventDefault();
  //   const sideBar = ["Add Person", "Post", "Navigation Bar", Pop.Pop];
  //   this.setState({ sideBar });
  //   console.log("Edit clicked");
  // };

  // handleClick = (id, e) => {
  //   e.preventDefault();
  //   let currentDisplay = { name: id };
  //   if (currentDisplay.name === "Navigation Bar") {
  //     currentDisplay = { data: data.demo() };
  //   }
  //   this.setState({ currentDisplay });
  //   console.log("link clicked: i = ", id);
  // };

  // navBarClick = (item, e) => {
  //   e.preventDefault();
  //   if (item === "Posts") {
  //     data.fetchAllPosts(result => {
  //       this.contentPage.data = result;
  //       this.contentPage.title = item;
  //       this.setState({ contentPage: this.contentPage });
  //       console.log("currentDisplay is ", this.contentPage);
  //     });
  //   } else if (item === "Personnel") {
  //     console.info("personnel");
  //     // Fetch all the personnel.
  //     data.fetchAllPersonnel(result => {
  //       this.contentPage.personnel = result.personnel;
  //       this.contentPage.title = item;
  //       this.contentPage.posts = result.posts;
  //       this.contentPage.pops = result.placeOfPosting;
  //       this.setState({ contentPage: this.contentPage });
  //     });
  //   }
  // };
  // submitForm = () => {
  //   let form = $("#personnelForm");
  //   const req = form.serializeArray();
  //   let result = true;
  //   req.forEach(item => {
  //     let aName = logic.convertFields(item.name);
  //     console.log("a name is: ", aName);
  //     if (item.name === "date_of_birth" || item.name === "date_of_joining") {
  //       result = logic.validateDate(item.value);
  //       if (!result) alert(`${aName} is not valid Date`);
  //       else item.value = result;
  //     }
  //   });
  //   if (!result) return;

  //   console.log("form data is : ", req);
  //   data.addPersonnel(req, result => {
  //     this.contentPage.personnel = result.personnel;
  //     this.contentPage.title = "Personnel";
  //     this.contentPage.posts = result.posts;
  //     this.contentPage.pops = result.placeOfPosting;

  //     this.setState({ contentPage: this.contentPage }, () => {
  //       document.getElementById("closeModal").click();
  //     });
  //   });
  // };
  // deletePersonnel = (id, event) => {
  //   console.log("personnel will be deleted: ", id);
  //   data.deletePersonnel(id, result => {
  //     this.contentPage.personnel = result.personnel;
  //     console.log("setting state after delete with personnel  ", result);
  //     this.setState({ contentPage: this.contentPage });
  //   });
  // };
  render() {
    return (
      <MainHtml {...this.state} {...this.func} />
      // <div>
      //   <div className="container-fluid heading">
      //     <div className="heading1">Central Bureau of Narcotics</div>
      //     <div className="heading2">Establishment Section</div>
      //   </div>

      //   <NavBar onEdit={this.handleEdit} navBarClick={this.navBarClick} />
      //   <div className="container-fluid">
      //     <div className="row">
      //       <div className="col side-bar">
      //         <SideBar
      //           sideBar={this.state.sideBar}
      //           onChange={this.sideBarOnChange}
      //         />
      //       </div>
      //       <div className="col-10">
      //         <ContentPage
      //           deletePersonnel={this.deletePersonnel}
      //           {...this.state.contentPage}
      //           submitForm={this.submitForm}
      //         />
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default App;
