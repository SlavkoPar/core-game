/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LogInForm from './LogInForm';

// className={className}
const LogInDlg = ({ logInDlgOpen, toggle, onSubmit }) => (
    <div style={{ float: 'right' }}>
        <Button color="default" onClick={toggle} className="btn-sm">Log In</Button>
        <Modal
            isOpen={logInDlgOpen}
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
                <h3>🏁 Log In</h3>
            </ModalHeader>
            <ModalBody>
                <LogInForm onSubmit={onSubmit} />
            </ModalBody>
            <ModalFooter>
                {/* <Button color="primary"
                        onClick={() => dispatch(Actions.onLogInDlgSave())}>
                        Do Something
                    </Button>{' '}
                */}
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    </div>

);

LogInDlg.propTypes = {
    logInDlgOpen: PropTypes.bool.isRequired
};

export default LogInDlg;
