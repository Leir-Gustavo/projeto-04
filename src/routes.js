import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditProducts from './components/EditProducts';
import EditPerfil from './components/EditPerfil';
import Perfil from './components/Perfil';
import AddProducts from './components/AddProducts';
import useGlobalContext from './hooks/useGlobalContext';


function ProtectedRoute({ redirectTo }) {
    const { token } = useGlobalContext();

    return token ? <Outlet></Outlet> : <Navigate to={redirectTo}></Navigate>
}

function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn></SignIn>}></Route>

            <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
            <Route element={<ProtectedRoute redirectTo='/'></ProtectedRoute>}>
                <Route path='/main' element={<Main></Main>}></Route>
                <Route path='/add-products' element={<AddProducts></AddProducts>}></Route>
                <Route path='/edit-products' element={<EditProducts></EditProducts>}></Route>
                <Route path='/perfil' element={<Perfil></Perfil>}></Route>
                <Route path='/edit-perfil' element={<EditPerfil></EditPerfil>}></Route>
            </Route>
        </Routes>
    )
}

export default MainRoutes;