import React, { Component, Fragment } from 'react';
import { FormDesc, FormTitle, FormButtonStyled } from './formStyle';
import PopupNoAuth from '../popups/noAuth';

class FormNoAuth extends Component {
  state = {
    open: false
  };

  togglePopup = (open) => {
    this.setState({ open });
  };

  render() {
    const { formDesc } = this.props;

    return (
      <Fragment>
        <FormTitle>Подключение пакета каналов</FormTitle>
        {formDesc ? <FormDesc>{formDesc}</FormDesc> : null}
        <FormButtonStyled type='primary' text='Подключить' onClick={() => this.togglePopup(true)} />
        <PopupNoAuth close={() => this.togglePopup(false)} open={this.state.open} />
      </Fragment>
    );
  }

}

export default FormNoAuth;
