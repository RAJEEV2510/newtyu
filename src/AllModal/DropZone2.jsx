import React, { Component } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

class DropzoneDialog2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen = () => {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <>
                <button onClick={() => {
                    this.handleOpen()
                    document.getElementsByClassName("upload_test")[0].style.zIndex = "0"

                }}>
                    Add Image
                </button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </>
        );
    }
}
export default DropzoneDialog2