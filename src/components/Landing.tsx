import Cookies from "js-cookie";
export default function Landing(){
    const handleLogout = () => {
        Cookies.remove('Login')
    }
    return(
        <div>
            Landing

            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}