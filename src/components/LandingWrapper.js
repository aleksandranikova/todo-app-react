import React, { Component } from 'react';
import { Input, Header, Progress, Divider, Button } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DragDropWrapper from './DragDropWrapper';
import ModalWrapper from './ModalWrapper';

export class LandingWrapper extends Component {
    state = {
        currentTask: "",
        errorClass: false
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedTask !== this.props.selectedTask && this.props.selectedTask) {
            this.setState({ currentTask: this.props.selectedTask.description });
        } else if (prevProps.selectedTask !== this.props.selectedTask && !this.props.selectedTask) {
            this.setState({ currentTask: "" });
        }
    }
    render() { 
        return (
            <div>
                <img className="custom-image" src="/landing.jpg" alt=""></img>
                <Header>Manage your tasks.</Header>
                <Input error={this.state.errorClass} fluid placeholder='Add Task...' name="currentTask" onChange={this.handleChange} value={this.state.currentTask} action={{ content: this.props.selectedTask ? "Save" : "Add", onClick: () => this.addTask() }} />
                <div className="custom-margin">
                    <DragDropWrapper></DragDropWrapper>
                </div>
                <Progress color='teal' value={this.props.allTasks.length - this.props.activeTasks.length} total={this.props.allTasks.length} />
                <Divider horizontal>{this.props.allTasks.length - this.props.activeTasks.length} / {this.props.allTasks.length}</Divider>
                <Button className="btn-test" onClick={this.markAllAsDone} disabled={this.props.activeTasks.length === 0}>Mark all as Done</Button>
                <ModalWrapper></ModalWrapper>
         </div>
        );
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
        if (this.state.errorClass) {
            this.setState({errorClass: false});
        }
    }

    addTask = () => {
        if (this.state.currentTask) {
            if (this.props.selectedTask) {
                let task = Object.assign({}, this.props.selectedTask);
                task.description = this.state.currentTask;
                this.props.saveEdit(task);
            } else {
                let task = {
                    id: (this.props.allTasks.length + 1).toString(),
                    description: this.state.currentTask,
                    done: false
                }
                this.props.addTask(task);
            }
            this.setState({ currentTask: "" });
            this.setState({ errorClass: false });
        } else {
            this.setState({ errorClass: true });
        }        
    }

    markAllAsDone = () => {
        this.props.activeTasks.forEach(item => {
            item.done = true;
            this.props.moveToDone(item);
        });
    }
}

const mapStateToProps = (state) => {
    return {
        allTasks: state.allTasks,
        activeTasks: state.activeTasks,
        selectedTask: state.selectedTask,
        doneTasks: state.doneTasks
    }
}
export default connect(mapStateToProps, actions)(LandingWrapper);