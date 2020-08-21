import React from 'react';
import {create} from 'react-test-renderer'; 
import ProfileStatus from './ProfileStatus';


describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create (<ProfileStatus status='it-kamasutra.com' />)
        const instatce = component.getInstance(); 
        expect (instatce.state.status).toBe('it-kamasutra.com');
    });
    test('after creator <span> should be displayed', () => {
        const component = create (<ProfileStatus status='it-kamasutra.com' />)
        const root = component.root; 
        let span = root.findByType('span');
        expect (span).not.toBeNull();
    });
    test("after creator <input> shouldn't be displayed", () => {
        const component = create (<ProfileStatus status='it-kamasutra.com' />)
        const root = component.root; 
        expect( () => {
            let input = root.findByType('input');
        }).toThrow();
    });
    test('after creator <span> should contains with correct status', () => {
        const component = create (<ProfileStatus status='it-kamasutra.com' />)
        const root = component.root(); 
        let span = root.findByType('span');
        expect (span.innerText).toBe('it-kamasutra.com');
    });
    test('input should be displayer in editMode instead of span', () => {
        const component = create (<ProfileStatus status='it-kamasutra.com' />)
        const root = component.root(); 
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect (input.props.value).toBe('it-kamasutra.com');
    });
    test('callback should be called', () => {
        const mockCollback = jest.fn();
        const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus = {mockCollback}  />)    
        const instance = component.getInstance(); 
        instance.deactivateEditMode();
        expect (mockCollback.mock.calls.length).toBe(1);
    });
});