function Header() {
    return (        
        <header className="header">
            <div className="links">
            <h1 className="tree-header">Roots & Rings</h1>
                <a href="/" class="add-relationships">My Family Tree</a>
                <a href="/add_person" class="add-relationships">Add Family Member</a>
                <a href="/add_relation" class="add-relationships">Add Relationship</a>
                <a href="/feed" class="memories-link">Memories</a>
                <a href="/" class="about-link">About Us</a>
            </div> 
        </header>
    );
}

export default Header;