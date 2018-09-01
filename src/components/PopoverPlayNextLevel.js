/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const PopoverPlayNextLevel = ({ popoverOpen, popoverCompleted, toggle, onYes, onNo }) => (

    <div>
        <Button id="Popover1" onClick={toggle} style={{ display: 'none' }}>
          Launch Popover
        </Button>
        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
            <PopoverHeader>{popoverCompleted?'Completed level !':'Failed to complete level !'}</PopoverHeader>
            <PopoverBody>
                <p>{popoverCompleted?'Next level will have one clickable box more':'Would you like to play again ?'}</p>
                <Button className="btn-sm" onClick={onYes}>
                    Yes
                </Button>
                &nbsp;
                <Button className="btn-sm" onClick={onNo}>
                    No
                </Button>
            </PopoverBody>
        </Popover>
    </div>

);

export default PopoverPlayNextLevel;
