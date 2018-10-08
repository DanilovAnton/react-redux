import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (storage, data) => WrappedComponent => {
  class WithStorage extends Component {
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

    handleSaveData = data => {
      save(storage, data);
      this.forceUpdate();
    };

    render() {
      const { forwardedRef, ...rest } = this.props;
      return (
        <WrappedComponent
          {...rest}
          savedData={this.loadFromLocalstorage()}
          saveData={this.handleSaveData}
          ref={forwardedRef}
        />
      );
    }
  }

  return React.forwardRef((props, ref) => (
    <WithStorage {...props} forwardedRef={ref} />
  ));
};

export default withLocalstorage;
