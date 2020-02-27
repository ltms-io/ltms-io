import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import PictureUploadModal from './PictureUploadModal';
import { connect } from 'react-redux'

class PictureUploadModalTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addVolunteerShow: false,
        }
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={() => this.setState({addVolunteerShow: true})}
                    disabled={!this.props.name} >
                        Test out the modal!!
                    </Button>
                <PictureUploadModal show={this.state.addVolunteerShow} handleClose={() => this.setState({addVolunteerShow: false})} name={this.props.name}></PictureUploadModal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      name: state.name,
    }
  };
  
export default connect(mapStateToProps)(PictureUploadModalTest);