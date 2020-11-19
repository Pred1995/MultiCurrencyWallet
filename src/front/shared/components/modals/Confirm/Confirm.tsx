import React from 'react'
import PropTypes from 'prop-types'

import actions from 'redux/actions'
import { constants } from 'helpers'

import Link from 'local_modules/sw-valuelink'

import cssModules from 'react-css-modules'
import styles from './Confirm.scss'

import { Modal } from 'components/modal'
import { Button } from 'components/controls'
import { FieldLabel, Input } from 'components/forms'
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl'
import WidthContainer from 'components/layout/WidthContainer/WidthContainer'


const defaultLanguage = defineMessages({
  title: {
    id: 'confirmDialogDefaultTitle',
    defaultMessage: 'Confirm action',
  },
  message: {
    id: 'confirmDialogDefaultMessage',
    defaultMessage: 'Confirm action on this site?',
  },
  yes: {
    id: 'confirmDialogDefaultYes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'confirmDialogDefaultNo',
    defaultMessage: 'No',
  },
})
const isDark = localStorage.getItem(constants.localStorage.isDark)

@injectIntl
@cssModules(styles, { allowMultiple: true })
export default class Confirm extends React.Component<any, any> {

  props: any

  static propTypes = {
    onAccept: PropTypes.func,
  }

  handleClose = () => {
    const { name, data, onClose } = this.props

    if (typeof onClose === 'function') {
      onClose()
    }

    if (typeof data.onClose === 'function') {
      data.onClose()
    }

    actions.modals.close(name)
  }

  handleCancel = () => {
    const { data } = this.props
    if (typeof data.onCancel === 'function') {
      data.onCancel()
    }
    this.handleClose()
  }

  handleConfirm = () => {
    const { name, data, onAccept } = this.props

    actions.modals.close(name)

    if (typeof onAccept === 'function') {
      onAccept()
    }

    if (typeof data.onAccept === 'function') {
      data.onAccept()
    }
  }

  render() {
    const {
      intl,
      name,
      data: {
        title,
        message,
        labelYes,
        labelNo,
      },
    } = this.props

    const labels = {
      title: title || intl.formatMessage(defaultLanguage.title),
      message: message || intl.formatMessage(defaultLanguage.message),
      yes: labelYes || intl.formatMessage(defaultLanguage.yes),
      no: labelNo || intl.formatMessage(defaultLanguage.no),
    }

    return (
      <div styleName={`modal-overlay ${isDark ? 'dark' : ''}`} onClick={this.handleClose}>
        <div styleName="modal">
          <div styleName="header">
            {/*
            //@ts-ignore */}
            <WidthContainer styleName="headerContent">
              <div styleName="title">{labels.title}</div>
            </WidthContainer>
          </div>
          <div styleName="content">
            <div styleName="notification-overlay">
              <p styleName="notification">{labels.message}</p>
            </div>
            <div styleName="button-overlay">
              {/*
              //@ts-ignore */}
              <Button styleName="button" gray onClick={this.handleCancel}>{labels.no}</Button>
              {/*
              //@ts-ignore */}
              <Button styleName="button" blue onClick={this.handleConfirm}>{labels.yes}</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}