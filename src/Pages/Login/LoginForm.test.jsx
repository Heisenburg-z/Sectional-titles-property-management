import { AuthProvider } from '../../utils/auth';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

const mockSignInWithEmailAndPassword = jest.fn();
jest.mock('firebase/auth', () => ({
  getAuth: () => ({ signInWithEmailAndPassword: mockSignInWithEmailAndPassword })
}));


test("renders the login section",async ()=>{
    render(<AuthProvider><Router><LoginForm/></Router></AuthProvider>)

    const customSection = screen.getByTestId("custom-section")
    expect(customSection).toBeInTheDocument();
})

test("renders everything inside the login section",async()=>{
    render(<AuthProvider><Router><LoginForm/></Router></AuthProvider>)

    const role = screen.getByRole('textbox')
    expect(role).toBeInTheDocument()

    const usernameInput = screen.getByTestId("input-username")
    expect(usernameInput).toBeInTheDocument();

    const username = screen.getByPlaceholderText("Username")
    expect(username).toBeInTheDocument()


})

test("renders password field",async()=>{
    render(<AuthProvider><Router><LoginForm/></Router></AuthProvider>)

    const passwordInput = screen.getByTestId("input-password")
    expect(passwordInput).toBeInTheDocument();

    const password = screen.getByPlaceholderText("Password")
    expect(password).toBeInTheDocument()
})

test("render login title",async()=>{
    render(<AuthProvider><Router><LoginForm/></Router></AuthProvider>)

    const title = screen.getByRole('heading', {  name: /login/i})
    expect(title).toBeInTheDocument();

})



