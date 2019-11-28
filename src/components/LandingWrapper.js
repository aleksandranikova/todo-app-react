import React, { Component } from 'react';
import { Input, Header } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DragDropWrapper from './DragDropWrapper';

class LandingWrapper extends Component {
    state = {
        currentTask: ""
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedTask !== this.props.selectedTask) {
            this.setState({ currentTask: this.props.selectedTask.description });
        }
    }
    render() {
        return (
            <div>
                <Header>Manage your tasks.</Header>
                <Input fluid placeholder='Add Task...' name="currentTask" onChange={this.handleChange} value={this.state.currentTask} action={{ content: this.props.selectedTask ? "Save" : "Add", onClick: () => this.addTask() }} />
                <DragDropWrapper></DragDropWrapper>
            </div>
        );
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    }

    addTask = () => {
        let task = {
            id: (this.props.allTasks.length + 1).toString(),
            description: this.state.currentTask,
            done: false
        }
        this.props.addTask(task);
        this.setState({ currentTask: "" });
    }
}

const mapStateToProps = (state) => {
    return {
        allTasks: state.allTasks,
        selectedTask: state.selectedTask
    }
}
export default connect(mapStateToProps, actions)(LandingWrapper);
