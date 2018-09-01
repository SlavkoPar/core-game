/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button } from 'reactstrap';

// className={className}
const SignOutDlg = ({ onSignOut }) => (
    <div style={{ float: 'right' }}>
        <Button color="default" onClick={onSignOut} className="btn-sm">Sign Out</Button>
    </div>

);

export default SignOutDlg;
