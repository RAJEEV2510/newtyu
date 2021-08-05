import React, { Component } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

class DropzoneDialogExample extends Component {
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
        console.log(files[0])
        console.log(this.props)
        //filetype images
        if (this.props.filetype === "image")
            this.props.setFile(files[0])
        //filetype video
        if (this.props.filetype === "video")
            this.props.setFile1(files[0])
        //filetype zip
        if (this.props.filetype === "zip")
            this.props.setFile2(files[0])



        localStorage.setItem("file", "fileuplaodinghappes")
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
                    UPLOAD
                </button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}

                    showPreviews={true}
                    maxFileSize={500000000}
                    onClose={this.handleClose.bind(this)}
                />
            </>
        );
    }
}
export default DropzoneDialogExample