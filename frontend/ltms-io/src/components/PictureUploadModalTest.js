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
            thumbUrl: '',
            imgUrl: '',
        }
    }

    modalClose = () => {
        this.setState({addVolunteerShow: false});
        // setTimeout(() => {
        this.requestUserImg();
        // }, 12000);
    }

    async requestUserImg() {
        //TODO: Replace with actual current user id once implemented
        axios({method: "post", url: "http://localhost:5000/api/users/profilepic", data: {auth0id: localStorage.getItem("auth0_id")}})
        .then((res)=> {
            if (res.status === 200) {
                console.log("Img url:");
                console.log(res.data);
                this.setState({thumbUrl: res.data.thumbUrl, imgUrl: res.data.imgUrl});
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
                    {this.state.thumbUrl ? <img alt="thumb" src={this.state.thumbUrl}/> : null}
                    {this.state.imgUrl ? <img alt="img" src={this.state.imgUrl}/> : null}
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
