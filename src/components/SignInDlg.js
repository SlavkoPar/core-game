/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SignInForm from './SignInForm';

// className={className}
const SignInDlg = ({ signInDlgOpen, toggle, onSubmit }) => (
    <div style={{ float: 'right', marginRight: '10px' }}>
        <Button color="default" onClick={toggle} className="btn-sm">Sign In</Button>
        <Modal
            isOpen={signInDlgOpen}
            toggle={toggle}
        >
            <ModalHeader toggle={toggle}>
                <h3>🏁 Sign In</h3>
            </ModalHeader>
            <ModalBody>
                <SignInForm onSubmit={onSubmit} />
            </ModalBody>
            <ModalFooter>
                {/* <Button color="primary"
                        onClick={() => dispatch(Actions.onSignInDlgSave())}>
                        Do Something
                    </Button>{' '}
                */}
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    </div>

);

SignInDlg.propTypes = {
    signInDlgOpen: PropTypes.bool.isRequired
};

export default SignInDlg;
