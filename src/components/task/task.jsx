import React from 'react';
import { Container, Row, Col, ListGroup, Form, DropdownButton, Dropdown, Badge, ButtonGroup, Alert} from 'react-bootstrap';

function Task({task, makeTaskDone, removeTask}) {
    return (
        <div>
            <ListGroup.Item key={task.id}>{task.content}
            <DropdownButton
                title="Action" id="bg-nested-dropdown" size={'sm'} className='action'
                as={ButtonGroup}
            >
                <Dropdown.Item
                onClick={() => makeTaskDone(task.id)}
                eventKey="1">{'Done'}
                </Dropdown.Item>
                <Dropdown.Item
                eventKey="2"
                onClick={() => removeTask(task.id)}
                >{'Remove'}</Dropdown.Item>
            </DropdownButton>
            </ListGroup.Item>
        </div>
    );
}
export default Task;