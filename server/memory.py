import database_util

def create_memory(data):
    title = data['title']
    description = data['description']
    files = data['files']
    mem_type = data['mem_type']
    

    query = "INSERT INTO Memory (title, description, files, mem_type) VALUES (%s, %s, %s, %s)"

    return database_util.execute(query, (title, description, files, mem_type), retrieve=True)