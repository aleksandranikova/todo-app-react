import React, { Component } from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ModalWrapper extends Component {
    state = {
      currentMode: 'all'
    }

    renderTasks = () => {
      let tasksArray = [];
      if (this.state.currentMode === 'all') {
        tasksArray = [...this.props.allTasks];
      }
      if (this.state.currentMode === 'active') {
        tasksArray = [...this.props.activeTasks];
      }
      if (this.state.currentMode === 'done') {
        tasksArray = [...this.props.doneTasks];
      }
      if (tasksArray.length > 0) {
        return tasksArray.map(x => {
          return <Button key={x.id} basic fluid inverted>{x.description}</Button>
        });
      } else {
        return 'There are no tasks found.'
      }
    }

    setMode = (mode) => {
      this.setState({currentMode: mode})
    }

    onClose = () => {
      this.setState({currentMode: 'all'})
    }

    render() {
        return (
          <Modal trigger={<Button>Show history</Button>} basic size='small' onClose={this.onClose}>
          <Header icon='archive' content='Task History' />
            <Modal.Content>
              <p>
                This is a complete log of all your tasks. You can filter them by status.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.setMode.bind(this, 'all')} basic color='red' inverted>
                <Icon name='browser' /> All
              </Button>
              <Button onClick={this.setMode.bind(this, 'active')} basic color='red' inverted>
                <Icon name='history' /> Active
              </Button>
              <Button onClick={this.setMode.bind(this, 'done')} basic color='red' inverted>
                <Icon name='check' /> Done
              </Button>
            </Modal.Actions>
            <Modal.Content>
              {this.renderTasks()}
            </Modal.Content> 
          </Modal>

        );
    }
}

const mapStateToProps = (state) => {
  return {
      allTasks: state.allTasks,
      activeTasks: state.activeTasks,
      doneTasks: state.doneTasks
  }
}

export default connect(mapStateToProps, actions)(ModalWrapper);