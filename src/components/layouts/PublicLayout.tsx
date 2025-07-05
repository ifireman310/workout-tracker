import React from 'react';
import Navigation from '../Navigation';
import Header from '../Header';
import Footer from '../Footer';

const PublicLayout = ({ children }: any) => {

    return (
        <div className="container">
            <Header />
            <Navigation />
            <main>
                {children}
            </main>
            <Footer />

        </div>
    );
}

export default PublicLayout;