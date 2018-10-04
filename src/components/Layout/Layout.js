import React, { Fragment, PureComponent } from 'react';
import SectionTitle from '../SectionTitle';
import './Layout.css';

class Layout extends PureComponent {
  render() {
    const { header, footer, children } = this.props;
    return (
      <Fragment>
        {header && this.renderHeader(header)}
        {this.renderMain(children)}
        {footer && this.renderFooter(footer)}
      </Fragment>
    );
  }

  renderHeader(HeaderChild) {
    return (
      <header className="header">
          <SectionTitle className="header__title">HEADER</SectionTitle>
        <HeaderChild/>
      </header>
    );
  }

  renderFooter(FooterChild) {
    return (
      <footer className="footer">
          <SectionTitle className="header__title">FOOTER</SectionTitle>
        <FooterChild/>
      </footer>
    );
  }

  renderMain(children) {
    const { footer, header } = this.props;
    let customClass = 'main';
    if (footer) {
      customClass += ' main--with-footer';
    }
    if (header) {
      customClass += ' main--with-header';
    }
    return (
      <main className={customClass}>
        <SectionTitle className="main__title">MAIN</SectionTitle>
        {children}
      </main>
    );
  }
}

export default Layout;
