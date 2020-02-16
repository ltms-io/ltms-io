import React, { Component } from 'react';
import { connect } from 'react-redux'

class LTMS extends Component {
  render () {
    const { tournaments } = this.props;
    const tournamentList = tournaments.map(tournament => {
      return (
        <div className="ltms">
          <div>ID: { tournament.id }</div>
          <div>Title: { tournament.title }</div>
          <div>Role: { tournament.role } </div>
        </div>
      );
    });
    return(
      <div className="tournament-list">
        { tournamentList }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tournaments: state.tournaments
  }
};

export default connect(mapStateToProps)(LTMS);
