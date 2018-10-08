import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: ''
  };

  getId() {
    const { savedData } = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  createNewRecordByEnter = event => {
    if (event.keyCode === 13) {
      this.createNewRecord();
    }
  };

  toggleRecordComplete = event => {
    const { savedData, saveData } = this.props;
    const elementId = event.target.dataset.id;
    const storage = savedData.map(el => {
      if (el.id === Number(elementId)) {
        if (el.id === Number(elementId)) {
          return { ...el, isComplete: !el.isComplete };
        }
      }
      return el;
    });

    saveData(storage);
  };

  createNewRecord = () => {
    const { inputValue } = this.state;
    const { saveData, savedData } = this.props;
    if (inputValue.length) {
      saveData([
        { id: this.getId(), isComplete: false, text: inputValue },
        ...savedData
      ]);
      this.setState({ inputValue: '' });
    }
  };

  render() {
    const { inputValue } = this.state;
    const { savedData } = this.props;
    return (
      <Card title="Список дел">
        <div className="todo t-todo-list">
          <div className="todo-item todo-item-new">
            <input
              type="text"
              className="todo-input t-input"
              value={inputValue}
              placeholder="Введите значение"
              onChange={this.handleChange}
              onKeyUp={this.createNewRecordByEnter}
            />
            <span className="plus t-plus" onClick={this.createNewRecord}>
              +
            </span>
          </div>
          {savedData.length
            ? this.renderRecord(savedData)
            : this.renderEmptyRecord()}
        </div>
      </Card>
    );
  }

  renderEmptyRecord() {
    return null;
  }

  renderRecord = record => {
    return record.map(({ id, text, isComplete }) => (
      <Item
        key={id}
        id={id}
        text={text}
        isComplete={isComplete}
        toggleRecordComplete={this.toggleRecordComplete}
      />
    ));
  };
}

class Item extends PureComponent {
  render() {
    const { id, text, toggleRecordComplete, isComplete } = this.props;
    return (
      <div className="todo-item t-todo">
        <p className="todo-item__text">{text}</p>
        <span
          className="todo-item__flag t-todo-complete-flag"
          data-id={id}
          onClick={toggleRecordComplete}
        >
          [{isComplete === true ? 'x' : ' '}]
        </span>
      </div>
    );
  }
}

export default withLocalstorage('todo-app', [])(Todo);
