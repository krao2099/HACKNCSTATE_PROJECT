import database_util

def create_memory(data):
    title = data['title']
    description = data['description']
    files = data['files']
    mem_type = data['mem_type']
    

    query = "INSERT INTO Memory (title, description, files, mem_type) VALUES (%s, %s, %s, %s)"

    return database_util.execute(query, (title, description, files, mem_type), retrieve=True)

def view_memory(data):
    id = data['id']

    query = "SELECT * FROM Memory WHERE id = %s"

    result = database_util.retrieve(query, (id,))

    memory_data = {
        "id": result[0],
        "title": result[1],
        "description": result[2],
        "files": result[3],
        "mem_type": result[4]
    }

    return memory_data