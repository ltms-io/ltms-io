import React, { Component } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {
  render () {
    const { tournaments } = this.props;
    const tournamentList = tournaments.map(tournament => {
      return (
        <div className="tournament">
          <div>ID: { tournament.id }</div>
          <div>Title: { tournament.title }</div>
          <div>Role: { tournament.role } </div>
        </div>
      );
    });
    const name = this.props.name;
    const email = this.props.email;
    return(
      <div>
        <div className="user-info">
          <h3>Welcome { name }!</h3>
          <h4>Email: { email }</h4>
        </div>
        <div className="tournament-list">
          { tournamentList }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    email: state.email,
    tournaments: state.tournaments
  }
};

export default connect(mapStateToProps)(Dashboard);
