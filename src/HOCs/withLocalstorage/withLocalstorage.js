import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (storage, data) => WrappedComponent => {
  return class extends Component {
    static displayName = 'withLocalStorage';
    constructor(props) {
      super(props);
      if (load(storage) === null) {
        save(storage, data);
      }
    }

    loadFromLocalstorage = () => {
      return load(storage);
    };

    // handleToggle = id => {
    //   const store = this.loadFromLocalstorage();
    //   const newStorage = store.map(el => {
    //     if (el.id === Number(id)) {
    //       return { ...el, isComplete: !el.isComplete };
    //     }
    //     return el;
    //   });
    //
    //   save(storage, newStorage);
    //   this.forceUpdate();
    // };

    handleSaveData = data => {
      save(storage, data);
      this.forceUpdate();
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          savedData={this.loadFromLocalstorage()}
          saveData={this.handleSaveData}
          // toggle={this.handleToggle}
        />
      );
    }
  };
};

export default withLocalstorage;
