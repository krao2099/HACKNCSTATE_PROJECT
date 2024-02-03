import database_util

def create_memory(data):
    title = data['title']
    description = data['description']
    files = data['files']
    mem_type = data['mem_type']
    p_ids = data['p_ids']
    

    query = "INSERT INTO Memory (title, description, files, mem_type) VALUES (%s, %s, %s, %s) RETURNING id"

    id = database_util.execute(query, (title, description, files, mem_type), retrieve=True)

    query = "INSERT INTO Memory_Person (memory_id, person_id) VALUES (%s, %s)"

    for p_id in p_ids:
        database_util.execute(query, (id, p_id))

    return id


def view_memory(id):

    query = "SELECT * FROM Memory WHERE id = %s"

    result = database_util.retrieve(query, (id,))[0]

    query = "SELECT * FROM Memory_Person WHERE memory_id = %s"

    result2 = database_util.retrieve(query, (id,))

    people = []
    for r in result2:
        people.append(r[1])

    
    memory_data = {
        "id": result[0],
        "title": result[1],
        "description": result[2],
        "files": result[3],
        "mem_type": result[4],
        "people": people
    }

    return memory_data

def get_memories_person(p_id):

    query = "SELECT mem.id, mem.title, mem.description, mem.files, mem.mem_type FROM Memory_Person AS mp JOIN Memory AS mem ON mp.memory_id = mem.id WHERE mp.person_id = %s"


    results = database_util.retrieve(query, (p_id,))

    memories = []
    for result in results:
        id = result[0]

        query = "SELECT * FROM Memory_Person WHERE memory_id = %s"

        result2 = database_util.retrieve(query, (id,))

        people = []
        for r in result2:
            people.append(r[1])

        memory_data = {
            "id": result[1],
            "title": result[2],
            "description": result[3],
            "files": result[4],
            "mem_type": result[5],
            "people": people
        }
        memories.append(memory_data)

    return memories

