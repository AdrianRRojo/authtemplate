import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Landing(){
    const handleLogout = () => {
        Cookies.remove('Login')
        navigate('/', {replace: true});
        window.location.reload();
    }
    const navigate = useNavigate();

    return(
        <div>
            Landing

            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}