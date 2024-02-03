import database_util

def create_memory(data):
    title = data['title']
    description = data['description']
    files = data['files']
    mem_type = data['mem_type']
    

    query = "INSERT INTO Memory (title, description, files, mem_type) VALUES (%s, %s, %s, %s) RETURNING id"

    return database_util.execute(query, (title, description, files, mem_type), retrieve=True)

def view_memory(data):
    id = data['id']

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