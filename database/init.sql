CREATE TABLE Person (

    id SERIAL PRIMARY KEY,
    name TEXT,
    birthday DATE
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