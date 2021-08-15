import Header from './Header';
import Footer from './Footer';
import {useContext} from 'react'
import { MenuContext } from "react-flexible-sliding-menu";

const Frame = ({children}) => {
    const { closeMenu } = useContext(MenuContext);

    return (
        <>
         <Header />
            <div className="" onClick={closeMenu}>
               {children}
            </div>
         <Footer />   
        </>
    )
}

export default Frame;
