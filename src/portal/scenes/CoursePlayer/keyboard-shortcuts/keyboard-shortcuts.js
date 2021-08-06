import React, { Component } from 'react'


import Dialog from '@pluralsight/ps-design-system-dialog';
import { Heading } from '@pluralsight/ps-design-system-text';
import css from './keyboard-shortcuts.module.css';

export class KeyboardShortcuts extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    // this.props.toggleKeyboardShortcuts()
  }

  renderShortcuts() {
    const { registeredShortcuts } = this.props
    if (!registeredShortcuts) return null

    return Object.values(registeredShortcuts).map(({ display, description }) => (
      <tr key={display}>
        <td style={{ paddingRight: '20px' }}>{display}</td>
        <td>{description}</td>
      </tr>
    ))
  }

  render() {
    return (
      <div className={css.wrapper}>
        {this.props.showingKeyboardShortcuts && (
          <Dialog modal aria-label="keyboard shortcuts" onClose={this.handleClick}>
            <div className={css['modal-container']}>
              <Heading size={Heading.sizes.small}>
                <h2 className={css['modal-header']}>Keyboard Shortcuts</h2>
              </Heading>
              <table className="shortcuts">
                <tbody>
                  <tr className="visually-hidden">
                    <th scope="col">Key</th>
                    <th scope="col">Descriptions</th>
                  </tr>
                  {this.renderShortcuts()}
                </tbody>
              </table>
            </div>
          </Dialog>
        )}
      </div>
    )
  }
}

export default KeyboardShortcuts;