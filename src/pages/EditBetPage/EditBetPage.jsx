import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class EditBetPage extends Component {
 state = {
   invalidForm: false,
   // Refer to PuppyListItem to see how puppy is being passed via the <Link>
   formData: this.props.location.state.bet
 };

 formRef = React.createRef();

 handleSubmit = e => {
   e.preventDefault();
   this.props.handleUpdateBet(this.state.formData);
 };

 handleChange = e => {
   const formData = {...this.state.formData, [e.target.name]: e.target.value};
   this.setState({
     formData,
     invalidForm: !this.formRef.current.checkValidity()
   });
 };
 render() {
    return (
      <>
        <h1>Update Bet</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-control"
              name="amount"
              value={this.state.formData.amount}
              onChange={this.handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Team</label>
            <input
              className="form-control"
              name="team"
              value={this.state.formData.team}
              onChange={this.handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Bet Type</label>
            <select value={this.state.formData.betType}
              onChange={this.handleChange}
              className="form-control"
              name="betType"
                      >
              <option value="Moneyline">Moneyline</option>
              <option value="Over">Over</option>
              <option value="Under">Under</option>
              <option value="Spread">Spread</option>
            </select>
          </div>
          <div className="form-group">
            <label>Metric</label>
            <input
              className="form-control"
              name="metric"
              value={this.state.formData.metric}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Odds</label>
            <input
              className="form-control"
              name="odds"
              value={this.state.formData.odds}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Potential</label>
            <input
              className="form-control"
              name="potential"
              value={this.state.formData.potential}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Outcome</label>
            <select
            value={this.state.formData.outcome}
            onChange={this.handleChange}
            className="form-control"
            name="outcome">
              <option value="Game Not Complete">Game Not Complete</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
            </select>
        
          </div>
          <div className="form-group"> 
            <label>Earnings</label>
            <input
              className="form-control"
              name="earnings"
              value={this.state.formData.earnings}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            SAVE BET
          </button>
        </form>
      </>
    );
  }
 }

export default EditBetPage;