import React from "react";
import "./Header.css";
import { LogIn, RefreshCcw, PlusSquare } from "lucide-react";

const Header = () => {
    return (
        <header className="header">
            {/* Logo */}
            <div className="logo-container">
                <img
                    src="/logo.png" // Replace with your actual logo path
                    alt="Ran Aswanu Logo"
                    className="logo"
                />
                <span className="logo-text">
          <span className="logo-yellow">RAN</span>
          <span className="logo-green"> ASWANU</span>
        </span>
            </div>

            {/* Navigation Links */}
            <nav className="nav-links">
                <a href="#">All Ads</a>
                <a href="#">How It Works</a>
                <a href="#">Contact Us</a>
            </nav>

            {/* Actions */}
            <div className="actions">
                <LogIn className="icon" />
                <RefreshCcw className="icon" />
                <button className="submit-button">
                    <PlusSquare className="button-icon" />
                    <span>Submit Ad</span>
                </button>
            </div>
        </header>
    );
};

export default Header;