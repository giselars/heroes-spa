const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter, useNavigate } = require("react-router-dom");

const { AuthContext } = require("../../../src/auth/context");
const { Navbar } = require("../../../src/ui/components/Navbar");

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}));

describe('Pruebas en <Navbar />', () => { 

    const contextValue = {
        logged: true,
        user:{
            name:'User Test'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el nombre del usuario', () => { 
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( screen.getByText('User Test')).toBeTruthy();

    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => { 

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUsedNavigate ).toHaveBeenCalledWith('/login', {"replace": true});
    });

 });