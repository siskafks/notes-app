import React from "react";

class NoteInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title:'',
            body: '',
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event){
        const limit = 50;
        this.setState(() => {
            return {
                title: event.target.value.slice(0, limit)
            }
        });
    }

    onBodyChangeEventHandler(event){
        this.setState(() => {
            return {
                body: event.target.value
            }
        });
    }

    onSubmitEventHandler(event){
        event.preventDefault();
        if (this.state.title.trim() !== '' && this.state.body.trim() !== '') {
            this.props.addNote(this.state);
            
            this.setState({
                title: '',
                body: ''
            });
        }
    }

    render(){
        return (
            <div className="note-input">
                <form onSubmit={this.onSubmitEventHandler}>
                    <p className="note-input__title__char-limit">Character left: {50 - this.state.title.length}</p>
                    <input type="text" className="note-input__title" placeholder="Title" value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                    <textarea className="note-input__body" placeholder="Write your notes here ..." value={this.state.body} onChange={this.onBodyChangeEventHandler}></textarea>
                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default NoteInput;