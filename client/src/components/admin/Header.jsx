import React from "react";
import {Link,useNavigate} from "react-router-dom";

export default function Header() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const token = localStorage.getItem('admintoken');
    const navigate=useNavigate()
      navigate('/admin')
      const logout=()=>{
   localStorage.removeItem("admintoken")
    }

    return (
        <header className="text-white body-font">
            <div className="container mx-auto flex flex-wrap p-5 md:flex-row">
                <Link className="flex title-font font-medium text-white mb-4 md:mb-0 pr-4" to="/">
                    <span className="ml-3 text-3xl">ADMIN PANEL</span>
                </Link>
                <button className="text-white cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none ml-auto pb-3" type="button"
                    onClick={
                        () => setNavbarOpen(!navbarOpen)
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <div
  className={
    "md:flex flex-grow items-center" +
    (navbarOpen ? " flex" : " hidden")
  }
  id="example-navbar-danger"
>
<nav className="md:ml-auto flex md:flex-row md:mt-0 mt-6 text-base justify-end font-semibold md:pl-7 pl-10 ">
  <Link className="mr-6 hover:text-white hover:border-b-2 border-transparent border-opacity-0 hover:border-white " to="/admindashboard">
    Add product
  </Link>
    <Link className="mr-6 hover:text-white hover:border-b-2 border-transparent border-opacity-0 hover:border-white " to="/order">
      Orders
    </Link>
  {token &&  <Link className="mr-6 hover:text-white hover:border-b-2 border-transparent border-opacity-0 hover:border-white" onClick={logout}>
    logout
  </Link>}

</nav>

</div>

            </div>
        </header>
    );
}
