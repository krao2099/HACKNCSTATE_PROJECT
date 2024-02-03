CREATE TABLE Person (

    id SERIAL PRIMARY KEY,
    name TEXT,
    birthday DATE,
    bio TEXT, 
    profile_picture TEXT,
);

CREATE TABLE RelationshipType (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE Relationship (
    id SERIAL PRIMARY KEY,
    p1_id INTEGER,
    p2_id INTEGER,
    type_id INTEGER
);

CREATE TABLE Memory (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    files TEXT[],
    mem_type INTEGER
);

CREATE TABLE MemoryType (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE Memory_Person (
    memory_id INTEGER,
    person_id INTEGER
);

CREATE TABLE TREE (
    tree JSON
);

-- Insert people
INSERT INTO Person (name, birthday, bio, profile_picture) VALUES
    ('Alice', '1990-05-15', 'Test Bio', NULL),
    ('Bob', '1985-08-22', 'Test Bio', NULL),
    ('Charlie', '1978-11-30', 'Test Bio', NULL),
    ('David', '1992-03-10', 'Test Bio', NULL),
    ('Emily', '1980-06-25', 'Test Bio', NULL),
    ('Frank', '1987-09-18', 'Test Bio', NULL),
    ('Grace', '1995-02-08', 'Test Bio', NULL),
    ('Henry', '1975-04-20', 'Test Bio', NULL),
    ('Ivy', '1998-07-12', 'Test Bio', NULL),
    ('Jack', '1982-10-05', 'Test Bio', NULL),
    ('Kate', '1991-12-28', 'Test Bio', NULL),
    ('Liam', '1989-01-17', 'Test Bio', NULL),
    ('Mia', '1993-04-03', 'Test Bio', NULL),
    ('Noah', '1973-07-29', 'Test Bio', NULL),
    ('Olivia', '1984-09-14', 'Test Bio', NULL),
    ('Peter', '1996-11-09', 'Test Bio', NULL),
    ('Quinn', '1986-01-26', 'Test Bio', NULL),
    ('Ryan', '1977-03-15', 'Test Bio', NULL),
    ('Sophia', '1997-06-20', 'Test Bio', NULL),
    ('Thomas', '1988-08-02', 'Test Bio', NULL);

-- Insert relationship types
INSERT INTO RelationshipType (name) VALUES
    ('Parent'),
    ('Sibling'),
    ('Married');

-- Insert relationships
INSERT INTO Relationship (p1_id, p2_id, type_id) VALUES
    (1, 2, 1), -- Alice is a parent of Bob
    (3, 1, 1), -- Charlie is a parent of Alice
    (3, 4, 1), -- Charlie is a parent of David
    (5, 6, 1), -- Emily is a parent of Frank
    (5, 7, 1), -- Emily is a parent of Grace
    (8, 5, 1), -- Henry is a parent of Emily
    (8, 9, 1), -- Henry is a parent of Ivy
    (10, 11, 1), -- Jack is a parent of Kate
    (10, 12, 1), -- Jack is a parent of Liam
    (13, 10, 1), -- Mia is a parent of Jack
    (13, 14, 1), -- Mia is a parent of Noah
    (15, 13, 1), -- Olivia is a parent of Mia
    (15, 16, 1), -- Olivia is a parent of Peter
    (17, 15, 1), -- Quinn is a parent of Olivia
    (17, 18, 1), -- Quinn is a parent of Ryan
    (19, 17, 1), -- Sophia is a parent of Quinn
    (19, 20, 1), -- Sophia is a parent of Thomas
    (2, 3, 2), -- Bob and Alice are siblings
    (4, 7, 2), -- David and Grace are siblings
    (6, 9, 2), -- Frank and Ivy are siblings
    (11, 12, 2), -- Kate and Liam are siblings
    (14, 16, 2), -- Noah and Peter are siblings
    (18, 20, 2); -- Ryan and Thomas are siblings

-- Insert memory types
INSERT INTO MemoryType (name) VALUES
    ('Childhood'),
    ('Family'),
    ('Special Event');

-- Insert memories
INSERT INTO Memory (title, description, files, mem_type) VALUES
    ('Alice''s Birthday', 'Alice''s birthday party', NULL, 3), -- Special event memory
    ('Family Vacation 2000', 'Family vacation in 2000', NULL, 2), -- Family memory
    ('Graduation Day', 'Graduation day', NULL, 3), -- Special event memory
    ('Siblings Playing', 'David and Grace playing in the backyard', NULL, 1), -- Childhood memory
    ('Wedding Day', 'Quinn and Ryan''s wedding', NULL, 3); -- Special event memory

-- Link memories to people
INSERT INTO Memory_Person (memory_id, person_id) VALUES
    (1, 1), -- Alice's birthday memory
    (1, 4), -- Add david to alices birthday
    (2, 4), -- Family vacation memory
    (3, 10), -- Graduation memory
    (4, 4), -- David's childhood memory
    (5, 18); -- Quinn and Ryan's wedding memory
