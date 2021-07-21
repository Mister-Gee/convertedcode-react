import Header from './Header';
import Footer from './Footer';

const Frame = ({children}) => {
    return (
        <>
         <Header />
            {children}
         <Footer />   
        </>
    )
}

export default Frame;
