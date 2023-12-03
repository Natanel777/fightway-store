import { NavLink } from "react-router-dom"
import { useContext } from "react";
import logo from "../Assets/logoReact.png";
import { RxGithubLogo } from "react-icons/rx"
import { BsMoonStarsFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import AuthContext from "../../Context/AuthContext";



const Navbar = () => {
    //another way instead of css
    //const isActive = (o:{isActive:boolean}) => (o.isActive ? "text-black" : "")

    const {isLoggedIn, logout} = useContext(AuthContext)

    return (

        <nav id="app-nav" className="sm:gap-10 shadow-sm p-5 gap-4 flex items-center bg-sky-50 font-thin">
            <NavLink className="" to={"/home"}>
                <img className="w-40 " src={logo} alt="logo" />
            </NavLink>

            <NavLink className="" to={"/about"}>About</NavLink>
            {isLoggedIn && <NavLink className="" to={"/posts"}>Posts</NavLink>}
            <div className="flex-1"></div>

            {!isLoggedIn && <NavLink className="" to={"/login"}>Login</NavLink>}
            {!isLoggedIn &&<NavLink className=" block" to={"/register"}>Register</NavLink>}


            <div className="hidden sm:block">
                <a href="https://github.com/">
                    <RxGithubLogo className="text-xl" />
                </a>
            </div>

            {isLoggedIn && <button onClick={() => {
                 logout() 
                 }}>Logout</button>}
        </nav>
    )
}

export default Navbar