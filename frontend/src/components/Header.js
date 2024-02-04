import './Header.css'

function Header() {
    return (        
        <header className="header">
            <div className="links">
            <div className="tree-header">Roots & Rings</div>
                <a href="/" class="add-relationships">My Family Tree</a>
                <a href="/add_person" class="add-relationships">Add Family Member</a>
                <a href="/add_relation" class="add-relationships">Add Relationship</a>
                <a href="/feed" class="memories-link">Memories</a>
                <a href="/add_memory" class="add-memories">Add Memories</a>
                <a href="/about_us" class="about-link">About Us</a>
            </div> 
        </header>
    );
}

export default Header;