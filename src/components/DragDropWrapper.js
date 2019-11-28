import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as actions from '../actions';

class DragDropWrapper extends Component {
  onDragEnd = async (evt) => {
    const { todoItems, doneItems } = this.props;
    const { source, destination } = evt;
    let item = {};
    if (destination && source.droppableId !== destination.droppableId) {
      if (source.droppableId === "todoDroppable") {
        item = todoItems[source.index];
        item.done = true;
        this.props.moveToDone(item);
      }
      else {
        item = doneItems[source.index];
        item.done = false;
        this.props.moveToDo(item);
      }
    }
  }

  removeTask = (event) => {
    this.props.removeTask(event.id);
  }

  editTask = (event) => {
    this.props.selectTask(event);
  }

  render() {
    return (
      <div className="App">
        <div className='col-10'>
          <div className='row list'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="todoDroppable">
                {(provided, snapshot) => (
                  <div
                    className='droppable'
                    ref={provided.innerRef}
                  >
                    &nbsp;
                      <h4>To Do</h4>
                    <div className="list-group">
                      {this.props.todoItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              className='list-group-item'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item.description}
                              <a>
                                <i onClick={this.editTask.bind(this, item)} className="fa fa-edit" style={{ marginRight: "5px" }}></i>
                                <i onClick={this.removeTask.bind(this, item)} className="fa fa-close"></i>
                              </a>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="doneDroppable">
                {(provided) => (
                  <div
                    className='droppable'
                    ref={provided.innerRef}
                  >
                    &nbsp;
                      <h4>Done</h4>
                    <div className="list-group">
                      {this.props.doneItems.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className='list-group-item dark-grey-background'
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {item.description}
                              <a>
                                <i onClick={this.removeTask.bind(this, item)} className="fa fa-close"></i>
                              </a>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todoItems: state.activeTasks,
    doneItems: state.doneTasks
  }
}

export default connect(mapStateToProps, actions)(DragDropWrapper);