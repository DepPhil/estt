import React, { Component } from "react";
import logic from "../model/logic";

class EditPerson extends Component {
  constructor(props) {
    super(props);
    this.Person = props.Person.find(i => i._id == this.props.PersonId);
  }
  state = {};
  PersonName = () =>
    this.props.Person.find(i => i._id == this.props.PersonId).Name;
  DateOfBirth = () =>
    this.props.Person.find(
      i => i._id == this.props.PersonId
    ).Date_of_Birth.substr(0, 10);
  Gender = () => this.props.Person.find(i => i._id == this.props.PersonId).Sex;
  Post = () => this.props.Person.find(i => i._id == this.props.PersonId).Post;
  Posting = () =>
    this.props.Person.find(i => i._id == this.props.PersonId).Posting;
  Category = () =>
    this.props.Person.find(i => i._id == this.props.PersonId).Category;
  Category_Selected = () =>
    this.props.Person.find(i => i._id == this.props.PersonId).Category_Selected;
  Category_Special = () =>
    this.props.Person.find(i => i._id == this.props.PersonId).Category_Special;
  historyOfPosting = () => {
    const posting1 = this.props.Posting.filter(item => {
      return item.PersonId === this.props.PersonId;
    });
    //if (posting == "undefined") return;
    console.log("Posting is: ", posting1);
    let rowNumber = 1;
    return posting1.map(posting => {
      return (
        <tr key={posting._id + "tr"}>
          <th scope="row" key={posting._id + "th"}>
            {rowNumber++}
          </th>
          <td key={posting._id + "por"}>{posting.Place_of_Joining.Name}</td>
          <td key={posting._id + "dor"}>
            {posting.Date_of_Joining.substr(0, 10)}
          </td>
          <td key={posting._id + "poj"}>{posting.Place_of_Relieving.Name}</td>
          <td key={posting._id + "doj"}>
            {posting.Date_of_Relieving.substr(0, 10)}
          </td>
          <td key={posting._id + "dur"}>
            {logic.duration(posting.Date_of_Joining, posting.Date_of_Relieving)}
          </td>
          <td key={posting._id + "edit"}>
            <button
              className="btn btn-link"
              data-toggle="modal"
              data-target={`#myModal`}
              onClick={e =>
                this.props.PostingModal(this.props.PersonId, posting._id, e)
              }
            >
              <i className="fas fa-edit" />
            </button>
            <button
              className="btn btn-link"
              onClick={e =>
                this.props.DeletePosting(this.props.PersonId, posting._id, e)
              }
            >
              <i className="fas fa-trash-alt" />
            </button>
          </td>
        </tr>
      );
    });
  };
  historyOfPromotion = () => {
    const promotion = this.props.Promotion.filter(item => {
      return item.PersonId === this.props.PersonId;
    });
    //if (posting == "undefined") return;
    console.log("Promotion is: ", promotion);
    let rowNumber = 1;
    return promotion.map(posting => {
      return (
        <tr key={posting._id + "tr"}>
          <th scope="row" key={posting._id + "th"}>
            {rowNumber++}
          </th>
          <td key={posting._id + "por"}>{posting.Promotion_From.Name}</td>
          <td key={posting._id + "poj"}>{posting.Promotion_To.Name}</td>
          <td key={posting._id + "dor"}>
            {posting.Date_of_Promotion.substr(0, 10)}
          </td>
          <td key={posting._id + "doj"}>
            {posting.Date_of_Joining.substr(0, 10)}
          </td>
          <td key={posting._id + "cat1"}>{posting.Category.Name}</td>
          <td key={posting._id + "cat2"}>{posting.Category_Selected.Name}</td>
          <td key={posting._id + "cat3"}>{posting.Category_Special.Name}</td>
          <td key={posting._id + "edit"}>
            <button
              className="btn btn-link"
              data-toggle="modal"
              data-target={`#myModal`}
              onClick={e =>
                this.props.PromotionModal(this.props.PersonId, posting._id, e)
              }
            >
              <i className="fas fa-edit" />
            </button>
            <button
              className="btn btn-link"
              onClick={e =>
                this.props.DeletePromotion(this.props.PersonId, posting._id, e)
              }
            >
              <i className="fas fa-trash-alt" />
            </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <dl className="row">
          <dt className="col-sm-3">Full Name</dt>
          <dd className="col-sm-9">{this.PersonName()}</dd>

          <dt className="col-sm-3">Date of Birth</dt>
          <dd className="col-sm-9">{this.DateOfBirth()}</dd>

          <dt className="col-sm-3">Gender</dt>
          <dd className="col-sm-9">{this.Gender()}</dd>

          <dt className="col-sm-3">Post</dt>
          <dd className="col-sm-9">{this.Post()}</dd>

          <dt className="col-sm-3">Place of Posting</dt>
          <dd className="col-sm-9">{this.Posting()}</dd>

          <dt className="col-sm-3">Category</dt>
          <dd className="col-sm-9">{this.Category()}</dd>

          <dt className="col-sm-3">Category Selected</dt>
          <dd className="col-sm-9">{this.Category_Selected()}</dd>

          <dt className="col-sm-3">Category Special</dt>
          <dd className="col-sm-9">{this.Category_Special()}</dd>
        </dl>

        <hr />
        {/* History of Posting */}
        <h3>History of Posting</h3>
        <div className="form-group">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Place of Joining</th>
                <th scope="col">Date of Joining</th>
                <th scope="col">Place of Relieving</th>
                <th scope="col">Date of Relieving</th>
                <th scope="col">Duration</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{this.historyOfPosting()}</tbody>
          </table>

          <button
            className="btn btn-secondary"
            data-toggle="modal"
            data-target={`#myModal`}
            onClick={e => this.props.PostingModal(this.props.PersonId, "", e)}
          >
            Add Row
          </button>
        </div>
        <hr />
        {/* History of Promotion */}
        <h3>History of Promotion</h3>
        <div className="form-group">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Promotion From</th>
                <th scope="col">Promotion To</th>
                <th scope="col">Date of Promotion</th>
                <th scope="col">Date of Joining</th>
                <th scope="col">Category</th>
                <th scope="col">Category Selected</th>
                <th scope="col">Category Special</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{this.historyOfPromotion()}</tbody>
          </table>

          <button
            className="btn btn-secondary"
            data-toggle="modal"
            data-target={`#myModal`}
            onClick={e => this.props.PromotionModal(this.props.PersonId, "", e)}
          >
            Add Row
          </button>
        </div>
        <hr />
        <h3>Additional Information</h3>
      </div>
    );
  }
}

export default EditPerson;
