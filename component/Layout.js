import Appbar from "./AppBar";

const Layout = ({children}) => {
    return (
        <>
            <Appbar />
            {children}
        </>
    );
}
 
export default Layout;