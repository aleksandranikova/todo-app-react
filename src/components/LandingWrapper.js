import React, { Component } from 'react';
import { Input, Header } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class LandingWrapper extends Component {
    state = {
        currentTask: ""
    }

    render() {
        return (
            <div>
                <Header>Manage your tasks.</Header>
                <Input fluid placeholder='Add Task...' name="currentTask" onChange={this.handleChange} value={this.state.currentTask} action={{ content: "Add", onClick: () => this.addTask()}}/>
                {this.props.allTasks.map(x => {
                    return <div key={x.id}>{x.description}</div>})}
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
            id: this.props.allTasks.length + 1,
            description: this.state.currentTask,
            done: false
        }
        this.props.addTask(task);
        this.setState({currentTask: ""});
    }
}

const mapStateToProps = (state) => {
    return {
        allTasks: state.allTasks
    }
}
export default connect(mapStateToProps, actions)(LandingWrapper);
