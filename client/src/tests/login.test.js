import Login from "../views/Login";
import {fireEvent, render} from "@testing-library/react"
import {BrowserRouter} from 'react-router-dom'


jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
      pathname: '/login',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
}));

describe('login', () => {

//what do I need to test?
//if the email is empty, does it return something?
// if password is empty, does it return something?

jest.mock('../views/Login.js', () => () => (<Login />));


test('error message if no email',async  () => {

    let {getByTestId} = render(<Login />)
    let input = getByTestId("email");
    let errorMessage = getByTestId("errormessage")
    await fireEvent.change(input, {target : {value : ""}})
    expect(errorMessage).toBe("Email and Password required")
  
});


  
});
