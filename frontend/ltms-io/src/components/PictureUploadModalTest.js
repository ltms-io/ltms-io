import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import PictureUploadModal from './PictureUploadModal';
import { connect } from 'react-redux';
import axios from 'axios';

class PictureUploadModalTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addVolunteerShow: false,
            imgUrl: '',
        }
    }

    modalClose = () => {
        this.setState({addVolunteerShow: false});
        this.requestUserImg();
    }

    requestUserImg() {
        axios({method: "post", url: "http://localhost:5000/api/users/profilepic", data: {id: "5e54b2b96efec099146c054c"}})
        .then((res)=> {
            if (res.status === 200) {
                console.log("Img url:");
                console.log(res.data);
                this.setState({imgUrl: res.data});
            }
        })
    }

    render() {
        return (
            <div>
                <Button 
                    onClick={() => this.setState({addVolunteerShow: true})}
                    disabled={!this.props.name} >
                        Test out the modal!!
                    </Button>
                <PictureUploadModal 
                    show={this.state.addVolunteerShow} 
                    handleClose={this.modalClose} 
                    name={this.props.name}></PictureUploadModal>
                {this.state.imgUrl ? <img src={this.state.imgUrl}/> : null}
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